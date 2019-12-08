import React from 'react'
import { Header, Segment, Icon } from 'semantic-ui-react'
import AlarmModal from '../AlarmModal'

export default class AlarmContainer extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			alarmModalOpen: false,
			alarm: {
				time: null,
				content: '',
			},
			alarmId: null,
			alarms: [],
			recipientsToBe: [],
			formContacts: []
		}
	}

	componentDidMount(props){
		// write a 'get alarms' listing logic to populate this side with existing alarms for this user
		this.getAlarms()
		this.formatContacts() // so's i can get the dropdown in the modal to allow picking contacts
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

	formatContacts = () => {
		const formcontacts = this.props.contacts.map(contact => {
			return (
				{key: contact.id, value: contact.id, text: contact.nickname}
				)
		})
		this.setState({
			formContacts: formcontacts
		})
	}

	modalToggle = () => {
		this.setState({
			alarmModalOpen: !this.state.alarmModalOpen
		})
	}

	handleAlarmChange = (e) => {
// can this be used to set separate states based on separate inputs? if so, handleContactChange below may not be necessary to the logic of this.

		this.setState({
			alarm:{
				[e.target.name]: e.target.value
			}		
		})
	}

	handleContactChange = (e, data) => {
		this.setState({
			recipientsToBe: [
				data.value
			]
		})

	}

	/*handleContactRemove = (e) => {
		this.setState({})
	}
*/
	handleSubmit = (e) => {
		e.preventDefault()
		console.log(e.target.value, '\n this is the event value from the AlarmModal via AlarmContainer')
		this.modalToggle()
		// this is where the logic gets run to create an alarm and affiliate it with recipients
	}

	render(){
		return(
			<Segment basic>
				<Icon 
					name='hourglass start' 
					size='huge' 
					onClick={this.modalToggle}
					/><br/>
				<AlarmModal 
					modalStatus={this.state.alarmModalOpen}
					modalToggle={this.modalToggle} 
					handleAlarmChange={this.handleAlarmChange}
					handleSubmit={this.handleSubmit}
					handleContactChange={this.handleContactChange}
					contacts={this.state.formContacts}
					/>
				Add Alarm button with dimmer logic
				Modal logic lives here
				List of alarms cascades below
			</Segment>
		)
	}

}