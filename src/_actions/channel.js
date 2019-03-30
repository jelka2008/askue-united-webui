import { channelConstants } from '../_constants'
import { channelService } from '../_services'
import { alertActions } from './'


export const channelActions = {
	list,
	select,
//	create,
//	delete: _delete,
}


function select(data) {
	return { type: channelConstants.LIST_SELECT, data }
}


function list(consumer_id, feeder_id) {
	return dispatch => {
		dispatch(request())

		channelService.list(consumer_id, feeder_id)
			.then(
				data => {
					dispatch(success(data))
				},
				error => {
					dispatch(failure(error))
					dispatch(alertActions.error(error))
				}
			)
	}

	function request() { return { type: channelConstants.LIST_REQUEST } }
	function success(data) { return { type: channelConstants.LIST_SUCCESS, data } }
	function failure(error) { return { type: channelConstants.LIST_FAILURE, error } }
}