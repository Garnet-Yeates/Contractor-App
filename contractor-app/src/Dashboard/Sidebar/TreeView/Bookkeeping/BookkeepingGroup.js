import React, { useState } from 'react'
import { connect } from 'react-redux'

import StyledTreeItem from '../StyledTreeItem';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import ViewEntriesPage from '../../../Pages/Bookkeeping/ViewEntriesPage';
import AddEntryPage from '../../../Pages/Bookkeeping/AddEntryPage';
import DescriptionIcon from '@material-ui/icons/Description';

import { setDashboardContent } from '../../../../Redux/treeView/treeViewReduxActions'

function BookkeepingGroup(props) {

    // From parent
    const { getNodeId, template, template: { name } } = props;

    // From store
    const { setDashboardContent } = props;

    return (
        <StyledTreeItem
            nodeId={getNodeId()}
            labelText={name}
            labelIcon={DescriptionIcon}
            color="#a250f5"
            bgColor="#f3e8fd"
        >
            <StyledTreeItem
                nodeId={getNodeId()}
                labelText="Add Entry"
                labelIcon={AddCircleIcon}
                color="#3c8039"
                bgColor="#e6f4ea"
                onClick={() => setDashboardContent(<AddEntryPage template={template} />)}
            />
            <StyledTreeItem
                nodeId={getNodeId()}
                labelText="View Entries"
                labelIcon={VisibilityIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
                onClick={() => setDashboardContent(<ViewEntriesPage></ViewEntriesPage>)}
            />
            <StyledTreeItem
                nodeId={getNodeId()}
                labelText="Edit Template"
                labelIcon={EditIcon}
                color="#e3742f"
                bgColor="#fcefe3"
                onClick={() => setDashboardContent(<div>Edit Template</div>)}
            />
        </StyledTreeItem>
    )
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    setDashboardContent,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookkeepingGroup)
