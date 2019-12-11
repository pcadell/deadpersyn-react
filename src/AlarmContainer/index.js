import React from 'react'
import { Header, Segment, Icon } from 'semantic-ui-react'
import AlarmModal from '../AlarmModal'
import AlarmList from '../AlarmList'

export default class AlarmContainer extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			alarmModalOpen: false,
			time: new Date(Date.now()),
			content: '',
			alarms: [],
			recipientsToBe: [],
			formContacts: [],
			hasMounted: false, // maksing sure that this does not load until props has arrived
			currentAlarmID: null,
			recipientsAlarmEdit: []
		}
	}

	componentDidMount(props){
		this.getAlarms()
		this.formatContacts()
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
			this.setState({
				alarms: [...this.state.alarms, parsedResponse.data]
			})
			this.createRecipient(parsedResponse.data.id)
/*			this.getAlarms()
			this.setState({hasMounted: !this.state.hasMounted})
*/		} catch(err) {
			console.error(err)
		}
	}

	createRecipient = async (idOfCreatedAlarm) => {
		try {
			
			const createRecipient = await fetch(process.env.REACT_APP_API_URL + '/api/v1/recipients/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({alarm: idOfCreatedAlarm, recipients:this.state.recipientsToBe}),
				headers: {
					'Content-Type': 'application/json'
				}
				})
			const parsedResponse = await createRecipient.json()
			console.log(parsedResponse, '\n parsedResponses from create recipient in AlarmContainer')

		} catch(err) {
			console.error(err)
		}
	}

	updateRecipients = async (idOfEditedAlarm) => {
		try {
			
		} catch(err) {
			console.error(err)
		}
	}

	editModal = async (alarmFromModal) => {
		this.formatRecipients(alarmFromModal)	
		this.setState({
			currentAlarmID: alarmFromModal
		})

		const thisAlarm = this.state.alarms.filter(alarm => alarm.id === alarmFromModal)
				
		this.setState({
			time: thisAlarm[0].time,
			content: thisAlarm[0].content
		})
		console.log(this.state.content, 'content to feeed into edit modal ')

	}

// this alarmFromModal comes via handleChange when it senses that this.currentAlarmID is a value
	updateAlarm = async (alarmFromModal, currentAlarmID) => {
		try {
			const updateAlarm = await fetch(process.env.REACT_APP_API_URL + '/api/v1/alarms/' + currentAlarmID, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify(alarmFromModal),
			headers: {
				'Content-Type': 'application/json'
			}
		})

			const parsedResponse = await updateAlarm.json()
			console.log(parsedResponse, '\n parsedResponse from updating an alarm')


// add logic here to to change recipients if they differ, passing that alarmFromModal?
// gotta list recpients so they can fit into a dropdown and upon submit the removed ones get sent to backend
// will require refactoring python to take arrays... ugh
		} catch(err) {
			console.error(err)
		}

	}
	// updateAlarm(){} if an alarm is set to 'sent' status (toggled to inactive), python-crontab should remove the job from the cron but the alarm continues to exist so it can be reassigned to a new time? If that seems too hard, it can just get deleted.

	deleteAlarm = async (id) => {
		try {
			const deleteAlarm = await fetch(process.env.REACT_APP_API_URL + '/api/v1/alarms/' + id, {
			method: 'DELETE',
			credentials: 'include'
			})
			const parsedResponse = await deleteAlarm.json();
			console.log(parsedResponse, '\n parsedResponse from delete alarm')
			this.getAlarms()
			this.setState({hasMounted: !this.state.hasMounted})
		} catch(err) {
			console.error(err)
		}
	}

// delete recipient logic, if an alarm has contacts removed from it

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

// getting all of the users recipients (thru table of contact and alarm) that relate to the selected alarm
// this is meant to be fed into state for used by an 'edit alarm' modal
	formatRecipients = async (alarmID) => {
		try {
			const getRecipients = await fetch(process.env.REACT_APP_API_URL + '/api/v1/recipients/', {
				method: 'GET',
				credentials: 'include'
			})
			const parsedResponse = await getRecipients.json()
			if (this.state.currentAlarmID) {
				const relevantRecipients = parsedResponse.data.filter(response => response.alarm.id === alarmID)
				const formattedRecs = relevantRecipients.map(recipient => {
				return (
					{key: recipient.contact.id, value: recipient.contact.id, text: recipient.contact.nickname}
				)
			})
				this.setState({
					recipientsAlarmEdit: formattedRecs
				})
				console.log(this.state.recipientsAlarmEdit, '\n alarmID in state, recipients being formatted for loading into modal')
				// stop the modal from loading short of this being populated
				this.modalToggle()
			}
		} catch(err) {
			console.error(err)			
		}

	}

	modalToggle = () => {
		this.setState({
			alarmModalOpen: !this.state.alarmModalOpen
		})
		if (!this.state.alarmModalOpen) {
					this.setState({
					currentAlarmID: null,
					content: '',
					time: new Date(Date.now())
				})
		}
	}

	handleAlarmChange = (e) => {
		this.setState({
			content: e.target.value
		})
	}
	
	handleDateTimeChange = (time) => {
		this.setState({
				time: time
		})
	}

	handleContactChange = (e, data) => {

		this.setState({
			recipientsToBe: data.value
		})
	}
// maybe set the maxDate here, run it from componentDidMount and just tell it 364d 23h 59m 59s + Date.now()?

	handleSubmit = (e) => {
		e.preventDefault()
		if (!this.state.currentAlarmID){
				this.createAlarm({content: this.state.content, time: this.state.time})
			} else {
				this.updateAlarm({content: this.state.content, time: this.state.time}, this.state.currentAlarmID)
			}
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
						currentAlarmID={this.state.currentAlarmID}
						recipients={this.state.recipientsAlarmEdit}
						content={this.state.content}
						/>
					<AlarmList
						alarms={this.state.alarms}
						deleteAlarm={this.deleteAlarm}
						editModal={this.editModal}
						/>
				</div>
					:
					null
				}

			</Segment>
		)
	}

}