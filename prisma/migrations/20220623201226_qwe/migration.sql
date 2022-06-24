/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Operator` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Operator_name_key` ON `operator`;

-- AlterTable
ALTER TABLE `operator` MODIFY `service_provider_id` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX `Operator_email_key` ON `Operator`(`email`);
