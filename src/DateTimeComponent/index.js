import React from 'react'
import DatePicker from "react-datepicker";
//import Date

import "react-datepicker/dist/react-datepicker.css";
// 			    maxDate={addDays(new Date(), 365)}
export default function DateTimeComponent(props){
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