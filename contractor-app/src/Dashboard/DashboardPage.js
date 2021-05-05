import React, { useState, Component, useRef, useEffect } from 'react';
import { connect } from 'react-redux'

import Sidebar from './Sidebar/Sidebar';

import './StyleSheet.scss'

function DashboardPage(props) {

    let { currContent: CurrentPage } = props;

    return (
        <div className="fullscreen-container">
            {/*<Homebar />*/}
            <div className="main-container">
                <Sidebar />
                <div className="page-container">
                    <CurrentPage.type {...CurrentPage.props} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currContent: state.treeView.currContent,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
