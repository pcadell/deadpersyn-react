import React from 'react'
import { Segment, Modal, Header, Label, Form, Button } from 'semantic-ui-react'

export default function UserModal(props){
// stretch, have logic forcing re-entry of new password, checking match between
	return (
		<Modal open={props.modalStatus} onClose={props.modalToggle}>
			<Header>Edit User</Header>
			<Modal.Content>
				<Form onSubmit={props.updateUser}>
				<Form.Input
					label='Username:'
					type='text'
					name='username'
					placeholder={props.user.username}
					value={props.user.username}
					onChange={props.handleUserChange}
					/>
				<Form.Input
					label='Email:'
					type='email'
					name='email'
					placeholder={props.user.email}
					value={props.user.email}
					onChange={props.handleUserChange}
					/>
				<Form.Input
					label='Password:'
					type='password'
					name='password'
					value={props.user.password}
					onChange={props.handleUserChange}
					/>
			    <Modal.Actions>
					<Button color='red' type="submit"> Update User </Button>
					<Button color='yellow' onClick={props.modalToggle}>Close Modal</Button>
				</Modal.Actions>
				</Form>
			</Modal.Content>
		</Modal>
		)
}