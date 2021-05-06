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
                    <h2>Create Account</h2>
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
                            error={errors.username}
                        />
                    </div>
                    <hr />
                    <div className='hbox spaced'>
                        <ProfileField
                            label={"Email Address"}
                            value={email}
                            setValue={setEmail}
                            error={errors.email}
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
                    <div className='vbox'>
                        <div className='hbox spaced'>
                            <ProfileField
                                label={"Password"}
                                value={password}
                                setValue={setPassword}
                                noError
                                type="password"
                            />
                            <ProfileField
                                label={"Confirm Password"}
                                value={confirmPassword}
                                setValue={setConfirmPassword}
                                noError
                                type="password"
                            />
                        </div>
                        <div className='hbox spaced'>
                            <div className='hbox'>
                                <div className="error-text">{errors.password}</div>
                            </div>
                        </div>
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

const mapStateToProps = storeState => ({
    auth: storeState.auth,
});

export default connect(mapStateToProps)(RegistrationPage);