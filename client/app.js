import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Controller, EpisodeList} from './components'

import {fetchEpisodes, setSeason} from './store'

class App extends Component {

  componentDidMount() {
    // loads initial data to the state
      this.props.loadInitialData()
    }

  render () {
    return (
      <div className="appContainer">
        <Controller/>
        <EpisodeList/>
      </div>
    )
  }
}

const mapState = (state) => {
  // what the empty state looks like before data is loaded
    return {
      episodes: [],
      season: state.season,
      sortOrder: state.sortOrder,
    }
  }

  const mapDispatch = (dispatch) => {
  // loads episodes
    return {
      loadInitialData() {
        dispatch(fetchEpisodes())
      }
    }
  }

  export default connect(mapState, mapDispatch)(App)
