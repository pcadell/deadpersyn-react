import React from 'react'
import { Icon, Item } from 'semantic-ui-react'


export default function AlarmList(props){
// format alarm.time showed here into a string from 
	const alarms = props.alarms.map(alarm => {
		const timeConvertDisplay = (new Date(alarm.time)).toString()
		return(
			<Item key={alarm.id} color='blue'>
				<Item.Header>{timeConvertDisplay}  <Icon name='edit' color='red' onClick={()=>{props.editModal(alarm.id)}}/> <Icon name='delete' color='red' onClick={()=>{props.deleteAlarm(alarm.id)}}/></Item.Header>
				{
					alarm.sent
					?
				<Item.Content>Message: {alarm.content}<Icon name='hourglass zero' color='black'/></Item.Content>
					:
				<Item.Content>Message: {alarm.content}<Icon name='hourglass half' color='red'/></Item.Content>
				}
			</Item>
			)
	})

	return(
		<Item.Group divided>
			{alarms}
		</Item.Group>
		)
}