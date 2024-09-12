import React from 'react';
import Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './signin.css';

export default function SignUp() {
  const navigate = useNavigate();

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas são diferentes")
      .required("A confirmação da senha é obrigatória"),
    cpf: yup
      .string()
      .required("O CPF é obrigatório"),
  });

  const handleRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
      nome: values.nome,
      sobrenome: values.sobrenome,
      cpf: values.cpf
    })
    .then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        text: response.data.msg,
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/sign-in'); 
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Ocorreu um erro ao realizar o cadastro. Tente novamente.',
      });
      console.error("There was an error registering!", error);
    });
  };

  return (
    <div className="container">
      <div className="title-form">
        <h1>Cadastro</h1>
      </div>
      <Formik
        initialValues={{
          nome: '',
          sobrenome: '',
          email: '',
          password: '',
          confirmation: '',
          cpf: ''
        }}
        onSubmit={handleRegister}
        validationSchema={validationsRegister}
      >
        <Form className="login-form">
          <div className="form-group">
            <div className="frame-login-title">
              <label className="title-senha-form">Nome:</label>
              <Field name="nome" className="form-field" placeholder="Digite seu nome" />
              <ErrorMessage name="nome" component="span" className="error-message" />
            </div>
          </div>
          <div className="form-group">
            <div className="frame-login-title">
              <label className="title-senha-form">Sobrenome:</label>
              <Field name="sobrenome" className="form-field" placeholder="Digite seu sobrenome" />
              <ErrorMessage name="sobrenome" component="span" className="error-message" />
            </div>
          </div>
          <div className="form-group">
            <div className="frame-login-title">
              <label className="title-senha-form">CPF:</label>
              <Field name="cpf" className="form-field" placeholder="Digite seu documento" />
              <ErrorMessage name="cpf" component="span" className="error-message" />
            </div>
          </div>
          <div className="login-form-group">
            <div className="frame-login-title">
              <label className="title-email-form">E-mail:</label>
              <Field name="email" className="form-field" placeholder="Digite seu e-mail" />
              <ErrorMessage name="email" component="span" className="error-message" />
            </div>
          </div>
          <div className="senha">
            <div className="form-group">
              <div className="frame-login-title">
                <label className="title-senha-form">Senha:</label>
                <Field type="password" name="password" className="form-field" placeholder="Digite sua senha" />
                <ErrorMessage name="password" component="span" className="error-message" />
              </div>
            </div>
          </div>
          <div className="senha">
            <div className="form-group">
              <div className="frame-login-title">
                <label className="title-senha-form">Confirmar senha:</label>
                <Field type="password" name="confirmation" className="form-field" placeholder="Confirme sua senha" />
                <ErrorMessage name="confirmation" component="span" className="error-message" />
              </div>
            </div>
          </div>
          <div className="btn-cadastrar">
            <button className="button" type="submit">Cadastrar</button>
          </div>
          <div className="redirect-registro">
            <div className="nav-item">
              <a href='/sign-in'>Voltar para tela de login</a>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}
