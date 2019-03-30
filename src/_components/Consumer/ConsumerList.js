import React from 'react'
import { connect } from 'react-redux'

import { consumerActions } from '../../_actions'
import { feederActions } from '../../_actions'
import { Table } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'


export const Cell = (props) => (
	<div className={
		props.className
			? ("d-table-cell " + props.className)
			: "d-table-cell"
	}>
		{props.children}
	</div>
)

class ConsumerList extends React.Component {
	constructor(props, context) {
		super(props, context)
		
		const methods = [
			'onSelect',
		]
		
		methods.forEach((item) => {
			this[item] = this[item].bind(this)
		})
	}

	onSelect(index) {
		this.props.dispatch(consumerActions.select(index))
		const consumer_id = this.props.data[index].id
		this.props.dispatch(feederActions.list(consumer_id))
	}
	
// по факту загрузки страницы заполняется таблица потребителей
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
						<th><Glyphicon
							glyph="plus"
							key="toggle"
							className="ph-1"
							//onClick={props.toggleChildrenClose}
						/></th>
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
							<td><Glyphicon
								glyph="pencil"
								key="toggle"
								className="ph-1"
								//onClick={props.toggleChildrenClose}
							/></td>
						</tr>	
					)
				})}
				</tbody>
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

const connectedConsumerList = connect(mapStateToProps)(ConsumerList)
export { connectedConsumerList as ConsumerList }
