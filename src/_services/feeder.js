import { requests } from '../_helpers'


export const feederService = {
	list,
	create,
	update,
	delete: _delete,
}


function list(consumer_id) {
	return requests.main(
		'GET',
		`/api/consumer/${consumer_id}/feeder/`,
	)
}


function create(consumer_id, data) {
	return requests.data(
		'POST',
		`/api/consumer/${consumer_id}/feeder/`,
		data,
	)
}


function update(consumer_id, feeder_id, data) {
	return requests.data(
		'PUT',
		`/api/consumer/${consumer_id}/feeder/${feeder_id}/`,
		data,
	)
}


function _delete(consumer_id, feeder_id) {
	return requests.main(
		'DELETE',
		`/api/consumer/${consumer_id}/feeder/${feeder_id}/`,
	)
}
