import React from 'react'
import { Header, Segment, Icon } from 'semantic-ui-react'

export default class AlarmContainer extends React.Component {
	constructor(){
		super()

		this.state = {
			alarmModalOpen: false,
			alarm: {
				time: null,
				content: '',
			},
			alarmId: null,
			alarms: []
		}
	}

	componentDidMount(){
		// write a 'get alarms' listing logic to populate this side with existing alarms for this user
		this.getAlarms()
	}

	getAlarms = async () => {
		try {
			const alarms = await fetch(process.env.REACT_APP_API_URL + '/api/v1/alarms/', {
				method: 'GET',
				credentials: 'include'
			});
			const parsedAlarms = await alarms.json();
			this.setState({
				alarms: parsedAlarms.data
			})
			console.log(this.state.alarms, '\n here are the alarms in state at AlarmContainer')
		} catch(err) {
			console.error(err)
		}
	}

	createAlarm = async (e, alarmFromModal) => {
		e.preventDefault();
		try {
			const createdAlarmResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/alarms/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(alarmFromModal),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await createdAlarmResponse.json();
			console.log(parsedResponse, 'This is the response to createAlarm in AlarmContainer');
			this.setState({
				alarms: [...this.state.alarms, parsedResponse.data]
			})
		} catch(err) {
			console.error(err)
		}
	}

	// updateAlarm(){} if an alarm is set to 'sent' status (toggled to inactive), python-crontab should remove the job from the cron but the alarm continues to exist so it can be reassigned to a new time? If that seems too hard, it can just get deleted.

	// deleteAlarm(){} removes alarm info and recipient connection. 

	userModalToggle = () => {
		this.setState({
			alarmModalOpen: !this.state.alarmModalOpen
		})
	}

	handleUserChange = (e) => {
		this.setState({
			user:{
				...this.state.alarm,
				[e.target.name]: e.target.value
			}		
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.updateUser()
	}
	render(){
		return(
			<Segment basic>
				<Icon name='hourglass start' size='huge' onClick={this.userModalToggle}/><br/>
				Add Alarm button with dimmer logic
				Modal logic lives here
				List of alarms cascades below
			</Segment>
		)
	}

}