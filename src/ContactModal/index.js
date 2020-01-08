import React from 'react'
import { Modal, Header, Form, Button } from 'semantic-ui-react'

export default function ContactModal (props) {
	return(
		<Modal open={props.modalStatus} onClose={props.modalToggle}>
			{
				props.currentContactID === null
				?
				<Header>New Contact</Header>
				:
				<Header>Update Contact</Header>
			}
			<Modal.Content>
				<Form onSubmit={props.handleSubmit}>
				<Form.Input
					label='Nickname:'
					type='text'
					name='nickname'
					onChange={props.handleChange}
					/>
				<Form.Input
					label='Email:'
					type='email'
					name='email'
					onChange={props.handleChange}
					/>

				<br/>
				<Modal.Actions>
					{
						props.currentContactID === null
					?
						<Button color='red' type="submit"> Create Contact </Button>
					:
						<Button color='red' type="submit"> Update Contact </Button>
					}
					<Button color='yellow' onClick={props.modalToggle}>Close Modal</Button>
				</Modal.Actions>
				</Form>

			</Modal.Content>
		</Modal>
		)
}