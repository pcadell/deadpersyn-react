import React from 'react'
import { Grid, Button, Header, Segment } from 'semantic-ui-react'
import UserShow from '../UserShow'

// row at top with username
// next row with the logout button under
// row with two columns with a nice margin in the middle
// column 1: user-info with contacts below
// column 2: add alarm component with alarm list under


export default class UserLanding extends React.Component {
	constructor(props){
		super()

		this.state = {
			user: {
				username: this.props.username, // at least this to populate the username field above logout button
				email: this.props.email,
				userId: this.props.userId
			}
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
					<Header as='h1'>{ this.props.username}</Header>
					</Grid.Row>
					<Grid.Row
						stackable="true"
					>
						<Button onClick={()=>this.props.logOut()}>Log Out</Button>
					</Grid.Row>
				</Grid>
				<Grid columns={3}>
					<Grid.Column width={6} textAlign='left'>
						<UserShow email={this.props.email} username={this.props.username}/>
						Contacts List placeholder
					</Grid.Column>
					<Grid.Column width={3}>

					</Grid.Column>
					<Grid.Column width={6} color='orange'>
						This is where Alarm setup followed by Set-Alarms cascades
					</Grid.Column>
				</Grid>
			</Segment>
		)
	}
}