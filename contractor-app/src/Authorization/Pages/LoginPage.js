import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';

function LoginPage(props) {

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
        event.preventDefault();
    }


    return (
        <div></div>
    );

}

const mapStateToProps = storeState => ({
    auth: storeState.auth,
});

export default connect(mapStateToProps)(LoginPage);