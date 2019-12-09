import React from 'react'
import DateTimeComponent from '../DateTimeComponent'

export default class TestComponent extends React.Component{
	constructor(){
		super()

		this.state = ({
			date: new Date(),
			hasMounted: false
		})
	}

	componentDidMount(){

	}

	handleDateTimeChange = (date) => {
		this.setState({
			date: date
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		console.log(e.target.value, '\n this is the event value from the DateTimeComponent via TestComponent')
		this.modalToggle()

	}

	render(){
		return(
			<DateTimeComponent 					
				date={this.props.date}
				handleDateTimeChange={this.props.handleDateTimeChange}/>
			)
	}

}