import { ADD_TEMPLATE } from '../../../../Redux/actions/ActionTypes'

export const createTemplate = (template, onSuccess) => (dispatch) => {
    let success = () => {
        onSuccess();
        // dispatch(type: SET_CURR_PAGE, template.<JSX thing for form>)
    }

    dispatch({
        type: ADD_TEMPLATE,
        payload: template,
        onSuccess: success,
    })
};

  