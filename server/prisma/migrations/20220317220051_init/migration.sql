-- CreateTable
CREATE TABLE `Replica` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `available` INTEGER NOT NULL,
    `unavailable` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DockerService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `serviceID` VARCHAR(100) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `mode` VARCHAR(20) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `portMapping` VARCHAR(255) NULL,
    `replicaId` INTEGER NOT NULL,

    UNIQUE INDEX `DockerService_serviceID_key`(`serviceID`),
    UNIQUE INDEX `DockerService_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DockerService` ADD CONSTRAINT `DockerService_replicaId_fkey` FOREIGN KEY (`replicaId`) REFERENCES `Replica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
