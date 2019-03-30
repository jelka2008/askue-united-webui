import { combineReducers } from 'redux'

import { alert } from './alert'
import { consumer } from './consumer'
import { feeder } from './feeder'
import { channel } from './channel'


const rootReducer = combineReducers({
	alert,
	consumer,
	feeder,
	channel,
})


export default rootReducer
