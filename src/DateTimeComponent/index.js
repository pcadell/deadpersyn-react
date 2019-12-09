import React from 'react'
import DateTimePicker from 'react-datetime-picker';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function DateTimeComponent(props){
	return(
		<div>
			<form onSubmit={props.handleSubmit}>
				<DatePicker
					selected={props.time}
					name='time'
					showTimeSelect
					dateFormat='Pp'
					required='true'
					onChange={props.handleDateTimeChange}
					value={props.time}
				/>
			</form>
		</div>
		)
}