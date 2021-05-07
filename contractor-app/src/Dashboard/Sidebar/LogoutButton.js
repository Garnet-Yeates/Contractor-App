import React from 'react'
import TreeView from '@material-ui/lab/TreeView'
import StyledTreeItem from './TreeView/StyledTreeItem'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logoutUser } from '../../Redux/auth/authReduxActions'
import { connect } from 'react-redux';

function LogoutButton(props) {
    const { getNodeId, history } = props

    // From store
    const { logoutUser } = props
    console.log(logoutUser)

    return (
        <TreeView
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
        >
            <StyledTreeItem
                nodeId={getNodeId()}
                labelText="Log Out"
                labelIcon={ExitToAppIcon}
                color="#a250f5"
                bgColor="#f3e8fd"
                onClick={() => { console.log("fuck"); logoutUser(history) }}
            />
        </TreeView>
    )
}

const mapDispatchToProps = {
    logoutUser,
}

export default connect(null, mapDispatchToProps)(LogoutButton)