/*
  Warnings:

  - Added the required column `desired` to the `Replica` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Replica` ADD COLUMN `desired` INTEGER NOT NULL;
