import React from 'react'

import { Row, Col, Button } from 'react-bootstrap'
import { ConsumerList } from '../'
import { FeederList } from '../'
import { ChannelList } from '../'


export class ListAggregator extends React.Component {
	render() {
		return (
			<Row className='h-50 d-inline-block'>
				<Col xs={6}><ConsumerList key='consumer-list' /></Col>
				<Col xs={4}><FeederList key='feeder-list' /></Col>
				<Col xs={4}><ChannelList key='channel-list' /></Col>
				<Button 
					variant="outline-success"
					onClick={this.ConsumerAdd}
				>
					Удалить потребителя
				</Button>		
				<Button 
					variant="outline-success"
					onClick={this.FeederAdd}
				>
					Удалить фидер
				</Button>	
			</Row>

		)
	}
}
