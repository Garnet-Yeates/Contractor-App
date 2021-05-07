import React, { useState, Component, useRef, useEffect, createContext } from 'react';
import { connect } from 'react-redux'

import Sidebar from './Sidebar/Sidebar';

import './StyleSheet.scss'

export const DashboardContext = createContext();

function DashboardPage(props) {
    let { currContent: CurrentPage } = props;
    console.log(props.match.params);
    return (
        <DashboardContext.Provider value={props.match.params}>
            <div className="fullscreen-container">
                {/*<Homebar />*/}
                <div className="main-container">
                    <Sidebar />
                    <div className="page-container">
                        <CurrentPage.type {...CurrentPage.props} />
                    </div>
                </div>
            </div>
        </DashboardContext.Provider>
    )
}

const mapStateToProps = (state) => ({
    currContent: state.treeView.currContent,
})


export default connect(mapStateToProps)(DashboardPage)
