import React from 'react'
import { connect } from 'react-redux'

import { alertActions } from '../_actions'
import { Jumbotron } from 'react-bootstrap'
import { ListAggregator } from '../_components/'

import { AlertModal } from './AlertModal'

class App extends React.Component {
	render() {
		return [
			<Jumbotron key="app">
				<ListAggregator />
			</Jumbotron>,
			this.props.alert.message && <AlertModal
				key="app-alert"
				alert={this.props.alert}
				show={true}
				handleClose={() => this.props.dispatch(alertActions.clear())}
			/>
		]
	}
}

function mapStateToProps(state) {
	return {
		alert: state.alert,
	}
}

const connectedApp = connect(mapStateToProps)(App)
export { connectedApp as App }
