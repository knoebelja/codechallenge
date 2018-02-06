import React, { Component } from 'react'
import {connect} from 'react-redux'
import {changeSortOrder} from '../store'

class EpisodeList extends Component {

  handleChangeSortOrder(order, e) {
    let [sortBy, sortDirection] = order
    // checks to see if you are selecting the same category
    if (sortBy == this.props.sortOrder[0]) {
      // reverses direction if so
      sortDirection = !this.props.sortOrder[1]
    }
    // change the order
    this.props.changeSortOrder([sortBy, sortDirection])
  }

  sortEpisodes(episodes, sortOrder) {
    let sortDirect = sortOrder[1] ? 1 : -1

      return episodes.sort(function(a , b) {
        let x = a[sortOrder[0]]
        let y = b[sortOrder[0]]

        // fixes problem with numeral titles by forcing things to be string
        if (sortOrder[0] == 'originalTitle') {
          x = String(x)
          y = String(y)
        }

        if (x > y) {
          return 1 * sortDirect
        } else if (x < y) {
          return -1 * sortDirect
        } else {
          return 0
        }
      })
  }

  render () {
    let {season, episodes, sortOrder} = this.props

    // makes sure episodes are loaded
    if (episodes.length && season > -1){

      // filters episodes by season
      if (season !== 0) {
        episodes = episodes.filter(episode => episode.seasonNumber === season)
      }

      episodes = this.sortEpisodes(episodes, sortOrder)

      // has a header and content
      return (
        <div className="episodeContainer">
          <div className="rowHeader">
            <button className="header title"
              onClick={() => this.handleChangeSortOrder(['originalTitle', true])}>
              Original Title
            </button>
            <button className="header seasonNumber"
              onClick={() => this.handleChangeSortOrder(['seasonNumber', true])}>
              Season No.
            </button>
            <button className="header episodeNumber"
              onClick={() => this.handleChangeSortOrder(['episodeNumber', true])}>
              Episode No.
            </button>
            <button className="header averageRating"
              onClick={() => this.handleChangeSortOrder(['averageRating', false])}>
              Rating
            </button>
            <button className="header numVotes"
              onClick={() => this.handleChangeSortOrder(['numVotes', false])}>
              Votes
            </button>
          </div>
          {
            // displays the content of each episode
            episodes.map(episode => <div className={`episode ${episode.seasonNumber} ${episode.episodeNumber}`}
              key={episode.tconst}>
              <div className="originalTitle">{episode.originalTitle}</div>
              <div className="seasonNumber">{episode.seasonNumber}</div>
              <div className="episodeNumber">{episode.episodeNumber}</div>
              <div className="averageRating"><span className="badge">{episode.averageRating}</span></div>
              <div className="numVotes"><span className="badge">{episode.numVotes}</span></div>
            </div>)
          }
        </div>
      )
    } else {
        // default return value
      return (
        <div>There is currently no data.</div>
      )
    }
  }//render

}

const mapState = (state) => {
// maps what's already stored on the state to this component
  return {
    episodes: state.episodes,
    season: state.season,
    sortOrder: state.sortOrder,
  }
}

const mapDispatch = (dispatch) => {
  return {
    changeSortOrder(order) {
      dispatch(changeSortOrder(order))
    }
  }
}

export default connect(mapState, mapDispatch)(EpisodeList)
