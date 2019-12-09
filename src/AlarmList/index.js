import React from 'react'
import { Segment, Icon, Item } from 'semantic-ui-react'


export default function AlarmList(props){
// format alarm.time showed here into a string from 
	const alarms = props.alarms.map(alarm => {
		return(
			<Item key={alarm.id} color='blue'>
				<Item.Header><Icon name='hourglass half' color='red'/>{alarm.time}</Item.Header>
				<Item.Content>Message: {alarm.content}</Item.Content>
			</Item>
			)
	})

	return(
		<div>
			{alarms}
		</div>
		)
}