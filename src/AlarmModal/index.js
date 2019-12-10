import React from 'react'
import { Modal, Header, Label, Form, Button, Dropdown } from 'semantic-ui-react'
import DateTimeComponent from '../DateTimeComponent'



export default function AlarmModal(props){
	return (
		<Modal open={props.modalStatus} onClose={props.modalToggle}>
			<Header>New Alarm</Header>
			<Modal.Content>
				<Form onSubmit={props.handleSubmit}>
				<Form.Input
					label='Message:'
					type='text'
					name='content'
					onChange={props.handleAlarmChange}
					/>
				<br/>
				<DateTimeComponent 
					time={props.time}
					handleDateTimeChange={props.handleDateTimeChange}
				/>
				<br/>
				<br/>
				<Dropdown
					fluid
					multiple
					selection
					error
					placeholder='contacts'
					label='Contacts:'
					options={props.contacts}
					onChange={props.handleContactChange}
					/>
			    <Modal.Actions>
					<Button color='red' type="submit"> Create Alarm </Button>
					<Button color='yellow' onClick={props.modalToggle}>Close Modal</Button>
				</Modal.Actions>
				</Form>

			</Modal.Content>
		</Modal>
		)
}