import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import './sign-in-form.styles.scss'
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase.utils";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value })
    }

    const resetFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);

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
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
