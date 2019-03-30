//import { authHeader } from '../_helpers'

export const requests = {
	main: baseRequest,
	data: baseDataRequest,
	file: baseFileUploadRequest,
	fake: fakePromiseLogger,
	many: manyFileUploadRequest,
}

export function handleResponse(response) {
	const contentType = response.headers.get("content-type")
	const is_type = i => (contentType && contentType.indexOf(i) !== -1)

	const is_json = is_type("application/json")
	const is_html = is_type("html")

	return response.text().then(text => {
		const type = (is_json && "json") || (is_html && "html") || "text"
		const content = (is_json && text && JSON.parse(text)) || text

		if (response.ok) {
			return content
		}

		const error = {
			type,
			content,
			status: response.status,
			statusText: response.statusText,
		}

		return Promise.reject(error)
	})
}

function tinyRequest(method, url) {
//	let headers = authHeader()

//	headers['Content-Type'] = 'application/json'

	let requestOptions = {
		method: method,
//		headers: headers,
		credentials: 'same-origin',
	}

	return fetch(url, requestOptions)
}

function tinyDataRequest(method, url, body) {
//	let headers = authHeader()

//	headers['Content-Type'] = 'application/json'

	let requestOptions = {
		method: method,
//		headers: headers,
		body: JSON.stringify(body),
		credentials: 'same-origin',
	}

	return fetch(url, requestOptions)
}

function tinyFileUploadRequest(method, url, files) {
//	let headers = authHeader()

	let formData = new FormData()

	files.forEach(file => {
		formData.append("file", file)
	})

	let requestOptions = {
		method: method,
//		headers: headers,
		body: formData,
		credentials: 'same-origin',
	}

	return fetch(url, requestOptions)
}

function baseRequest(method, url) {
	return tinyRequest(method, url)
		.then(handleResponse)
}

function baseDataRequest(method, url, body) {
	return tinyDataRequest(method, url, body)
		.then(handleResponse)
}

function baseFileUploadRequest(method, url, files) {
	return tinyFileUploadRequest(method, url, files)
		.then(handleResponse)
}

function* manyFileUploadRequest(method, url, files) {
	let reqNum
	let reqFiles
	let startFileIndex, endFileIndex

	const fileCount = 50
	const fileReqCount = Math.ceil(files.length / fileCount)
	for (reqNum=0; reqNum<fileReqCount; reqNum++) {
		startFileIndex = fileCount * reqNum
		endFileIndex = startFileIndex + reqNum
		endFileIndex = Math.min(endFileIndex, files.length)

		reqFiles = files.slice(startFileIndex, endFileIndex)
		yield baseFileUploadRequest(method, url, reqFiles)
	}
}


function fakePromiseLogger(method='FAKE', url='fake://', data=null) {
	return new Promise(function(resolve, reject) {
		console.log("fake promice logger:")
		console.log({method, url, data})
		resolve()
	})
}
