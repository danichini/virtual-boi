import React from 'react';
import { withFormik, Field, ErrorMessage, Form } from 'formik';
import { database } from '../../store/Firebase'

function SignupForm(props) {

  const {
      isSubmitting,
      isValid,
      handleChange,
      handleBlur,
      values,
  } = props;

  return (
      <Form>
          <div className="row">
              Ingrese el nombre de la clase:
              <Field name="className" type="text" className="input" />
              <ErrorMessage name="className">
                  {message => <div className="error">{message}</div>}
              </ErrorMessage>
          </div>

          <div className="row">
              Area de Educación:
              <select
                name="educationArea"
                value={values.educationArea}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ 
                  display: 'block',
                  width: '100%',
                  fontSize: 16,
              }}
              >
                <option value="" label="seleccione el area de educación" />
                <option value="Ingeniería en Computación" label="Ingeniería en Computación" />
              </select>
              <ErrorMessage name="educationArea">
                  {message => <div className="error">{message}</div>}
              </ErrorMessage>
          </div>

          <div className="row">
              Area Extra:
              <Field name="extraArea" type="text" className="input" />
              <ErrorMessage name="extraArea">
                  {message => <div className="error">{message}</div>}
              </ErrorMessage>
          </div>

          <div className="row">
              Numero Maximo de estudiantes:
              <select
                name="maxStudents"
                value={values.maxStudents}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ 
                  display: 'block',
                  width: '100%',
                  fontSize: 16,
              }}
              >
                <option value="" label="seleccione el numero maximo de estudiantes" />
                <option value="20" label="20" />
                <option value="30" label="30" />
                <option value="40" label="40" />
              </select>
              <ErrorMessage name="maxStudents">
                  {message => <div className="error">{message}</div>}
              </ErrorMessage>
          </div>

          <div className="row">
              Descripción de la clase:
              <textarea 
                name="description"
                cols="40"
                rows="5"
                maxLength="200"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ 
                  resize: 'none',
                  display: 'block',
                  width: '100%',
                  fontSize: 14,
                  padding: 3,
              }}
              ></textarea>
              <ErrorMessage name="description">
                  {message => <div className="error">{message}</div>}
              </ErrorMessage>
          </div>

          <div className="row">
              <button
                  type="submit"
                  className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
              >
                  CREAR CLASE
              </button>
          </div>
      </Form>
  );
}

export default withFormik({
  mapPropsToValues(props) {

    const { closeModal, professorID, name } = props

      return {
          closeModal,
          professorID,
          name,
          className: '',
          description: '',
          maxStudents: '',
          educationArea: '',
          extraArea: ''
      };
  },

  async validate(values) {
      const errors = {};

      if (!values.className) {
          errors.className = 'el nombre es requerido';
      } else if (values.className.length < 8) {
        errors.className = 'el nombre de la clase es muy corto'
      }

      if (!values.educationArea) {
          errors.educationArea = 'elija el area de educacion'
      } 

      if (!values.extraArea) {
        errors.extraArea = 'el area extra es requerido'
      } 

      if (!values.description) {
        errors.description = 'ingrese la descripcion de la clase'
      } else if (values.description.length < 10) {
        errors.description = 'la descripcion debe contener mas de 10 caracteres'
      }

      if (!values.maxStudents) {
        errors.maxStudents = 'el numero de estudiantes es requerido'
      }

      if (Object.keys(errors).length) {
          throw errors;
      }
  },

  handleSubmit(values, formikBag) {
      formikBag.setSubmitting(false);
      console.log(values);
      database.ref(`Classes/`).push({
          className: values.className,
          professor: values.name,
          professorID: values.professorID,
          description: values.description,
          educationArea: values.educationArea,
          extraArea: values.extraArea,
          maxStudents: values.maxStudents,
      }).then(success => {
        const key = success.key
        console.log('key', key)
        database.ref(`Classes/${key}`).update({
          classID: key
        })
        database.ref(`class-professor/${values.professorID}`)
        .update({[key]: true})
        .then(values.closeModal
        )
      }
    )
    database.ref(`Dashboard/`).push({
      professor: values.name,
      className: values.className,
    })
  },
})(SignupForm);