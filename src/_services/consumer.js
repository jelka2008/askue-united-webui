import { requests } from '../_helpers'


export const consumerService = {
	list,
	create,
	update,
	delete: _delete,
}


function list() {
	return requests.main(
		'GET',
		`/api/consumer/`,
	)
}


function create(data) {
	return requests.data(
		'POST',
		`/api/consumer/`,
		data,
	)
}


function update(consumer_id, data) {
	return requests.data(
		'PUT',
		`/api/consumer/${consumer_id}/`,
		data,
	)
}


function _delete(consumer_id) {
	return requests.main(
		'DELETE',
		`/api/consumer/${consumer_id}/`,
	)
}

