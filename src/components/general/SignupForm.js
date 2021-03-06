import React from 'react';
import { withFormik, Field, ErrorMessage, Form } from 'formik';
import { database, authentication } from '../../store/Firebase'

const styles = {
    check: {
        color: 'red'
    },
}

function SignupForm(props) {

    const {
        isSubmitting,
        isValid,
    } = props;
    
    return (
        <Form>
            <div className="row">
                Nombre:<Field name="name" type="text" className="input" />
                <ErrorMessage name="name">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
                Apellido:<Field name="last" type="text" className="input" />
                <ErrorMessage name="last">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>
            <div className="row">
                Email:
                <Field name="email" type="email" className="input" />
                <ErrorMessage name="email">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Contraseña:
                <Field name="password" type="password" className="input" />
                <ErrorMessage name="password">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Confirme Contraseña:
                <Field name="cpassword" type="password" className="input" />
                <ErrorMessage name="cpassword">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                registrarse como profesor
                <Field name="teacher" type="checkbox"/>
                <ErrorMessage name="teacher">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>
            <div className="row">
                <button
                    type="submit"
                    className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                    disabled={isSubmitting || !isValid}
                >
                    Enviar
                </button>
            </div>
            
        </Form>
    );
}

export default withFormik({
    mapPropsToValues(props) {
        return {
            email: '',
            password: '',
            cpassword: '',
            name: '',
            last: '',
            teacher: false,
        };
    },

    async validate(values) {
        const errors = {};

        if (!values.name) {
            errors.name = 'Name is required';
        }

        if (!values.last) {
            errors.last = 'Lastname is required';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        if (!values.email) {
            errors.email = 'Email is required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'correo invalido';
        }

        if (!values.cpassword) {
            errors.cpassword = 'Cofirm the password'
        } else if (values.password !== values.cpassword) {
            errors.cpassword = 'confirm the correct password';
        }

        if (Object.keys(errors).length) {
            throw errors;
        }
    },

    handleSubmit(values, formikBag) {
        formikBag.setSubmitting(false);
        authentication.createUserWithEmailAndPassword(values.email, values.password)
        .then((success) => 
        database.ref(`Users/${success.user.uid}`).set({
            name: `${values.name} ${values.last}`,
            email: success.user.email,
            professor: values.teacher,
        }))
    },
})(SignupForm);