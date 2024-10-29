import React, { useState } from 'react';
import apiService from '../../Services/Services'; 

const Register = () => {
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        phone: '',
        userType: 'User',  // Default value set to 'User'
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [message, setMessage] = useState('');

    // Input validation functions
    const validateName = (name) => name.trim() !== '';
    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validatephone = (phone) => /^\d{10}$/.test(phone); // Example: 10 digits phone number
    const validatePassword = (password) => password.length >= 6;
    const validateConfirmPassword = (password, confirmPassword) => password === confirmPassword;

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm({
            ...registerForm,
            [name]: value
        });

        // Validate fields on change
        switch (name) {
            case 'name':
                setErrors((prev) => ({ ...prev, name: !validateName(value) }));
                break;
            case 'email':
                setErrors((prev) => ({ ...prev, email: !validateEmail(value) }));
                break;
            case 'phone':
                setErrors((prev) => ({ ...prev, phone: !validatephone(value) }));
                break;
            case 'password':
                setErrors((prev) => ({ ...prev, password: !validatePassword(value) }));
                break;
            case 'confirmPassword':
                setErrors((prev) => ({
                    ...prev,
                    confirmPassword: !validateConfirmPassword(registerForm.password, value)
                }));
                break;
            default:
                break;
        }

        // Check overall form validity
        setIsFormValid(
            validateName(registerForm.name) &&
            validateEmail(registerForm.email) &&
            validatephone(registerForm.phone) &&
            validatePassword(registerForm.password) &&
            validateConfirmPassword(registerForm.password, registerForm.confirmPassword)
        );
    };
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            setMessage('Please fill out all fields correctly');
            return;
        }
        try {
            const response = await apiService.post('/auth/register', registerForm); 
            setMessage(response.message || 'Registration successful');
        } catch (error) {
            setMessage(error.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={registerForm.name}
                        onChange={handleRegisterChange}
                    />
                    {errors.name === false && <span style={{ color: 'green' }}>✔</span>}
                    {errors.name === true && <span style={{ color: 'red' }}>Name is required</span>}
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={registerForm.email}
                        onChange={handleRegisterChange}
                    />
                    {errors.email === false && <span style={{ color: 'green' }}>✔</span>}
                    {errors.email === true && <span style={{ color: 'red' }}>Invalid email</span>}
                </div>

                <div>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={registerForm.phone}
                        onChange={handleRegisterChange}
                    />
                    {errors.phone === false && <span style={{ color: 'green' }}>✔</span>}
                    {errors.phone === true && (
                        <span style={{ color: 'red' }}>Invalid phone number (10 digits)</span>
                    )}
                </div>

                <div>
                    <select
                        name="userType"
                        value={registerForm.userType}
                        onChange={handleRegisterChange}
                    >
                        <option value="User">User</option>
                        <option value="Mover">Mover</option>
                    </select>
                </div>

                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                    />
                    {errors.password === false && <span style={{ color: 'green' }}>✔</span>}
                    {errors.password === true && (
                        <span style={{ color: 'red' }}>Password must be at least 6 characters</span>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                    />
                    {errors.confirmPassword === false && <span style={{ color: 'green' }}>✔</span>}
                    {errors.confirmPassword === true && (
                        <span style={{ color: 'red' }}>Passwords do not match</span>
                    )}
                </div>

                <button type="submit" disabled={!isFormValid}>
                    Register
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
