import { createStore, applyMiddleware, combineReducers } from 'redux'
import episodes from './episodes'
import season from './season'
import sortOrder from './sortOrder'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const reducer = combineReducers({
  episodes,
  season,
  sortOrder,
})

const middleware =   applyMiddleware(
  thunk,
  createLogger(),
)

// create the store with thunk and logger middleware
const store = createStore(reducer, middleware)

export default store
export * from './episodes'
export * from './season'
export * from './sortOrder'
