import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import '../../Styles.scss'
import './StyleSheet.scss'

import { Link } from 'react-router-dom';
import axios from 'axios';

function RegistrationPage(props) {
    const { history } = props;

    const { auth = {} } = props;

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (auth.isAuthenticated) {
            console.log("You are already logged in! Congrats!")
            history.push('/dashboard');
        }
    }, [])

    const onSubmit = (event) => {
        event.preventDefault()
        register({
            fullName,
            username,
            email,
            password,
            confirmPassword,
        }, history, setErrors)
    }

    return (
        <div className='registration-page'>
            <div className='full-screen-container'>
                <div className="slate-box">
                    <h2>Create Account</h2>
                    <hr />
                    <div className='hbox spaced'>
                        <RegisterField
                            label={"Full Name"}
                            value={fullName}
                            setValue={setFullName}
                            error={errors.fullName}
                        />
                        <RegisterField
                            label={"Username"}
                            value={username}
                            setValue={setUsername}
                            error={errors.username}
                        />
                    </div>
                    <hr />
                    <div className='hbox spaced'>
                        <RegisterField
                            label={"Email Address"}
                            value={email}
                            setValue={setEmail}
                            error={errors.email}
                        />
                        <RegisterField
                            label={"Phone Number"}
                            altLabel="Optional"
                            value={phoneNumber}
                            setValue={setPhoneNumber}
                            error={errors.phoneNumber}
                        />
                    </div>
                    <hr />
                    <div className='vbox'>
                        <div className='hbox spaced'>
                            <RegisterField
                                label={"Password"}
                                value={password}
                                setValue={setPassword}
                                noError
                                type="password"
                            />
                            <RegisterField
                                label={"Confirm Password"}
                                value={confirmPassword}
                                setValue={setConfirmPassword}
                                noError
                                type="password"
                            />
                        </div>
                        <div className='hbox spaced'>
                            <div className="error-text">{errors.password}</div>
                        </div>
                    </div>
                    <hr />
                    <div className='vbox'>
                        <div className="hbox space-between align-end">
                            <Link to='/login'>Already Have an Account?</Link>
                            <button className="btn" onClick={onSubmit}>Register</button>
                        </div>
                        <div className="error-text">{errors.internalError}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function RegisterField(props) {

    const { label, altLabel, value, setValue, error, noError, ...other } = props;

    return (
        <div className="vbox">
            <div className="double-label-container">
                <label>{label}</label>
                <label className="extra-info-label">{altLabel}</label>
            </div>
            <input {...other} className="slate-input" value={value} onChange={(event) => setValue(event.target.value)} />
            {
                !noError &&
                <div className="error-text">{error}</div>
            }
        </div>
    )
}

const register = (userData, history, setErrors) => {
    axios.post('http://localhost:4000/register', userData)
        .then(() => {
            history.push('/login');
        })
        .catch((err) => {
            if (!err.response)
                return setErrors({ internalError: 'No response from server' })
            console.log(err.response);
            setErrors(err.response.data);
        })
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(RegistrationPage);