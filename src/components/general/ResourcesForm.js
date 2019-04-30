import React from 'react';
import { withFormik, Field, ErrorMessage, Form } from 'formik';
import { database, storage } from '../../store/Firebase'

function ResourcesForm(props) {

  const {
      isSubmitting,
      isValid,
      handleChange,
      handleBlur,
      values,
  } = props;

  const handleFile = (value) => {
    console.log(value[0])
    values.file = value[0]
  } 

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
          <input 
            id="file"
            name="file"
            type="file"
            onChange={(event) => handleFile(event.target.files)
          } />
            <ErrorMessage name="file">
                {message => <div className="error">{message}</div>}
            </ErrorMessage>
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

    const { closeModal, classID } = props

      return {
          classID,
          closeModal,
          fileName: '',
          file: '',
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

      if (!values.file) {
        errors.file = 'seleccione archivo a subir'
      } 

      console.log(values);

      if (Object.keys(errors).length) {
          throw errors;
      }

      
  },

  handleSubmit(values, formikBag) {
    const uploadRes = storage.ref(`${values.classID}/${values.file.name}`)
    .put(values.file)
    uploadRes.on('state_changed',
    (snapshot) => {

    },
    (error) => {
      console.log(error)
    },
    () => {
        storage.ref(values.classID)
        .child(values.file.name)
        .getDownloadURL().then(url => 
          database.ref(`Resources/`).push({
            fileName: values.fileName,
            description: values.fileName,
            url
          })
        ).then(success => {
          const key = success.key
          console.log('key', key)
          database.ref(`class-resources/${values.classID}`)
          .update({[key]: true})
          .then(values.closeModal
          )
        })
      }
    )
  },
})(ResourcesForm);