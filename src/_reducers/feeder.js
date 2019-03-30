import { feederConstants } from '../_constants'

export function feeder(state = {}, action) {
	switch (action.type) {
		case feederConstants.LIST_REQUEST:
			return {
				...state,
				fetching: true,
			}
		case feederConstants.LIST_SUCCESS:
			return {
				...state,
				selected: undefined,
				fetching: false,
				data: action.data,
			}
		case feederConstants.LIST_FAILURE:
			return {
				...state,
				fetching: false,
			}

		case feederConstants.SELECT:
			return {
				...state,
				selected: action.data,
			}

		case feederConstants.RESET:
			return {}

		default:
			return state
	}
}
