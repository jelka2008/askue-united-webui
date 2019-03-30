import React from 'react'
import { connect } from 'react-redux'

import { Table } from 'react-bootstrap'
import { channelActions } from '../../_actions'
import { feederActions } from '../../_actions'
import { Glyphicon } from 'react-bootstrap'


class FeederList extends React.Component {
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
		 //отправка в пропс индекса выбранного фидера
		this.props.dispatch(feederActions.select(index))
		//монетизация содержимого пропс (превращение в data)
		const feeder_id = this.props.data[index].id
		// отправка в пропс ВСЕХ каналов выбранного фидера объекта
		this.props.dispatch(channelActions.list(
			this.props.consumerId,
			feeder_id,
		))
	}


	render() {
		const data = this.props.data
		return (
		
			<Table bordered size="sm">
				<thead>
					<tr>
						<th>Имя фидера</th>
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

					return(
						<tr
							className={trClassName}
							key={index}
							onClick={() => this.onSelect(index)}
						>
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
	const consumerData = state.consumer.data
	const consumerSelected = state.consumer.selected
	const consumerId = consumerSelected
		&& consumerData
		&& consumerData[consumerSelected]
	return {
		consumerId,
		data: state.feeder.data || [],
		selected: Number.isInteger(state.feeder.selected)
			? state.feeder.selected
			: -1,
	}
}

const connectedFeederList = connect(mapStateToProps)(FeederList)
export { connectedFeederList as FeederList }


