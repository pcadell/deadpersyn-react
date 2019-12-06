import React from 'react'
import { Header, Icon, Label, List, Grid, Segment } from 'semantic-ui-react'

import UserModal from '../UserModal'

export default class UserShow extends React.Component{
	constructor(props){
		super()
		this.state =({
			user: {
				email: '',
				password: '', // is this a bad idea? for User Update
				username: ''
				},
			userModalOpen: false // modal open/close here
			})
	}

	componentDidMount(){

	}

	userModalToggle = () => {
		this.setState({
			userModalOpen: !this.state.userModalOpen
		})
		this.props.getUser()
	}

	

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
					updateUser={this.updateUser} />
				<Grid>
					<Grid.Row columns={2}>
						<Grid.Column >
							<Header as='h2' icon>
								Account 
							</Header>
						</Grid.Column>
						<Grid.Column text-align="right">       
							<Icon name='edit' size='large' onClick={this.userModalToggle}/>	
							<Icon name='delete' size='large'/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<List divided selection> 
					<List.Item key='Show Username'>
						<Label horizontal>Username: </Label>{this.props.username}
					</List.Item>
					<List.Item key='Show Email'>
						<Label horizontal>Email: </Label>{this.props.email}
					</List.Item>
					<List.Item key='Show Password'>
						<Label horizontal>Password: <Icon name='privacy'/></Label>
					</List.Item>
				</List>
			</Segment>
			)}
}