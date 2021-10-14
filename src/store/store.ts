import rootReducer from './rootReducer'
import { compose , createStore, applyMiddleware } from 'redux'

const middlewares = [];

const enhancer = compose(applyMiddleware(...middlewares))

const initialState = {}

const store = createStore(rootReducer, initialState, enhancer)

export default store 