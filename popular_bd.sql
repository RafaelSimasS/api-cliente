USE `bd_clientes`;

insert into `cliente` (nascimento, nome, endereco, cpf, telefone, email, datacadastro)
values('2023-11-23', 'Carlos Santos', 'Rua Xavante, quadra 34', '123.123.123-23', '(98)97777-0808', 'carlos@gmail.com', '2023-11-23');

insert into `cliente` (nascimento, nome, endereco, cpf, telefone, email, datacadastro)
values('2023-11-23', 'José Pereira', 'Rua Flores, quadra 34', '123.123.123-23', '(98)99999-0808', 'jp@gmail.com', '2023-11-23');

insert into `cliente` (nascimento, nome, endereco, cpf, telefone, email, datacadastro)
values('2023-11-23', 'Ana Maria', 'Rua Pindorama, casa 3', '345.345.345-23', '(98)93423-1289', 'mari@gmail.com', '2023-11-23');

insert into `cliente` (nascimento, nome, endereco, cpf, telefone, email, datacadastro)
values('2023-11-23', 'José Hugo', 'Rua FLorianópolis, 4', '453.234.234-34', '(98)93423-1289', 'jhugor@gmail.com', '2023-11-23');

-- Inserção de um administrador
INSERT INTO `admin` (username, senha, auth_token)
VALUES ('admin', 'admin123', NULL);