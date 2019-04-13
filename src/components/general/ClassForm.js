import React from 'react';
import { withFormik, Field, ErrorMessage, Form } from 'formik';
import { database, authentication } from '../../store/Firebase'

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
                  fontSize: 19,
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
              <Field name="className" type="text" className="input" />
              <ErrorMessage name="className">
                  {message => <div className="error">{message}</div>}
              </ErrorMessage>
          </div>

          <div className="row">
              Descripción de la clase:
              <textarea 
                name="description"
                cols="40"
                rows="5"
                maxlength="200"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ 
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
      return {
          className: '',
          description: '',
          maxStudents: null,
          educationArea: null,
          extraArea: ''
      };
  },

  async validate(values) {
      const errors = {};

      if (!values.className) {
          errors.className = 'el nombre es requerido';
      } else if (values.className < 8) {
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
          professor: 'Daniel Reverol',
          professorID: '1Gu8fzzWzGZY1D9g2nJ27FRPcrN2',
          description: values.description,
          educationArea: values.educationArea,
          extraArea: values.extraArea,
      })
  },
})(SignupForm);