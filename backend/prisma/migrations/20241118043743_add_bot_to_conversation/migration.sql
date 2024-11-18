/*
  Warnings:

  - Added the required column `bot` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- Add the `bot` column with a default value for existing rows
ALTER TABLE "Conversation" ADD COLUMN "bot" TEXT NOT NULL DEFAULT 'unknown';
