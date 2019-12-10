import React from 'react'
import { Item, Icon, Header } from 'semantic-ui-react'
import ContactModal from '../ContactModal'

export default class ContactList extends React.Component{
	constructor(){
		super()

		this.state = {
			modalStatus: false,
			currentContactID: null,
			contact: {
				nickname: '',
				email: ''
			}
		}
	}

	componentDidMount(){

	}

	createContact = async () => {
		try {

			const createContactResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/contacts/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state.contact),
				headers: {
					'Content-Type': 'application/json' 
				}
			})
			const parsedResponse = await createContactResponse.json();
			console.log(parsedResponse, '\n is the created contact from the db')
			this.props.getContacts()
			this.props.toggleMounted()
/*			this.setState({
				currentContactID: parsedResponse.data.id
			})
			console.log(this.state.currentContactID, '\n should be the id of the created contact')
*/
		} catch(err) {
			console.error(err)
		}
	}

	updateContact = async () => {
		try {
			const updateContactResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/contacts/' + this.state.currentContactID, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.contact),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await updateContactResponse.json()
			console.log(parsedResponse, '\n is the updated contact from the db')
			this.props.getContacts()
			this.props.toggleMounted()
		} catch(err) {
			console.error(err)
		}
	}

	deleteContact = async (id) => {
		try {
			const contactToDelete = await fetch(process.env.REACT_APP_API_URL + '/api/v1/contacts/' + id, {
				method: 'DELETE',
				credentials: 'include'
			})
			const parsedResponse = await contactToDelete.json()
			console.log(parsedResponse)
			this.props.getContacts()
			this.props.toggleMounted()
			this.setState({currentContactID: null})
		} catch(err) {
			console.error(err)
		}
	}

	modalToggle = () => {
		this.setState({
			modalStatus: !this.state.modalStatus
		})
	}

	handleChange = (e) => {
		this.setState({
			contact: { ...this.state.contact,
				[e.target.name]: e.target.value
			}
		})
	}

	editModal = (contactID) => {

		this.setState({
			currentContactID: contactID
		})
		this.modalToggle()

	}

	handleSubmit = (e) => {
		e.preventDefault()
		if (this.state.currentContactID){
				this.updateContact()
			} else {
				this.createContact()
			}
	}

	render(props){
		const contacts = this.props.contacts.map(contact => {
			return(
				<Item key={contact.id} color='blue'>
					<Item.Header>{contact.nickname}</Item.Header>
					<Icon name='edit' color='red' onClick={()=>{this.editModal(contact.id)}} /><Icon name='delete' color='red' onClick={()=>this.deleteContact(contact.id)}/>
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
					handleSubmit={this.handleSubmit}
					handleChange={this.handleChange}
					modalStatus={this.state.modalStatus}
					modalToggle={this.modalToggle}
					currentContactID={this.state.currentContactID}
				/>
			</div>
			)
	}
}