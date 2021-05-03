import React, { useState } from 'react'
import { connect } from 'react-redux'


import TreeItem from '@material-ui/lab/TreeItem';

import { setPageContent } from '../TreeViewController'

import StyledTreeItem from '../StyledTreeItem';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ViewEntriesPage from '../../../Pages/Bookkeeping/ViewEntriesPage';
import AddEntryPage from '../../../Pages/Bookkeeping/AddEntryPage';

function BookkeepingGroup(props) {

    // From parent
    const { getNodeId, template, template: { name } } = props;

    // From store
    const { setPageContent } = props;


    return (
        <StyledTreeItem
            nodeId={getNodeId()}
            labelText={name}
            labelIcon={LibraryBooksIcon}
            color="#a250f5"
            bgColor="#f3e8fd"
        >
            <StyledTreeItem
                nodeId={getNodeId()}
                labelText="Add Entry"
                labelIcon={AddCircleIcon}
                color="#3c8039"
                bgColor="#e6f4ea"
                onClick={() => setPageContent(<AddEntryPage template={template} />)}
            />
            <StyledTreeItem
                nodeId={getNodeId()}
                labelText="View Entries"
                labelIcon={VisibilityIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
                onClick={() => setPageContent(<ViewEntriesPage></ViewEntriesPage>)}
            />
            <StyledTreeItem
                nodeId={getNodeId()}
                labelText="Edit Template"
                labelIcon={EditIcon}
                color="#e3742f"
                bgColor="#fcefe3"
                onClick={() => setPageContent(<div>Edit Template</div>)}
            />
        </StyledTreeItem>


    )
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    setPageContent,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookkeepingGroup)
