import { SET_CONTENT } from '../../../Redux/actions/ActionTypes'

export const setPageContent = (page) => {
    return {
        type: SET_CONTENT,
        payload: page,
    }
};
