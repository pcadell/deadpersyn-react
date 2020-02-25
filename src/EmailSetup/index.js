import React from 'react'
import { Modal, Header, Form, Button, Checkbox} from 'semantic-ui-react'

export default function EmailSetup(props) {
	// gotta frame the modal for email setup to take the inputs from the user,
	// doubling as an email update as user will likely have to troubleshoot maybe
	// make a note about troubleshooting their account, who to contact for deets,etc? 
	// set up a 'test email settings' option so user cannot set an alarm until
	// they've succeeded in email test?
	// setup functions for these props in UserLanding, have this modal load if email_password is default
	// env variables from login load up when wget email command happens, load along with user deets there

	return(
		<Modal open={props.modalStatus} onClose={props.modalToggle}>
						
			<Header>Email Setup</Header>
			<Modal.Content>
				<Form onSubmit={props.handleSubmit}>
				<Form.Input
					label='SMTP Mail Server:'
					type='text'
					name='mail_server'
					value={props.mail_server}
					onChange={props.handleEmailSetupChange}
					/>
				<br/>
				<Form.Input
					label='SMTP Mail Port:'
					type='text'
					name='mail_port'
					value={props.mail_port}
					onChange={props.handleEmailSetupChange}
					/>
				<br/>
				<Form.Input
					label='SMTP Mail Username:'
					type='text'
					name='mail_username'
					value={props.mail_username}
					onChange={props.handleEmailSetupChange}
					/>
				<br/>
				<Form.Input
					label='SMTP Mail Password:'
					type='password'
					name='mail_password'
					value={props.mail_password}
					onChange={props.handleEmailSetupChange}
					/>
				<br/>
				<Form.Input
					label='Uses TLS:'
					type='checkbox'
					name='mail_use_tls'
					value={props.mail_use_tls}
					onChange={props.handleEmailSetupChange}
					/>
				<br/>
				<Form.Input
					label='Uses SSL:'
					type='checkbox'
					name='mail_use_ssl'
					value={props.mail_use_ssl}
					onChange={props.handleEmailSetupChange}
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