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
			this.setState({
				currentContactID: parsedResponse.data.id
			})
			console.log(this.state.currentContactID, '\n should be the id of the created contact')

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

	handleSubmit = (e) => {
		e.preventDefault()
		this.createContact()
	}

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
					handleSubmit={this.handleSubmit}
					handleChange={this.handleChange}
					modalStatus={this.state.modalStatus}
					modalToggle={this.modalToggle}
				/>
			</div>
			)
	}
}