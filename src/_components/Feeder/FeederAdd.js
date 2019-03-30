import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'


class FeederList extends React.Component {
	render() {
		const data = this.props.data
		return (
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Имя фидера</th>
					</tr>
				</thead>
				<tbody>{data && data.map((item, index) =>
					<tr key={index}>
						<td><input
							//className='form-control'
							style={{
								border: 'none',
								background: 'transparent',
							}}
							value={item.name}
						/></td>
					</tr>
				)}
					<tr>
						<td><input
							style={{
								border: 'none',
								background: 'transparent',
							}}
							placeholder="<Add new>"
							//onChange={console.log}
						/></td>
					</tr>
				</tbody>
			</Table>
		)
	}
}


function mapStateToProps(state) {
	return{
		data: state.feeder.data || [],
		selected: Number.isInteger(state.feeder.selected)
			? state.feeder.selected
			: -1,
	}
}

const connectedFeederList = connect(mapStateToProps)(FeederList)
export { connectedFeederList as FeederList }