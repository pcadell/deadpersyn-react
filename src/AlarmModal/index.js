import React from 'react'
import { Modal, Header, Label, Form, Button, Dropdown } from 'semantic-ui-react'
import DateTimeComponent from '../DateTimeComponent'

export default function AlarmModal(props){

	const newTime = new Date(props.time)
	return (
		<Modal open={props.modalStatus} onClose={props.modalToggle}>
			{
				props.currentAlarmID
				?
				<Header>Edit Alarm</Header>
				:			
				<Header>New Alarm</Header>
			}
			<Modal.Content>
				<Form onSubmit={props.handleSubmit}>
				<Form.Input
					label='Message:'
					type='text'
					name='content'
					value={props.content}
					onChange={props.handleAlarmChange}
					/>
				<br/>
				{
					props.currentAlarmID
					?
				<DateTimeComponent 
					time={newTime}
					handleDateTimeChange={props.handleDateTimeChange}
				/>
					:
				<DateTimeComponent 
					time={props.time}
					handleDateTimeChange={props.handleDateTimeChange}
				/>

				}
				<br/>
				<br/>

				<Dropdown
					fluid
					multiple
					selection
					required
					placeholder='contacts'
					label='Contacts:'
					options={props.contacts}
					onChange={props.handleContactChange}
					/>
					<Modal.Actions>
					{
						props.currentAlarmID
						?
					<Button color='red' type="submit"> Edit Alarm </Button>
						:
					<Button color='red' type="submit"> Create Alarm </Button>

					}
					<Button color='yellow' onClick={props.modalToggle}>Close Modal</Button>
				</Modal.Actions>
				</Form>

			</Modal.Content>
		</Modal>
		)
}