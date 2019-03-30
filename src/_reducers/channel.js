import { channelConstants } from '../_constants'

export function channel(state = {}, action) {
	switch (action.type) {
		case channelConstants.LIST_REQUEST:
			return {
				...state,
				fetching: true,
			}
		case channelConstants.LIST_SUCCESS:
			return {
				...state,
				fetching: false,
				data: action.data,
			}
		case channelConstants.LIST_FAILURE:
			return {
				...state,
				fetching: false,
			}

		case channelConstants.LIST_SELECT:
			return {
				...state,
				selected: action.data,
			}

		default:
			return state
	}
}
