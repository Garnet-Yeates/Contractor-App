import React, { useEffect, useRef, useState } from 'react'

import { connect } from 'react-redux'

import TreeItem from '@material-ui/lab/TreeItem';
import BookkeepingGroup from './BookkeepingGroup'

import { setPageContent } from '../TreeViewController'
import StyledTreeItem from '../StyledTreeItem';
import CreateTemplatePage from '../../../Pages/Bookkeeping/CreateTemplatePage';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function BookkeepingTreeItem(props) {

    // From parent
    const { getNodeId, expanded, setExpanded } = props;

    // From store
    const { templates, setPageContent } = props;

    const prevTemplates = usePrevious(templates);

    useEffect(() => {
        if (prevTemplates && templates.length > prevTemplates.length) {
            let newestId = 7 + (templates.length - 1) * 4
            setExpanded(["5", String(newestId)]);
        }
    }, [templates])

    return (
        <StyledTreeItem
            nodeId={getNodeId()}
            labelText="Bookkeeping"
            labelIcon={LibraryBooksIcon}
            color="#a250f5"
            bgColor="#f3e8fd"
        >
            <StyledTreeItem
                nodeId={getNodeId()}
                labelText="Create New Template"
                labelIcon={NoteAddIcon}
                color="#3c8039"
                bgColor="#e6f4ea"
                onClick={() => setPageContent(<CreateTemplatePage />)}
            />
            {templates.map((template, index) => {
                return (
                    <BookkeepingGroup
                        key={template.name}
                        getNodeId={getNodeId}
                        template={template}
                    ></BookkeepingGroup>
                )
            })}
        </StyledTreeItem>
    )
}

const mapStateToProps = (state) => ({
    templates: state.bookkeeping.templates,
})

const mapDispatchToProps = dispatch => ({
    setPageContent: function (page) { dispatch(setPageContent(page)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(BookkeepingTreeItem)