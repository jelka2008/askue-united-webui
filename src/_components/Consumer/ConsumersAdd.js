import React from 'react'
import { connect } from 'react-redux'

//import { alertActions } from '../../_actions'
import { consumerActions } from '../../_actions'
import { feederActions } from '../../_actions'
import { Table } from 'react-bootstrap'


class ConsumerAdd extends React.Component {
	constructor(props, context) {
		super(props, context)
		
		const methods = [
			'onChange',
		]
		
		methods.forEach((item) => {
			this[item] = this[item].bind(this)
		})
	}

	onChange(index) {
		this.props.dispatch(consumerActions.select(index))
		const consumer_id = this.props.data[index].id
		this.props.dispatch(feederActions.list(consumer_id))
	}

	componentDidMount() {
		this.props.dispatch(consumerActions.list())
	}

	render() {
		const data = this.props.data
		return (
			
			<Table bordered size="sm">
				<thead>
					<tr>
						<th>№ договора</th>
						<th>Имя потребителя</th>
					</tr>
				</thead>
				<tbody>{data && data.map((item, index) => {
					const trClassName = index === this.props.selected
					? 'bg-primary'
					: ''
					return (
						<tr
							className={trClassName}
							key={index}
							onClick={() => this.onSelect(index)}
						>
							<td>{item.contract}</td>
							<td>{item.name}</td>
						</tr>	
					)
				})
				
				}</tbody>
			</Table>
			
		)
	}
}


function mapStateToProps(state) {
	return {
		data: state.consumer.data || [],
		selected: Number.isInteger(state.consumer.selected)
			? state.consumer.selected
			: -1,
	}
}

const connectedConsumerAdd = connect(mapStateToProps)(ConsumerList)
export { connectedConsumerAdd as ConsumerAdd }