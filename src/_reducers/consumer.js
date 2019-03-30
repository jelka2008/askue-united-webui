import { consumerConstants } from '../_constants'

export function consumer(state = {}, action) {
	switch (action.type) {
		case consumerConstants.LIST_REQUEST:
			return {
				...state,
				fetching: true,
			}
		case consumerConstants.LIST_SUCCESS:
			return {
				...state,
				fetching: false,
				data: action.data,
			}
		case consumerConstants.LIST_FAILURE:
			return {
				...state,
				fetching: false,
			}

		case consumerConstants.SELECT:
			return {
				...state,
				selected: action.data,
			}

		default:
			return state
	}
}
