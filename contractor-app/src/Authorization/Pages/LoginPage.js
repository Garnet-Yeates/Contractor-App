import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import '../../Styles.scss'
import './StyleSheet.scss'

import { Link } from 'react-router-dom';
import axios from 'axios';
import { loginUser } from '../../Redux/auth/authReduxActions';

function LoginPage(props) {

    const { history, login } = props;

    // From store
    const { auth = {} } = props;

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (auth.isAuthenticated) {
            console.log("You are already logged in! Congrats!")
            history.push('/dashboard');
        }
    }, [])

    const onSubmit = (event) => {
        event.preventDefault()
        login({
            username,
            password,
        }, history, setErrors)
    }

    return (
        <div className='login-page'>
            <div className='full-screen-container'>
                <div className="slate-box">
                    <h3>Log In</h3>
                    <hr />
                    <div className='vbox'>
                        <div className='hbox spaced'>
                            <LoginField
                                label={"Username"}
                                value={username}
                                setValue={setUsername}
                                error={errors.username}
                            />
                            <LoginField
                                label={"Password"}
                                value={password}
                                setValue={setPassword}
                                type="password"
                                error={errors.password}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className='vbox'>
                        <div className="hbox space-between align-end">
                            <Link to='/register'>Don't Have an Account?</Link>
                            <button className="btn" onClick={onSubmit}>Log In</button>
                        </div>
                        <div className="error-text">{errors.internalError}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LoginField(props) {

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

export const login = (userData, history, setErrors) => (dispatch) => {
    axios.post('http://localhost:4000/login', userData)
        .then((res) => {
            let { token } = res.data;
            dispatch(loginUser(token))
            history.push('/dashboard');
        })
        .catch((err) => {
            if (!err.response)
                return setErrors({ internalError: 'No response from server' })
            console.log(err.response);
            setErrors(err.response.data);
        })
}

const mapStateToProps = storeState => ({
    auth: storeState.auth,
});

const mapDispatchToProps = {
    login,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);