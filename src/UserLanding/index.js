import React from 'react'
import { Grid, Button, Header, Segment } from 'semantic-ui-react'
import UserContainer from '../UserContainer'
import AlarmContainer from '../AlarmContainer'
import ContactList from '../ContactList'

export default class UserLanding extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			username: '',
			userId: '',
			email: '',
			contacts: [],
			hasMounted: false,
			mail_server: '',
			mail_port: '',
			mail_use_tls: true,
			mail_use_ssl: false,
			mail_username: '',
			mail_password: ''
		}
	}

	componentDidMount(){
		this.getUser()
		this.getContacts()
	}

	getUser = async() => {
		try {
			const userGot = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/' + this.props.userId,
				{
					method: 'GET', credentials: 'include'
				});
			const parsedUser = await userGot.json();
			this.setState({
				username: parsedUser.data.username,
				email: parsedUser.data.email,
				userId: parsedUser.data.id,
				mail_server: parsedUser.data.mail_server,
				mail_port: parsedUser.data.mail_port,
				mail_use_tls: parsedUser.data.mail_use_tls,
				mail_use_ssl: parsedUser.data.mail_use_ssl,
				mail_username: parsedUser.data.mail_username

			})
		} catch(err) {
			console.error(err)
		}
	}

	// deleteAccount coming soon, linked to 'x' icon in UserContainer

	getContacts = async () => {
		try {
			const contacts = await fetch(process.env.REACT_APP_API_URL + '/api/v1/contacts/', {
				method: 'GET',
				credentials: 'include'
			})
			const parsedContacts = await contacts.json()
			this.setState({
				contacts: parsedContacts.data
			})
			this.setState({hasMounted: !this.state.hasMounted})
		} catch(err) {
			console.error(err)
		}
	}

	toggleMounted = () => {
		this.setState({hasMounted: !this.state.hasMounted})
	}

	render(props){
		return(
			<Segment>
				<Grid stackable centered columns={1} >
					<Grid.Row
						stackable="true"
						textAlign='center'
						verticalAlign='top'
					>
					<Header as='h1'>{ this.state.username }</Header>
					
					</Grid.Row>
					<Grid.Row
						stackable="true"
					>
						<Button onClick={()=>this.props.logOut()}>Log Out</Button>
					</Grid.Row>
				</Grid>
				<Grid columns={3}>
					<Grid.Column width={6} textAlign='left'>
						<UserContainer 
							username={this.state.username} 
							email={this.state.email}
							getUser={this.getUser} 
							userId={this.state.userId}
							mail_username={this.state.mail_username}
							mail_server={this.state.mail_server}
							mail_port={this.state.mail_port}
							mail_use_tls={this.state.mail_use_tls}
							mail_use_ssl={this.state.mail_use_ssl}
							/>
						{
							this.state.hasMounted
							?
							<ContactList 
							contacts={this.state.contacts}
							getContacts={this.getContacts}
							userId={this.state.userId}
							toggleMounted={this.toggleMounted}
							/>
							:
							null
						}

					</Grid.Column>
					<Grid.Column width={3}>

					</Grid.Column>
					<Grid.Column width={6} color='orange'>
					{
						this.state.hasMounted
						?
						<AlarmContainer contacts={this.state.contacts} />
						:
						null
					}
					</Grid.Column>
				</Grid>
			</Segment>
		)
	}
}