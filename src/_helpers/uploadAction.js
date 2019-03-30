import { configConstants } from '../_constants'
import { alertActions } from '../_actions'

export function baseUpload(
	uploadFunction,
	uploadConstants,
	files,
	progressBarCallback = null,
) {
	const { maxFileCount, maxBatchSize } = configConstants
	const total = files.length
	const totalSize = files.reduce(
		(a, item) => a + item.size,
		0,
	)

	return dispatch => {
		function* Batch(files) {
			let fileIndex
			let startFileIndex = 0
			let endFileIndex
			let batchSize
			let sentSize = 0

			while (startFileIndex < total) {
				batchSize = 0
				fileIndex = startFileIndex

				endFileIndex = startFileIndex + maxFileCount
				endFileIndex = Math.min(endFileIndex, total)

				while (batchSize < maxBatchSize && fileIndex < endFileIndex) {
					batchSize += files[fileIndex].size
					fileIndex += 1
				}

				yield files.slice(startFileIndex, fileIndex)
				startFileIndex = fileIndex
				sentSize += batchSize

				progressBarCallback && progressBarCallback({
					sentSize,
					totalSize,
					fileIndex,
					total,
				})
			}
		}

		function sendBatch(batch, batchItem = null) {
			if (!batchItem) { batchItem = batch.next() }

			const {value, done} = batchItem

			if (done) { return }

			dispatch(request(value))

			uploadFunction(value)
				.then(
					data => {
						dispatch(success(data))
						return sendBatch(batch)
					},
					error => {
						dispatch(failure(error))
						dispatch(alertActions.error(error))
						return sendBatch(batch, batchItem)
					}
				)
		}

		/*TODO: sort files by size*/
		const batchIter = Batch(files)
		sendBatch(batchIter)
	}

	function request(data) { return { type: uploadConstants.REQUEST, data } }
	function success(data) { return { type: uploadConstants.SUCCESS, data } }
	function failure(error) { return { type: uploadConstants.FAILURE, error } }
}
