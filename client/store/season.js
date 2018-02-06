// ACTION TYPE
const SET_SEASON = 'SET_SEASON'

// INITIAL STATE
const defaultSeason = 0

// ACTION CREATOR
const setSeason = (season) => ({type: SET_SEASON, season})

// DISPATCHER
export const changeSeason = (season) => dispatch => {
  dispatch(setSeason(season))
}


// REDUCER
export default function (state = defaultSeason, action) {
  switch (action.type) {
    case SET_SEASON:
      return action.season
    default:
      return state
  }
}
