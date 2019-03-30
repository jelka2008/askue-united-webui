import { requests } from '../_helpers'


export const channelService = {
	list,
	create,
	update,
	delete: _delete,
}


function list(consumer_id, feeder_id) {
	console.log(consumer_id, feeder_id)
	return requests.main(
		'GET',
		`/api/consumer/${consumer_id}/feeder/${feeder_id}/channel/`,
	)
}


function create(consumer_id, feeder_id, data) {
	return requests.data(
		'POST',
		`/api/consumer/${consumer_id}/feeder/${feeder_id}/channel/`,
		data,
	)
}


function update(consumer_id, feeder_id, channel_id, data) {
	return requests.data(
		'PUT',
		`/api/feeder/${feeder_id}/channel/${channel_id}/`,
		data,
	)
}


function _delete(consumer_id, feeder_id, channel_id) {
	return requests.main(
		'DELETE',
		`/api/consumer/${consumer_id}/feeder/${feeder_id}/channel/${channel_id}/`,
	)
}
