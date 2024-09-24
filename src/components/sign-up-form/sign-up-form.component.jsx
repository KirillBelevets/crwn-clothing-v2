import { useState } from 'react';
import { useDispatch } from "react-redux";

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils';

import { signUpStart } from "../../store/user/user.action";
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value })
    }

    const resetFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName));

            resetFields()
        } catch(error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert('Email already in use');
                    break;
                case 'auth/weak-password':
                    alert('Password is too weak');
                    break;
                default:
                    console.error('Error creating user:', error);
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" inputOptions={{
                    type: "text",
                    required: true,
                    name: "displayName",
                    value: displayName,
                    onChange: handleChange,
                }} />

                <FormInput label="Email" inputOptions={{
                    type: "email",
                    required: true,
                    name: "email",
                    value: email,
                    onChange: handleChange,
                }} />

                <FormInput label="Password" inputOptions={{
                    type: "password",
                    required: true,
                    name: "password",
                    value: password,
                    onChange: handleChange,
                }} />

                <FormInput label="Confirm Password" inputOptions={{
                    type: "password",
                    required: true,
                    name: "confirmPassword",
                    value: confirmPassword,
                    onChange: handleChange,
                }} />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;
