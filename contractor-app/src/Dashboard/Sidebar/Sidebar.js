import React from 'react'
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

export default Sidebar;