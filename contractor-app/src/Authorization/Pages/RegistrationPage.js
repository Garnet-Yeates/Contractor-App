import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import '../../Styles.scss'
import { loginUser, registerUser } from '../Actions/userAuthActions';
import './StyleSheet.scss'

import { Link } from 'react-router-dom';

function RegistrationPage(props) {

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});

    // From store
    const { auth = {} } = props;

    useEffect(() => {
        if (auth.isAuthenticated) {
            console.log("You are already logged in! Congrats!")
            this.props.history.push('/dashboard');
        }
    }, [])

    const onSubmit = (event) => {
        // Prevent Default Page Refesh
        event.preventDefault()
        registerUser({
            fullName,
            username,
            email,
            password,
            confirmPassword,
        }, props.history, setErrors)
    }

    return (
        <div className='registration-page'>
            <div className='full-screen-container'>
                <div className="slate-box">
                    <h3>Create Account</h3>
                    <hr />
                    <div className='hbox spaced'>
                        <ProfileField
                            label={"Full Name"}
                            value={fullName}
                            setValue={setFullName}
                            error={errors.fullName}
                        />
                        <ProfileField
                            label={"Username"}
                            value={username}
                            setValue={setUsername}
                            error={errors.userName}
                        />
                    </div>
                    <hr />
                    <div className='hbox spaced'>
                        <ProfileField
                            label={"Email Address"}
                            value={email}
                            setValue={setEmail}
                            error={errors.fullName}
                        />
                        <ProfileField
                            label={"Phone Number"}
                            altLabel="Optional"
                            value={phoneNumber}
                            setValue={setPhoneNumber}
                            error={errors.phoneNumber}
                        />
                    </div>
                    <hr />
                    <div className='hbox spaced'>
                        <ProfileField
                            label={"Password"}
                            value={password}
                            setValue={setPassword}
                            error={errors.password}
                            type="password"
                        />
                        <ProfileField
                            label={"Confirm Password"}
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            error={errors.confirmPassword}
                            type="password"
                        />
                    </div>
                    <hr />
                    <div className="hbox space-between align-end">
                        <Link to='/login'>Already Have an Account?</Link>
                        <button className="btn" onClick={onSubmit}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProfileField(props) {

    const { label, altLabel, value, setValue, error, ...other } = props;

    return (
        <div className="vbox">
            <div className="double-label-container">
                <label>{label}</label>
                <label className="extra-info-label">{altLabel}</label>
            </div>
            <input {...other} className="slate-input" value={value} onChange={(event) => setValue(event.target.value)} />
            <div className="error-text">{error}</div>
        </div>
    )
}

const mapStateToProps = storeState => ({
    auth: storeState.auth,
});

export default connect(mapStateToProps)(RegistrationPage);