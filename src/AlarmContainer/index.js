import React from 'react'
import { Header, Segment, Icon } from 'semantic-ui-react'
import AlarmModal from '../AlarmModal'
import AlarmList from '../AlarmList'

export default class AlarmContainer extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			alarmModalOpen: false,
			time: new Date(),
			content: '',
			alarmId: null,
			alarms: [],
			recipientsToBe: [],
			formContacts: [],
			hasMounted: false
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
			this.setState({hasMounted: !this.state.hasMounted})
		} catch(err) {
			console.error(err)
		}
	}

	createAlarm = async (alarmFromModal) => {
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
		this.setState({
			content: e.target.value
		})
	}
// setting content into state at change can likely be levelled down to share logic with the 
// function for datetime, but for now this is easier
	
	handleDateTimeChange = (time) => {
		this.setState({
				time: time
		})
	}

	handleContactChange = (e, data) => {
		this.setState({
			recipientsToBe: [
				data.value
			]
		})
	}
// maybe set the maxDate here, run it from componentDidMount and just tell it 364d 23h 59m 59s + Date.now()?

	handleSubmit = (e) => {
		e.preventDefault()
//		const pyHappyDateTime = this.state.time.toISOString()
		this.createAlarm({content: this.state.content, time: this.state.time})
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
				{
					this.state.hasMounted
					?
				<div>
					<AlarmModal 
						modalStatus={this.state.alarmModalOpen}
						modalToggle={this.modalToggle} 
						handleAlarmChange={this.handleAlarmChange}
						handleSubmit={this.handleSubmit}
						handleContactChange={this.handleContactChange}
						contacts={this.state.formContacts}
						time={this.state.time}
						handleDateTimeChange={this.handleDateTimeChange}
						/>
					<AlarmList
						alarms={this.state.alarms} 
						/>
				</div>
					:
					null
				}

			</Segment>
		)
	}

}