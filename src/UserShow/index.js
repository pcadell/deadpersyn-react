import React from 'react'
import { Header, Icon, Label, List, Grid, Segment } from 'semantic-ui-react'

export default class UserShow extends React.Component{
	constructor(props){
		super()
	}

	componentDidMount(){
		this.userInfo()
	}
	// get the user data to populate 
	userInfo = async (props) => {
		console.log(this.props,'\n userInfo coming down to UserShow')
	}
	render(){
		return(
			<Segment color='grey'>
				<Grid>
					<Grid.Row columns={2}>
						<Grid.Column >
							<Header as='h2' icon>
								Account 
							</Header>
						</Grid.Column>
						<Grid.Column text-align="right">       
							<Icon name='edit' size='large'/>	<Icon name='delete' size='large'/>
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