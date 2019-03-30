import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'


class ChannelList extends React.Component {
	render() {
		const data = this.props.data
		return (
			<Table bordered size="sm">
				<thead>
					<tr>
						<th>Имя канала</th>
					</tr>
				</thead>
				<tbody>{data && data.map((item, index) => {
					//console.log(item)
					//const trClassName = index === this.props.selected
						//? 'bg-primary'
						//: ''
					return(
						<tr
							//className={trClassName}
							key={index}
							//onClick={() => this.onSelect(index)}
						>
							<td><input
								style={{
									border: 'none',
									background: 'transparent',
								}}
								value={item.datapath}
							/></td>
						</tr>
					)
					}
				)}</tbody>
			</Table>
		)
	}
}


function mapStateToProps(state) {
	return{
		data: state.channel.data || [],
		selected: Number.isInteger(state.feeder.selected)
			? state.feeder.selected
			: -1,
	}
}

const connectedChannelList = connect(mapStateToProps)(ChannelList)
export { connectedChannelList as ChannelList }