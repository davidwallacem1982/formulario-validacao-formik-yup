import React from 'react';
// importando formik
import { Formik, useField } from 'formik';
//importando o yup
import * as yup from 'yup';

const Campo = ({label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{label}</label>
      <input
        {...field}
        {...props}
        className={meta.error && meta.touched ? 'is-invalid' : '' }
      />
      {meta.error && meta.touched ? (
        <div className='invalid-feedback'>{meta.error}</div>
      ) : null }
    </div>
  );
}

const AdicionaCliente = () => {
  const esquema = yup.object({
    nome: yup
      .string()
      .required('O nome é obrigatório')
      .min(10, 'O nome deve ter no mínimo 10 caracteres')
      .max(30, 'O nome deve ter no máximo 30 caracteres'),
    email: yup
      .string()
      .required('O email é obrigatório')
      .email('O email é inválido'),
    nascimento: yup
      .date()
      .required('A data de nascimento é obrigatória')
      .max(new Date(), 'Você não pode ter nascido no futuro...'),
  });
  return (
    <>
      <h1>Cadastro de Clientes</h1>
      {/* estrutura de formik */}
      <Formik initialValues={{ nome: '', email: '', nascimento: '' }}
        // usando o esquema de validação do yup
        validationSchema={esquema}
        //o comando abaixo é para diparar o submit do formilario
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} noValidate>
              <Campo
                id="nome"
                name="nome"
                label="Nome"
                type="text"
              />
              <Campo
                id="email"
                name="email"
                label="E-mail"
                type="email"
              /> 
              <Campo
                id="nascimento"
                name="nascimento"
                label="Data de Nascimento"
                type="date"
              />            
          <button type="submit">Adicionar</button>
        </form>    
        )}
      </Formik>  
    </>
  );
};

export default AdicionaCliente;
