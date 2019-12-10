import React from 'react'
import { Icon, Item } from 'semantic-ui-react'


export default function AlarmList(props){
// format alarm.time showed here into a string from 
	const alarms = props.alarms.map(alarm => {
		return(
			<Item key={alarm.id} color='blue'>
				<Item.Header>{alarm.time}  <Icon name='edit' color='red'/> <Icon name='delete' color='red'/></Item.Header>
				<Item.Content>Message: {alarm.content}<Icon name='hourglass half' color='red'/></Item.Content>
			</Item>
			)
	})

	return(
		<Item.Group divided>
			{alarms}
		</Item.Group>
		)
}