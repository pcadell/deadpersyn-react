import React from 'react'
import DatePicker from "react-datepicker";
//import Date

import "react-datepicker/dist/react-datepicker.css";

export default function DateTimeComponent(props){
// 			    maxDate={addDays(new Date(), 365)}
	console.log(typeof props.time)
	return(
		<div>
			<DatePicker
				selected={props.time}
				name='time'
				showTimeSelect
				dateFormat='Pp'
				required
				onChange={props.handleDateTimeChange}
				value={props.time}
			/>
		</div>
		)
}