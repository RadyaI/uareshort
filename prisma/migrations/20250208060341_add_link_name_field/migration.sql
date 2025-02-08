/*
  Warnings:

  - Added the required column `linkName` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `links` ADD COLUMN `linkName` VARCHAR(191) NOT NULL;
