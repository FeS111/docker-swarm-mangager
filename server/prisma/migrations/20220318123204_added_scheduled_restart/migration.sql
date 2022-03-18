/*
  Warnings:

  - Added the required column `scheduledRestartId` to the `DockerService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DockerService` ADD COLUMN `scheduledRestartId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `ScheduledRestart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `cron` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DockerService` ADD CONSTRAINT `DockerService_scheduledRestartId_fkey` FOREIGN KEY (`scheduledRestartId`) REFERENCES `ScheduledRestart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
