import React from 'react'
import { Segment, Icon, Item } from 'semantic-ui-react'


export default function AlarmList(props){

	const alarms = props.alarms.map(alarm => {
		return(
			<Item key={alarm.id} raised color='blue'>
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