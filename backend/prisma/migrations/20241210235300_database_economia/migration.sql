-- CreateTable
CREATE TABLE `fin_profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `renda_mensal` DECIMAL(15, 2) NULL,
    `despesas_fixas` DECIMAL(15, 2) NULL,
    `despesas_variaveis` DECIMAL(15, 2) NULL,
    `objetivo_financeiro` VARCHAR(50) NULL,
    `perfil_risco` VARCHAR(40) NULL,
    `patrimonio_atual` DECIMAL(20, 2) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `fin_profile_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fin_transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `data_transacao` DATETIME(3) NOT NULL,
    `categoria_transacao` VARCHAR(50) NULL,
    `descricao` VARCHAR(255) NULL,
    `valor` DECIMAL(15, 2) NOT NULL,
    `forma_pagamento` VARCHAR(40) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `config_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `notificacoes_ativas` BOOLEAN NOT NULL DEFAULT true,
    `frequencia_relatorios` ENUM('DIARIA', 'SEMANAL', 'MENSAL') NOT NULL DEFAULT 'SEMANAL',
    `moeda_preferencial` VARCHAR(191) NOT NULL DEFAULT 'BRL',
    `idioma` VARCHAR(191) NOT NULL DEFAULT 'Português',
    `tema_app` ENUM('CLARO', 'ESCURO') NOT NULL DEFAULT 'CLARO',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `config_user_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(255) NOT NULL,
    `data_nasc` DATETIME(3) NOT NULL,
    `status` TINYINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fin_profile` ADD CONSTRAINT `fin_profile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fin_transactions` ADD CONSTRAINT `fin_transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `config_user` ADD CONSTRAINT `config_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
