import { SET_EXPANDED_ITEMS } from '../actions/ActionTypes.js'
import { SET_CONTENT } from '../actions/ActionTypes.js'

function FillerComponent(props) {
    return (
        <span>
            <p>Filler Content</p>
        </span>
    )
}

const initialState = {
    currContent: <FillerComponent />, // storeState.treeView.currPage
    expandedItems: [], // storeState.treeView.expandedItems
};


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CONTENT:
            return {
                ...state,
                currContent: action.payload,
            }
        default:
            return state;
    }
}