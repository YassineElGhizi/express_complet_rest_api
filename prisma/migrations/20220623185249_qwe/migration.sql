/*
  Warnings:

  - Made the column `email` on table `operator` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `operator` ADD COLUMN `service_provider_id` INTEGER NOT NULL DEFAULT 0,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Operator` ADD CONSTRAINT `Operator_service_provider_id_fkey` FOREIGN KEY (`service_provider_id`) REFERENCES `Service_provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
