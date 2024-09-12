# TCC
Trabalho de conclusão de curso.

# INTEGRANTES

Yuri de Melo Manssur

# TECNOLOGIAS
- REACT
- NODE.JS
- MySQL
- HTML
- CSS

# FERRAMENTAS
- XAMPP
- MySQL WOEKBENCH
- VISUAL STUDIO CODE
- GIT
- GITHUB
- JIRA

# COMO CONFIGURAR

- Baixe o Visual Studio Code
- Baixe e utilize o Node.Js versão LTS
- Baixe o MySql Workbench
- Baixe o XAMPP
- Faça o download ZIP do projeto e descompacte na pasta C:
- Abra o CMD (Prompt de Comando) como adminstrador e navegue até a pasta raiz do projeto clonado e execute o comando "npm install express".

- Após isso execute o comando "cd tcc" para acessar a pasta do front-end e execute o comando "npm install express". Dependendo da máquina a instalação pode ser feita mais rápida dependendo das biblotecas já instaladas.

- Após executar e instalar execute o comando "npm start". (Não se preocupe com os warnings, pois estão relacionados a definições que não foram usadas)

- Abre outro CMD, navegue até a pasta raiz do projeto e acesse a pasta backend. Execute o comando npm install express e depois o comando "npm run dev"

- Abra o XAMPP e starta o MySql

- Abra o MySql e clique no + para criar uma conexão.

- Crie um database chamado "tcc" e seta como default.
Crie as seguintes tabelas:

CREATE TABLE usuarios ( IdUsuario bigint primary key AUTO_INCREMENT, email varchar(50) NOT NULL, password varchar(50) NOT NULL )

CREATE TABLE usuarioDados ( IdDadosUsuario bigint not null primary key AUTO_INCREMENT, IdUsuario bigint not null, nome varchar(50) not null, sobrenome varchar(50) not null, cpf varchar(11) not null )

PRONTO! Foi aberto uma aba no navegador na página de login da aplicação.
