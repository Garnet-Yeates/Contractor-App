import React from 'react'
import ReceiptIcon from '@material-ui/icons/Receipt';
import { connect } from 'react-redux'
import StyledTreeItem from '../StyledTreeItem';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DescriptionIcon from '@material-ui/icons/Description';

function BillsTreeItem(props) {
    // From parent
    const { getNodeId, expanded, setExpanded } = props;

    return (
        <StyledTreeItem
            nodeId={getNodeId()}
            labelText="Bills"
            labelIcon={ReceiptIcon}
            color="#a250f5"
            bgColor="#f3e8fd"
        >
            <StyledTreeItem
                nodeId={getNodeId()}
                labelText="New Bill"
                labelIcon={PostAddIcon}
                color="#3c8039"
                bgColor="#e6f4ea"
            />
            <StyledTreeItem
                nodeId={getNodeId()}
                labelText="Pricing Table"
                labelIcon={MonetizationOnIcon}
                color="#3c8039"
                bgColor="#e6f4ea"
            />
            <StyledTreeItem
                nodeId={getNodeId()}
                labelText="View Bills"
                labelIcon={VisibilityIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
            />

        </StyledTreeItem>
    )
}

const mapStateToProps = (state) => ({

})


export default connect(mapStateToProps)(BillsTreeItem)
