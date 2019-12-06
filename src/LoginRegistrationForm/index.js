import React from 'react'
import { Form, Button, Segment, Grid, Header, Image } from 'semantic-ui-react'

export default class LoginRegistrationForm extends React.Component {
	constructor(){
		super()

		this.state ={
			username: '',
			email: '',
			password: '',
			status: 'login'
		}
	}

	loginRegister = () => {
		if (this.state.status === 'login') {
			this.props.login({
				email: this.state.email,
				password: this.state.password
			})
		} else {
			this.props.register({
				username: this.state.username,
				email: this.state.email,
				password: this.state.password
			})
		}
	}

	switchForm = () => {
		if (this.state.status === 'login') {
			this.setState({
				status: 'register'
			})
		} else {
			this.setState({
				status: 'login'
			})
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.loginRegister()
	}

	render(){
		const logo = 'hourglass.png'
		return(
			<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
			    <Grid.Column style={{ maxWidth: 600 }}>
				<Header as='h2' color='red' textAlign='center'>
				<Image src={logo} size='small'/> DEADPERSYN
				</Header>
			    <Form size='large' onSubmit={this.handleSubmit} >
			        <Segment stacked inverted>

							{
								this.state.status === 'register'
								?
								<Form.Input
								label='Username:'
								type='text'
								name='username'
								value={this.state.username}
								onChange={this.handleChange}
								/>
								:
								null
							}
							<Form.Input
							label='Email:'
							type='email'
							name='email'
							value={this.state.email}
							onChange={this.handleChange}
							/>
							<Form.Input
							label='Password:'
							type='password'
							name='password'
							value={this.state.password}
							onChange={this.handleChange}
							/>

			          <Button color='red' fluid size='large' type='submit'>
			            {
			            	this.state.status === 'login'
			            	?
			            	'Log In'
			            	:
			            	'Register'
			            }
			          </Button>
			        </Segment>
			      </Form>
			      	<Segment inverted>
							
						{
							this.state.action === 'register'
							?
							<small>Already have an account? Log in!<span onClick={this.switchForm}>here</span>!</small>
							:
							<small>Need an account? Sign up <span onClick={this.switchForm}>here</span>!</small>
						}
					</Segment>
			    </Grid.Column>
  </Grid>
		)
	}
}