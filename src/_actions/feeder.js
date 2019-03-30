import { feederConstants } from '../_constants'
import { feederService } from '../_services'
import { alertActions } from './'


export const feederActions = {
	list,
	select,
	create,
	delete: _delete,
	reset,
}


function select(data) {
	return { type: feederConstants.SELECT, data }
}

function reset() {
	return { type: feederConstants.RESET }
}


function list(consumer_id) {
	return dispatch => {
		dispatch(request())

		feederService.list(consumer_id)
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

	function request() { return { type: feederConstants.LIST_REQUEST } }
	function success(data) { return { type: feederConstants.LIST_SUCCESS, data } }
	function failure(error) { return { type: feederConstants.LIST_FAILURE, error } }
}


function create(consumer_id) {
	return dispatch => {
		dispatch(request())

		feederService.create(consumer_id)
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

	function request() { return { type: feederConstants.ListREQUEST } }
	function success(data) { return { type: feederConstants.ListSUCCESS, data } }
	function failure(error) { return { type: feederConstants.ListFAILURE, error } }
}


function _delete(consumer_id) {
	return dispatch => {
		dispatch(request())

		feederService.delete(consumer_id)
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

	function request() { return { type: feederConstants.ListREQUEST } }
	function success(data) { return { type: feederConstants.ListSUCCESS, data } }
	function failure(error) { return { type: feederConstants.ListFAILURE, error } }
}
