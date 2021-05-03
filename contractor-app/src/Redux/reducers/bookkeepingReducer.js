import {
    ADD_TEMPLATE,
    CLEAR_TEMPLATE_NAME_ERRORS,
    REMOVE_TEMPLATE,
    MODIFY_TEMPLATE,
    ADD_TEMPLATE_ENTRY,
    REMOVE_TEMPLATE_ENTRY,
    MODIFY_TEMPLATE_ENTRY
} from '../actions/ActionTypes.js'

const initialState = {
    templates: [], // storeState.bookkeeping.templates
    entries: [], // storeState.bookkeeping.entries
    errors: {} // storeState.bookkeeping.errors
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAR_TEMPLATE_NAME_ERRORS:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    templateName: undefined,
                }
            }
        case ADD_TEMPLATE:
            let template = action.payload;
            let onSuccess = action.onSuccess;
            for (let existingTemplate of state.templates) {
                if (existingTemplate.name.toLowerCase() === template.name.toLowerCase()) {
                    return {
                        ...state,
                        errors: {
                            ...state.errors,
                            templateName: "Template With This Name Already Exists"
                        }
                    }
                }
            }
            onSuccess();
            return {
                ...state,
                errors: {
                    ...state.errors,
                    templateName: undefined,
                },
                templates: [...state.templates, template]
            }
        default:
            return state;
    }
}