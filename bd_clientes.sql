CREATE DATABASE IF NOT EXISTS bd_clientes;
USE bd_clientes;
CREATE TABLE IF NOT EXISTS `admin` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `senha` VARCHAR(255) NOT NULL,
    `auth_token` VARCHAR(255) NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `bd_clientes`.`cliente`(
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nascimento` DATE NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `endereco` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `telefone` VARCHAR(14) NULL,
    `email` VARCHAR(100) NULL,
    `datacadastro` DATE NULL,
    PRIMARY KEY (`id`));