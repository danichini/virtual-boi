import React from 'react';
import { withFormik, Field, ErrorMessage, Form } from 'formik';

function LoginForm(props) {
    const {
        isSubmitting,
        isValid,
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
                    disabled={isSubmitting || !isValid}
                >
                    Submit
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
        };
    },

    async validate(values) {
        const errors = {};

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        if (Object.keys(errors).length) {
            throw errors;
        }
    },

    handleSubmit(values, formikBag) {
        formikBag.setSubmitting(false);
        console.log(values);
    },
})(LoginForm);