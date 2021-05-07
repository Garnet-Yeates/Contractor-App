import axios from 'axios';
import { SET_EXPANDED, SET_SELECTED, SET_CONTENT } from './treeViewReduxActions';

function FillerComponent(props) {
    return (
        <span>
            <p>Filler Content</p>
        </span>
    )
}

const initialState = {
    currContent: <FillerComponent />, // storeState.treeView.currPage
    selected: [],
    expanded: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CONTENT:
            return {
                ...state,
                currContent: action.payload,
            }
        case SET_SELECTED:
            return {
                ...state,
                selected: action.payload,
            }
        case SET_EXPANDED:
            return {
                ...state,
                expanded: action.payload,
            }
        default:
            return state;
    }
}