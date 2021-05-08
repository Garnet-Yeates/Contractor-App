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

import { setDashboardContent, setExpanded, setSelected } from '../../../Redux/treeView/treeViewReduxActions'

function TreeViewComponent(props) {
    const { selected, expanded, setSelected, setExpanded, getNodeId } = props

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };

    return (
        <div className="tree-view-container">
            <TreeView
                defaultCollapseIcon={<ArrowDropDownIcon className="tree-view-icon" />}
                defaultExpandIcon={<ArrowRightIcon className="tree-view-icon" />}
                expanded={expanded}
                selected={selected}
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
                <BillsTreeItem getNodeId={getNodeId} />
                <BookkeepingTreeItem getNodeId={getNodeId} />
            </TreeView>
        </div >
    )
}

const mapStateToProps = (state) => ({
    selected: state.treeView.selected,
    expanded: state.treeView.expanded,
})

const mapDispatchToProps = {
    setExpanded,
    setSelected,
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeViewComponent)
