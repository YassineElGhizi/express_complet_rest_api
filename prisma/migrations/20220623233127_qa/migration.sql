-- CreateTable
CREATE TABLE `Contract` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_tourist` INTEGER NOT NULL,
    `id_operator` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tourist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `passport_no` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NULL,

    UNIQUE INDEX `Tourist_passport_no_key`(`passport_no`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContractToOperator` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContractToOperator_AB_unique`(`A`, `B`),
    INDEX `_ContractToOperator_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ContractToOperator` ADD CONSTRAINT `_ContractToOperator_A_fkey` FOREIGN KEY (`A`) REFERENCES `Contract`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContractToOperator` ADD CONSTRAINT `_ContractToOperator_B_fkey` FOREIGN KEY (`B`) REFERENCES `Operator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
