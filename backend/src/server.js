const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const routes = require('./routes');
const mysql = require("mysql");
const cors = require("cors");
const saltRounds = 10;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tcc"
});

app.use(express.json());
app.use(cors());

app.use(routes);

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", [email, password], (err, result) => {
    if (err) {
      return res.status(500).send({ success: false, msg: "Erro interno do servidor." });
    }
    if (result.length > 0) {
      res.send({ success: true, msg: "Login bem sucedido !" });
    } else {
      res.send({ success: false, msg: "Usuário ou senha incorretos." });
    }
  });
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const cpf = req.body.cpf;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      return res.send({ success: false, msg: "Erro no servidor" });
    }
    if (result.length === 0) {      
      db.query(
        "INSERT INTO usuarios (email, password) VALUES (?, ?)",
        [email, password],
        (error) => {
          if (error) {
            return res.send({ success: false, msg: "Erro ao registrar usuário" });
          }
          db.query("SELECT idUsuario FROM usuarios WHERE email = ?", [email], (error, response) => {
            if (error) {
              return res.send({ success: false, msg: "Erro ao buscar ID do usuário" });
            }
            const idUsuario = response[0].idUsuario;
            db.query(
              "INSERT INTO usuarioDados (nome, sobrenome, cpf, idUsuario) VALUES (?, ?, ?, ?)",
              [nome, sobrenome, cpf, idUsuario],
              (error) => {
                if (error) {
                  return res.send({ success: false, msg: "Erro ao registrar dados do usuário" });
                }
                res.send({ success: true, msg: "Usuário cadastrado com sucesso" });
              }
            );
          });
        }
      );
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});

app.post("/forget", (req, res) => {
  const email = req.body.email;
  const senhanova = req.body.senhanova;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      return res.send({ success: false, msg: "Erro no servidor" });
    }
    if (result.length > 0) {      
      db.query(
        "UPDATE usuarios SET password = ? WHERE email = ?",
        [senhanova, email],
        (error) => {
          if (error) {
            return res.send({ success: false, msg: "Erro ao atualizar a senha" });
          }
          res.send({ success: true, msg: "Atualização de senha concluída com sucesso" });
        }
      );      
    } else {
      res.send({ success: false, msg: "Usuário não registrado." });
    }
  });
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001...");
});
