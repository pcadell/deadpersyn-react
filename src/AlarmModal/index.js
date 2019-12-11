import React from 'react'
import { Modal, Header, Label, Form, Button, Dropdown } from 'semantic-ui-react'
import DateTimeComponent from '../DateTimeComponent'

export default function AlarmModal(props){
	// maybe change the logic to see if the contacts chosen by Edit match current recipients.
		// if recipient chosen by Edit shows up in recipient table, leave it be
		// if recipient doesn't exist in recipient table, send it to createRecipient
		// if a recipient shows up in that table related to this alarm and not in this recipient list, delete record
		// if time changes, update the crontab


	// logic to present in contacts list only those that don't show up in recipients list
	/*const newContacts = props.contacts.slice()
	const correctedContacts = (props) => {
		// if this is going to be an edit modal
		if (props.recipients) {
			console.log(props, 'props coming into AlarmModal to clean up the available contacts in edit iteration')
			// iterate through the recipients list
			for (let i = 0; i < props.recipients.length; i++){
				// that indexOf is only resulting in -1 so I'm doing it wrong :/
				const removeThis = newContacts.indexOf(props.recipients[i].value)
				console.log(removeThis, '\n should be a matching value between newContacts and recipients list?')
				console.log(props.recipients[i].value, '\n recipient[i].value incepted into the middle of the for loop in correctedContacts')
				if (removeThis !== -1) {
					newContacts.splice(removeThis, 1)
				}
			}
		}
	}
	console.log(newContacts.indexOf(1), '\n consoling the return of newContacts.indexOf(1), which should be 0?')
	correctedContacts(props)
	console.log(newContacts, 'attempt to clean up the array of objects to not reflect recipients')*/
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
					{
						props.currentAlarmID
						?
				<Dropdown
					fluid
					multiple
					selection
					required
					placeholder='assigned recipients'
					label='Keep Recipients:'
					options={props.recipients}
					onChange={props.handleEditContactChange}
					/>						
						:
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
					}
			    <Modal.Actions>
					<Button color='red' type="submit"> Create Alarm </Button>
					<Button color='yellow' onClick={props.modalToggle}>Close Modal</Button>
				</Modal.Actions>
				</Form>

			</Modal.Content>
		</Modal>
		)
}