import React, { useState } from 'react';
import OpenAI from 'openai';
import './Query.scss';


interface Item {
    role: string;
    content: string;
  }
  
  interface Conversation {
    id: string;
    createdAt: Date;
    items: Item[];
    summary: string;
    bot: string;
  }
  
  interface QueryComponentProps {
    conversations: Conversation[];
  }

  const QueryComponent: React.FC<QueryComponentProps> = ({ conversations }) => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');

  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true
    });

  const handleQuerySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {"role": "system", "content": `You are an assistant helping a parent answer database queries about a child's conversations with AI bots. 
            Use only the provided conversations data as the data source. Do not answer any questions that require knowledge outside of the provided data.
            Conversations data: ${JSON.stringify(conversations)}`},
          {"role": "user", "content": query}
        ]
      }); 
  
    // fetch(`${process.env.REACT_APP_OPENAI_API_URL}/v1/chat/completions`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-4o",
    //     messages: [
    //     {
    //       role: "system",
    //       content: `You are an assistant helping a parent answer database queries about a child's conversations with AI bots. Use only the provided conversations data as the data source. Conversations data: ${JSON.stringify(conversations)}`
    //     },
    //     {
    //       role: "user",
    //       content: query
    //     },
    //     {
    //       role: "system",
    //       content: `Conversations data: ${JSON.stringify(conversations)}`
    //     }
    //     ]
    //   })
    // });
      const data = await JSON.stringify(response.choices[0].message.content);
      setResult(data);
    } catch (error) {
      console.error('Error querying OpenAI:', error);
      setResult('Error querying OpenAI');
    }
  };

  return (
    <div>
      <h2>Query Conversations</h2>
      <form onSubmit={handleQuerySubmit}>
        <textarea
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter your query"
          className="query-textbox"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Result:</h3>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default QueryComponent;