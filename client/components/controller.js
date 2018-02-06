import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changeSeason} from '../store'

class Controller extends Component {
// allows to filter by seasons

  handleChangeSeason(num, e) {
    this.props.changeSeason(num)
  }

  filterOutSeasons(episodes) {
    // reduces the episodes to a list of each episodes season
    const seasons = episodes.map(episode => episode.seasonNumber)
    // reduce to a unique list of seasons
    const seasonsList = [...new Set(seasons)]
    // sorts from smallest to greatest value
    seasonsList.sort((a, b) => a - b)
    return seasonsList
  }

  render () {
    const {episodes, season} = this.props

    // waits for episodes to load
    if (episodes.length){

      const seasonsList = this.filterOutSeasons(episodes)

      return (
        <div className="controllerContainer">
          <button
            className="controllerItem 0"
            key="0"
            onClick={() => this.handleChangeSeason(0)}
          >
            All
          </button>
          {
            seasonsList.map(num => (
              <button
                className={`controllerItem ${num}`}
                key={num}
                onClick={() => this.handleChangeSeason(num)}
              >
                Season {num}
              </button>
            ))
          }
        </div>
      )
    } else {
      // if data hasn't loaded yet..
      return (
        <div>Waiting for data...</div>
      )
    }
  }
}

const mapState = (state) => {
// empty state for now
  return {
    episodes: state.episodes,
    season: state.season,
  }
}

const mapDispatch = (dispatch) => {
  // loads episodes
  return {
    changeSeason(num) {
      dispatch(changeSeason(num))
    }
  }
}

export default connect(mapState, mapDispatch)(Controller)
