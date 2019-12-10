import React from 'react'
import { Modal } from 'semantic-ui-react'

export default function ContactModal (props) {
	return(
		<Modal open={props.modalStatus} onClose={props.modalToggle}>
			Contact Modal
		</Modal>
		)
}