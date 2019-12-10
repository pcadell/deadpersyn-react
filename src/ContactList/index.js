import React from 'react'
import { Item, Icon, Header } from 'semantic-ui-react'
import ContactModal from '../ContactModal'

export default class ContactList extends React.Component{
	constructor(){
		super()

		this.state = {
			modalStatus: false,
			currentContactID: null
		}
	}

	componentDidMount(){

	}

	createContact = async (e, formData) => {
		e.preventDefault()
		try {
			console.log(formData)
/*			const createContactResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/contacts/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(formData.),
				headers: {
					'Content-Type': 'application/json' 
				}
			})
			const parsedResponse = await createContactResponse.json();
			console.log(parsedResponse, '\n is the created contact from the db')
			this.props.getContacts()
			this.setState({
				currentContactID: null
			})
*/
		} catch(err) {
			console.error(err)
		}
	}

	modalToggle = () => {
		this.setState({
			modalStatus: !this.state.modalStatus
		})
	}
// onChange and onSubmit for contacts
// include a ternary based on this.state.currentContactID to tell whether modal will be edit or create modal 

	render(props){
		const contacts = this.props.contacts.map(contact => {
			return(
				<Item key={contact.id} color='blue'>
					<Item.Header>{contact.nickname}</Item.Header>
					<Icon name='edit' color='red' onClick={this.modalToggle} /><Icon name='delete' color='red'/>
					<br/>
					<Item.Content>Email: {contact.email}</Item.Content>
				</Item>
				)
		})

		return(
			<div>
				<Header as='h1'>Contacts  <Icon name='add' onClick={this.modalToggle}/></Header>
				<Item.Group divided>
					{contacts}
				</Item.Group>
				<ContactModal 
					modalStatus={this.state.modalStatus}
					modalToggle={this.modalToggle}
				/>
			</div>
			)
	}
}