import React, { useState } from 'react'
import { connect } from 'react-redux'
import TreeView from '@material-ui/lab/TreeView';
import BookkeepingTreeItem from './Bookkeeping/BookkeepingTreeItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import './TreeViewStyles.scss'
import StyledTreeItem from './StyledTreeItem';
import EventIcon from '@material-ui/icons/Event';
import BillsTreeItem from './Bills/BillsTreeItem';



function TreeViewComponent(props) {
    const { } = props

    let nodeId = 0;
    const getNodeId = () => {
        return String(nodeId++);
    }

    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };

    return (
        <div className="tree-view-container">
            <TreeView
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                expanded={expanded}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                <StyledTreeItem
                    nodeId={getNodeId()}
                    labelText="Schedule"
                    labelIcon={EventIcon}
                    color="#a250f5"
                    bgColor="#f3e8fd"
                />
                <BillsTreeItem
                    getNodeId={getNodeId}
                    setExpanded={setExpanded}
                    expanded={expanded}
                />
                <BookkeepingTreeItem
                    getNodeId={getNodeId}
                    setExpanded={setExpanded}
                    expanded={expanded}
                />
            </TreeView>
        </div >
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TreeViewComponent)
