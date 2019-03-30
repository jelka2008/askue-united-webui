import React from 'react'
import { Modal } from 'react-bootstrap'

//const style_re = /<style>(html|body).*\{.*\}<\/style>/m

const AlertTEXT = (props) => (
	<pre>
		{props.content}
	</pre>
)

const AlertHTML = (props) => (
	<div
		dangerouslySetInnerHTML={{
			__html: props.content,
		}}
	></div>
)

const AlertJSONItemList = (props) => (
	<ul>{
		props.items.map((item, index) => (
			<li key={index}>{item}</li>
		))
	}</ul>
)

const AlertJSON = (props) => (
	Object.keys(props.content).map((key, index) => (
		<div key={key}>
			<h5>{key}</h5>{
			Array.isArray(props.content[key])
			? <AlertJSONItemList items={props.content[key]} />
			: props.content[key]
			}
		</div>
	))
)

export const AlertBODY = {
	"json": AlertJSON,
	"html": AlertHTML,
	"text": AlertTEXT,
}

export const AlertModal = (props) => {
	const message = props.alert.message
	const title = `Error ${message.status}: ${message.statusText}`

	const ThisAlert = AlertBODY[message.type]

	return (
		<Modal show={props.show} onHide={props.handleClose} bsSize="large">
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{
				<ThisAlert content={message.content} />
			}</Modal.Body>
		</Modal>
	)
}
