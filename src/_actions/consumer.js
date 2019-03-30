import { consumerConstants } from '../_constants'
import { consumerService } from '../_services'
import { alertActions } from './'


export const consumerActions = {
	list,
	select,
}


function list() {
	return dispatch => {
		dispatch(request())

		consumerService.list()
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

	function request() { return { type: consumerConstants.LIST_REQUEST } }
	function success(data) { return { type: consumerConstants.LIST_SUCCESS, data } }
	function failure(error) { return { type: consumerConstants.LIST_FAILURE, error } }
}

function select(data) {
	return { type: consumerConstants.SELECT, data }
}