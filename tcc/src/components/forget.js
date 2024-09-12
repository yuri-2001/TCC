import './forget.css';
import React from 'react';
import Swal2 from 'sweetalert2';
import Axios from 'axios';
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { useNavigate } from 'react-router-dom';

export default function Forget() {
    const navigate = useNavigate();

    const validationsRegister = yup.object().shape({
        email: yup
        .string()
        .email("Email inválido")
        .required("O email é obrigatório"),
        senhanova1: yup
          .string()
          .min(8, "A senha deve ter pelo menos 8 caracteres")
          .required("A senha é obrigatória"),
        senhanova2: yup
          .string()
          .oneOf([yup.ref('senhanova1'), null], "As senhas devem ser iguais")
          .required("A confirmação da senha é obrigatória"),
      });
    
    const handleRegister = (values) => {
        Axios.post("http://localhost:3001/forget", {
            email: values.email,
            senhanova: values.senhanova1,
        }).then((response) => {
          Swal2.fire({
            icon: response.data.success ? 'success' : 'error',
            title: response.data.msg,
          }).then(() => {
            if (response.data.success) {
              navigate('/sign-in'); // Redireciona para a página de login
            }
          });
        }).catch((error) => {
          Swal2.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao tentar atualizar a senha. Tente novamente.',
          });
        });
    };

    return (
        <div className="container">
            <div className="title-form">
              <h1 className="title-login">Atualizar Senha</h1>
            </div>
            <Formik
              initialValues={{}}
              onSubmit={handleRegister}
              validationSchema={validationsRegister}
            >
              <Form className="login-form">
                <div className="login-form-group">
                    <div className="frame-login-title">
                        <label className="title-email-form">E-mail:</label>
                        <Field name="email" className="form-field" placeholder="Digite seu e-mail" />
                        <ErrorMessage name="email" component="span" className="form-error" />
                    </div>
                </div>
                <div className="form-group">
                  <div className="frame-login-title">
                    <label className="title-senha-form">Insira nova senha:</label>
                    <Field name="senhanova1" type="password" className="form-field" placeholder="Digite sua nova senha" />
                    <ErrorMessage name="senhanova1" component="span" className="form-error" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="frame-login-title">
                    <label className="title-senha-form">Repita a nova senha:</label>
                    <Field name="senhanova2" type="password" className="form-field" placeholder="Repita sua nova senha" />
                    <ErrorMessage name="senhanova2" component="span" className="form-error" />
                  </div>
                </div>
                
                <div className="btn-cadastrar">
                    <button className="button" type="submit">Atualizar</button>
                </div>

                <div className="redirect-registro">
                  <div className="nav-item">
                    <a href='/sign-in'>Voltar para tela de login</a>
                  </div>
                </div>
              </Form>
            </Formik>
        </div>
    );
}
