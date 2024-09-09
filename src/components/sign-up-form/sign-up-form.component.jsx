import { useState } from 'react';

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase.utils';

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

    console.log({formFields})
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value })
    }

    const resetFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('password', password)
        console.log('confirmPassword', confirmPassword)

        if(password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            if (!user) {
                alert('No user returned');
            }
            console.log('>>>!', displayName);
            console.log('>>>!', user);
            await createUserDocumentFromAuth(user, { displayName });
            resetFields()
        } catch(error) {
            console.log('>>>>1', error)
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
