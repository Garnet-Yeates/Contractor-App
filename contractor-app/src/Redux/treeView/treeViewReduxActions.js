export const SET_EXPANDED = 'SET_EXPANDED'
export const SET_SELECTED = 'SET_SELECTED'
export const SET_CONTENT = 'SET_CONTENT'

export const setExpanded = (expanded) => ({
    type: SET_EXPANDED,
    payload: expanded,
})

export const setSelected = (selected) => ({
    type: SET_SELECTED,
    payload: selected,
})

export const setDashboardContent = (content) => ({
    type: SET_CONTENT,
    payload: content,
})
