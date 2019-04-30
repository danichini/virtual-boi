import React from 'react';
import { withFormik, Field, ErrorMessage, Form } from 'formik';
import { database } from '../../store/Firebase'

function ResourcesForm(props) {

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
              Nombre del archivo:
              <Field name="fileName" type="text" className="input" />
              <ErrorMessage name="fileName">
                  {message => <div className="error">{message}</div>}
              </ErrorMessage>
          </div>

          <div className="row">
              Descripción del archivo:
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

          <div>
          <input id="file" name="file" type="file" onChange={(event) => console.log('file', event)
          } />
          </div>

          <div className="row">
              <button
                  type="submit"
                  className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
              >
                  Subir archivo
              </button>
          </div>
      </Form>
  );
}

export default withFormik({
  mapPropsToValues(props) {

    const { closeModal } = props

      return {
          closeModal,
          fileName: '',
          description: '',
      };
  },

  async validate(values) {
      const errors = {};

      if (!values.fileName) {
          errors.fileName = 'el nombre del archivo es requerido';
      } else if (values.fileName.length < 8) {
        errors.fileName = 'el nombre del archivo es muy corto'
      }

      if (!values.description) {
        errors.description = 'ingrese la descripcion del archivo'
      } else if (values.description.length < 10) {
        errors.description = 'la descripcion debe contener mas de 10 caracteres'
      }

      if (Object.keys(errors).length) {
          throw errors;
      }
  },

  // handleSubmit(values, formikBag) {
  //     formikBag.setSubmitting(false);
  //     console.log(values);
  //     database.ref(`Resources/`).push({
  //         fileName: values.fileName,
  //         professor: 'Daniel Reverol',
  //         professorID: professorID,
  //         description: values.description,
  //         educationArea: values.educationArea,
  //         extraArea: values.extraArea,
  //         maxStudents: values.maxStudents,
  //     }).then(success => {
  //       const key = success.key;
  //       database.ref(`class-professor/${professorID}`)
  //       .update({[key]: true})
  //       .then(values.closeModal
  //       )
  //     }
  //   )
  // },
})(ResourcesForm);