import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from '../_reducers'


const middleware = applyMiddleware(
	thunkMiddleware,
	createLogger(),
)

const enhachers = window.__REDUX_DEVTOOLS_EXTENSION__
	? compose(
		middleware,
		window.__REDUX_DEVTOOLS_EXTENSION__(),
	)
	: middleware

export const store = createStore(
	rootReducer,
	enhachers,
)

export const dispatch = store.dispatch
