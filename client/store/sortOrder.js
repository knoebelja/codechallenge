// ACTION TYPE
const SET_SORT_ORDER = 'SET_SORT_ORDER'

// INITIAL STATE
const defaultSortOrder = ['originalTitle', true]

// ACTION CREATOR
const setSortOrder = (sortOrder) => ({type: SET_SORT_ORDER, sortOrder})

// DISPATCHER
export const changeSortOrder = (sortOrder) => dispatch => {
  dispatch(setSortOrder(sortOrder))
}

// REDUCER
export default function (state = defaultSortOrder, action) {
  switch (action.type) {
    case SET_SORT_ORDER:
      return action.sortOrder
    default:
      return state
  }
}
