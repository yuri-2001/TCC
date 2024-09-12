import React from 'react';
import Swal2 from 'sweetalert2';
import Axios from 'axios';
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import './login.css';

export default function Login() {  

  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      Swal2.fire({
        icon: response.data.success ? 'success' : 'error',
        title: response.data.msg,
      });
    }).catch((error) => {
      Swal2.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Falha na comunicação com o servidor.',
      });
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
  });

  return (
    <div className="container">
      <div className="title-form">
        <h1 className="title-login">Login</h1>
      </div>
      
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
        validationSchema={validationsLogin}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <div className="frame-login-title">
              <label className="title-email-form">E-mail:</label>
              <Field name="email" className="form-field" placeholder="Digite seu e-mail" />
            </div>
            <ErrorMessage component="span" name="email" className="form-error" />
          </div>

          <div className="form-group">
            <div className="frame-login-title">
              <label className="title-senha-form">Senha:</label>
              <Field name="password" type="password" className="form-field" placeholder="Digite sua senha" />
            </div>
            <ErrorMessage component="span" name="password" className="form-error" />
          </div>

          <div className="btn-esqueci-senha">
            <a href='/forget-password' className="button-senha">Esqueci minha senha</a>
          </div>

          <div className="btn-login">
            <button className="button" type="submit">Login</button>
          </div>

          <div className="redirect-registro">
            <div className="nav-item">
              <a href='/sign-up'>Cadastre-se</a>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
