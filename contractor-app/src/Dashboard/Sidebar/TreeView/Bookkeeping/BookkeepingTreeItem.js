import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { connect } from 'react-redux'

import TreeItem from '@material-ui/lab/TreeItem';
import BookkeepingGroup from './BookkeepingGroup'

import StyledTreeItem from '../StyledTreeItem';
import CreateTemplatePage from '../../../Pages/Bookkeeping/CreateTemplatePage';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { DashboardContext } from '../../../DashboardPage';
import { usePrevious, useRefWithMountHandler } from '../../../../Hooks/Hooks';

import { setDashboardContent, setExpanded, setSelected } from '../../../../Redux/treeView/treeViewReduxActions'

function BookkeepingTreeItem(props) {

    const params = useContext(DashboardContext);
    // From parent
    const { getNodeId } = props;

    // From store
    const { templates, setDashboardContent, setExpanded, setSelected } = props;
    const prevTemplates = usePrevious(templates);

    useEffect(() => {
        console.log(params)
        if (params.action === "createTemplate") {
            setExpanded(["5"]);
            setSelected(["6"]);
            onCreateTemplatePress();
        }
    }, []);

    useEffect(() => {
        if (prevTemplates && templates.length > prevTemplates.length) {
            let newestId = 7 + (templates.length - 1) * 4
            setExpanded(["5", String(newestId)]);
        }
    }, [templates])

    function onCreateTemplatePress() {
        setDashboardContent(<CreateTemplatePage />);
    }

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
                onClick={onCreateTemplatePress}
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

const mapDispatchToProps = {
    setDashboardContent,
    setExpanded,
    setSelected,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookkeepingTreeItem)