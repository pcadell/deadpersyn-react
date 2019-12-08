import React from 'react'
import { Grid, Button, Header, Segment } from 'semantic-ui-react'
import UserContainer from '../UserContainer'
import AlarmContainer from '../AlarmContainer'

// row at top with username
// next row with the logout button under
// row with two columns with a nice margin in the middle
// column 1: user-info with contacts below
// column 2: add alarm component with alarm list under


export default class UserLanding extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			username: '',
			userId: '',
			email: '',
			contacts: [],
			hasMounted: false
		}

	}

	componentDidMount(){
		this.getUser()
		this.getContacts()
		/*this.setState({
				username: this.props.username, // at least this to populate the username field above logout button
				email: this.props.email,
				userId: this.props.userId
			})*/
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
				userId: parsedUser.data.id
			})
		} catch(err) {
			console.error(err)
		}
	}

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
							email={this.state.email} 
							username={this.state.username} 
							getUser={this.getUser} 
							userId={this.state.userId}
							/>
						Contacts List placeholder to get passed this.state.contacts?
					</Grid.Column>
					<Grid.Column width={3}>

					</Grid.Column>
					<Grid.Column width={6} color='orange'>
					{
						this.state.hasMounted
						?
						<AlarmContainer contacts={this.state.contacts}/>
						:
						null
					}
					</Grid.Column>
				</Grid>
			</Segment>
		)
	}
}