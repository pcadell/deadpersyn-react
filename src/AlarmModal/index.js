import React from 'react'
import { Segment, Modal, Header, Label, Form, Button, Dropdown } from 'semantic-ui-react'

export default function AlarmModal(props){
// Form must take in a message (content), a time (via the react picker)
// figuring out logic of passing selected contacts to form recpipient relationships onSubmit
// then we'll work out the logic for the datetimepicker before plugging it into the backend
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