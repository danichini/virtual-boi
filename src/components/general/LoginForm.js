import React from 'react';
import { withFormik, Field, ErrorMessage, Form } from 'formik';
import { authentication } from '../../store/Firebase'

function LoginForm(props) {
    const {
        isSubmitting,
        isValid,
        noValid
    } = props;

    return (
        <Form>
            <div className="row">
                Email:
                <Field name="email" type="email" className="input" />
                <ErrorMessage name="email">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Password:
                <Field name="password" type="password" className="input" />
                <ErrorMessage name="password">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                <button
                    type="submit"
                    className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                >
                    Submit
                </button>
            </div>
            <div style={{ color: 'red', textAlign: 'center' }} >
            {
                noValid ? ('Credenciales no concuerdan')
                : ''
            }
            </div>
        </Form>
    );
}

export default withFormik({
    mapPropsToValues(props) {

        const { navigateDashboard, handleLoading } = props


        return {
            handleLoading,
            navigateDashboard,
            email: '',
            password: '',
        };
    },

    async validate(values) {
        const errors = {};

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

        if (Object.keys(errors).length) {
            throw errors;
        }
    },

    handleSubmit(values, formikBag) {
        formikBag.setSubmitting(false);
        authentication.signInWithEmailAndPassword(values.email, values.password)
        .then(success => (console.log('success', success))
        ).catch(values.handleLoading
        )
    },
})(LoginForm);