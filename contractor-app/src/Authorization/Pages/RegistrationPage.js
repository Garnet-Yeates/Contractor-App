import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import "./StyleSheet.scss";
function RegistrationPage(props) {

    const [loginObject, setLoginObject] = useState({});
    const [errors, setErrors] = useState({});

    // From store
    const { auth = {} } = props;

    useEffect(() => {
        if (auth.isAuthenticated) {
            console.log("You are already logged in! Congrats!")
            this.props.history.push('/dashboard');
        }
    }, [])

    const onChange = (event) => setLoginObject({
        ...loginObject,
        [event.target.id]: event.target.value
    })

    const onSubmit = (event) => {
        // Prevent Default Page Refesh
        event.preventDefault()

        const userData = {
            username: this.state.username,
            password: this.state.password
        }

        let { username, password } = userData;

        console.log(`About to login user with username:${username} password:${password}`)

        this.props.loginUser(userData, this.props.history);
    }

    const { username, password } = loginObject;

    return (
        <div>
            <div className='full-screen-container'>
                <div className='form-container'>
                    <h3>Welcome</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className='input-group'>
                            <input type='text'
                                placeholder='Username'
                                id='username'
                                className='text-input'
                                onChange={onChange}
                                value={username}
                            />
                            <div className='err-tooltip'>{errors.username}</div>
                        </div>
                        <div className='input-group'>
                            <input type='password'
                                placeholder='Password'
                                id='password'
                                className='text-input'
                                onChange={onChange}
                                value={password}
                            />
                            <div className='err-tooltip'>{errors.password}</div>
                        </div>
                        <input type="submit" className='btn btn-red' value='Log In' />
                    </form>
                </div>
            </div>
        </div>
    );

}

const mapStateToProps = storeState => ({
    auth: storeState.auth,
});

export default connect(mapStateToProps)(RegistrationPage);