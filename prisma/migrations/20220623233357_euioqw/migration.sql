/*
  Warnings:

  - You are about to drop the column `id_operator` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `id_tourist` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the `_contracttooperator` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `operator_id` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tourist_id` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_contracttooperator` DROP FOREIGN KEY `_ContractToOperator_A_fkey`;

-- DropForeignKey
ALTER TABLE `_contracttooperator` DROP FOREIGN KEY `_ContractToOperator_B_fkey`;

-- AlterTable
ALTER TABLE `contract` DROP COLUMN `id_operator`,
    DROP COLUMN `id_tourist`,
    ADD COLUMN `operator_id` INTEGER NOT NULL,
    ADD COLUMN `tourist_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_contracttooperator`;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `Operator`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_tourist_id_fkey` FOREIGN KEY (`tourist_id`) REFERENCES `Tourist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
