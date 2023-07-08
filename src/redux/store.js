import { createStore } from 'redux'
import reducers from './reducers'
import state from './state'
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reducers, state, composeWithDevTools())