import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import OpenAI from "openai";
import QueryComponent from './Query';


export function Dashboard() {

  interface Conversation {
    id: string;
    createdAt: Date;
    items: { role: string; content: string }[];
    summary: string;
    bot: string;
  }

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const retrieveData = async (): Promise<Conversation[]> => {

    // retrieve data from database 
    try {
      const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/conversations`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get data from database: ${errorText}`);
      }
      const data = await response.json();
      console.log('Data retrieved successfully:', data);
      return data;
    } catch (error) {
      console.error('Error pushing data to the database:', error);
      return [];
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await retrieveData();
      setConversations(data);
    };
    fetchData();
  }, []);


  return (

    <div data-component="Dashboard">
      <div className="content-top">
        <div className="content-title">
            <img src="/ollie.png" />
            <h1 className="rainbow-text">Parent Dashboard</h1>        </div>
          {/* <div className="content-api-key">
            {!LOCAL_RELAY_SERVER_URL && (
              <Button
                icon={Edit}
                iconPosition="end"
                buttonStyle="flush"
                label={`api key: ${apiKey.slice(0, 3)}...`}
                onClick={() => resetAPIKey()}
              />
            )}
          </div> */}
        </div>
      <div className="grid-container">
        <div className="column column-1">

          <h1>Conversations</h1>
          <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Created At</th>
                <th>Bot</th>
                <th>Items</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((conversation) => (
                <tr key={conversation.id}>
                  <td>{conversation.id}</td>
                  <td>{new Date(conversation.createdAt).toLocaleString()}</td>
                  <td>{conversation.bot}</td>
                  <td>
                  <div className="items-cell">
                    {conversation.items.map((item, index) => (
                      <div key={index}>
                        <strong>{item.role}:</strong> {item.content}
                      </div>
                    ))}
                    </div>
                  </td>
                  
                  <td>{conversation.summary}</td>

                </tr>
              ))}
            </tbody>
          </table>
          </div>


        </div>

        <div className="column column-2">
          <div className = "QueryData">
            <QueryComponent conversations={conversations} />
          </div>
          

        </div>



  

    </div>

  </div>
  );
};

export default Dashboard;