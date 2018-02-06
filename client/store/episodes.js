import axios from 'axios'

// ACTION TYPES
const GET_EPISODES = 'GET_EPISODES'

// INITIAL STATE
const defaultEpisodes = []

// ACTION CREATOR
const getEpisodes = (episodes) => ({type: GET_EPISODES, episodes})

// THUNK CREATOR
export const fetchEpisodes = () => dispatch => {
  // fetches data from the provided URL
  axios.get('http://ec2-52-90-200-167.compute-1.amazonaws.com:8080')
    .then(res => res.data)
    .then(episodes => dispatch(getEpisodes(episodes))) // returns every episode
    .catch(console.err)
}

// REDUCER
export default function episodesReducer (state = defaultEpisodes, action) {
  switch (action.type) {
    case GET_EPISODES:
      return action.episodes
    default:
      return state
  }
}
