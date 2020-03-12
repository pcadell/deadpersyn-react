import React from 'react'
import { Header, Icon, Label, List, Grid, Segment } from 'semantic-ui-react'

import UserModal from '../UserModal'
import EmailSetup from '../EmailSetup'


export default class UserContainer extends React.Component{
	constructor(props){
		super()
		this.state =({
			user: {
				email: '',
				password: '', 
				username: ''
				},
			email: {
				mail_server: '',
				mail_port: '',
				mail_use_tls: true,
				mail_use_ssl: false,
				mail_username: ''
				},
			userModalOpen: false, // modal open/close here
			emailModalOpen: false
			})
	}

	componentDidMount(props){
		this.setState({
			email: this.props.email,
			username: this.props.username,
			mail_server: this.props.mail_server,
			mail_port: this.props.mail_port,
			mail_use_tls: this.mail_use_tls,
			mail_use_ssl: this.mail_use_ssl,
			mail_username: this.mail_username,
		})

	}

	userModalToggle = () => {
		this.setState({
			userModalOpen: !this.state.userModalOpen
		})
		this.props.getUser()
	}

	emailModalToggle = () => {
		this.setState({
			emailModalOpen: !this.state.emailModalOpen
		})
	}

/*	deleteUser = () => {
		this should be triggered from within a popup, so that the user has to be serious about deleting user.
		this should also delete all of the users alarms and related contacts, maybe works with cascading from on-delete status in the models for foreignkeys? Fingers crossed
	}*/	

	updateUser = async (e) => {
		e.preventDefault()
		try {
			const url = process.env.REACT_APP_API_URL + '/api/v1/users/' + this.props.userId
			const updateResponse = await fetch(url, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.user),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const updateResponseParsed = await updateResponse.json()
			console.log(updateResponseParsed,'\n updatedResponseParsed in UserShow to setState with?')
			this.userModalToggle()
		} catch(err) {
			console.error(err)
		}
	}

	handleUserChange = (e) => {
		this.setState({
			user:{
				...this.state.user,
				[e.target.name]: e.target.value
			}		
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.updateUser()
	}
// pass props.modalStatus, props.userModalToggle, this.state.user, this.handleUserChange, this.updateUser to UserModal
	render(){
		return(
			<Segment color='grey'>
				<UserModal 
					modalStatus={this.state.userModalOpen} 
					modalToggle={this.userModalToggle} 
					user={this.state.user} 
					handleUserChange={this.handleUserChange} 
					updateUser={this.updateUser}
					emailModalOpen={this.state.emailModalOpen} />
				<EmailSetup
					modalStatus={this.state.emailModalOpen}
					modalToggle={this.emailModalToggle}

				/>
				<Grid>
					<Grid.Row columns={2} padded='true'>
						<Grid.Column textAlign="left">
							<Header as='h2' icon>
								DeadPersyn Account
							</Header>
						</Grid.Column>
						<Grid.Column textAlign="right">       
							<Icon name='edit' size='large' onClick={this.userModalToggle}/>	
							<Icon name='delete' size='large' />
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Grid>
					<Grid.Row columns={2} padded='true'>
						<Grid.Column textAlign="left">
							<Header as='h2' icon>
								Email Account
							</Header>
						</Grid.Column>
						<Grid.Column textAlign="right">
							<Icon name='edit' size='large' onClick={this.emailModalToggle}/>
						</Grid.Column>
							<List divided selection> 
								<List.Item key='Show Email'>
									<Label horizontal>Sending From: </Label>{this.props.mail_username}
								</List.Item>
							</List>
					</Grid.Row>
				</Grid>
			</Segment>
			)}
}