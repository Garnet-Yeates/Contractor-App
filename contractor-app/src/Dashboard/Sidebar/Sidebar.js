import React from 'react'
import { connect } from 'react-redux';
import LogoutButton from './LogoutButton';
import TreeViewComponent from './TreeView/TreeViewComponent';

function Sidebar(props) {

    let nodeId = 0;
    const getNodeId = () => {
        return String(nodeId++);
    }

    return (
        <div className="sidebar-container">
            <TreeViewComponent getNodeId={getNodeId} />
            <LogoutButton getNodeId={getNodeId} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    selected: state.treeView.selected,
    expanded: state.treeView.expanded,
})

export default connect(mapStateToProps)(Sidebar)
