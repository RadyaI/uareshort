/*
  Warnings:

  - A unique constraint covering the columns `[shortCode]` on the table `links` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `links_shortCode_key` ON `links`(`shortCode`);
