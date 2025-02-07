/*
  Warnings:

  - Added the required column `customCode` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `links` ADD COLUMN `customCode` VARCHAR(191) NOT NULL;
