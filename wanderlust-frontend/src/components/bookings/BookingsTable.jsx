import React, { useEffect, useState } from 'react'
import DateSlider from '../common/DateSlider'
import {
  parseISO,
  format,
  isBefore,
  isAfter,
  isEqual,
  startOfDay,
  endOfDay,
  isValid
} from 'date-fns'

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {

    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)
	

	const filterBooknigs = (startDate, endDate) => {
    	if (!startDate || !endDate) {
      	setFilteredBookings(bookingInfo)
      	return
        }

    	const start = startOfDay(startDate)
    	const end = endOfDay(endDate)

    	const filtered = bookingInfo.filter((booking) => {
      		if (!booking.checkInDate || !booking.checkOutDate) return false

      		const checkIn = typeof booking.checkInDate === 'string'
        		? parseISO(booking.checkInDate)
        		: new Date(booking.checkInDate)

      		const checkOut = typeof booking.checkOutDate === 'string'
        		? parseISO(booking.checkOutDate)
        		: new Date(booking.checkOutDate)

      		if (!isValid(checkIn) || !isValid(checkOut)) return false

      		const bookingStart = startOfDay(checkIn)
      		const bookingEnd = endOfDay(checkOut)

      		return (
        		(isBefore(bookingStart, end) || isEqual(bookingStart, end)) &&
        		(isAfter(bookingEnd, start) || isEqual(bookingEnd, start))
     	 	)
    	})

    	setFilteredBookings(filtered)
    }

  	const safeFormatDate = (dateInput, dateFormat = 'MMM do yyyy') => {
  		if (!dateInput) return '—'
  		const date = typeof dateInput === 'string' ? parseISO(dateInput) : new Date(dateInput)
  		return format(date, dateFormat)
  	}
	
	useEffect(() => {
		setFilteredBookings(bookingInfo)
	}, [bookingInfo])

  return (
    <section className="p-4">
			<DateSlider onDateChange={filterBooknigs} onFilterChange={filterBooknigs} />
			<table className="table table-bordered table-hover shadow">
				<thead className="text-center">
					<tr>
						<th>S/N</th>
						<th>Booking ID</th>
						<th>Room ID</th>
						<th>Room Type</th>
						<th>Check-In Date</th>
						<th>Check-Out Date</th>
						<th>Guest Name</th>
						<th>Guest Email</th>
						<th>Adults</th>
						<th>Children</th>
						<th>Total Guest</th>
						<th>Confirmation Code</th>
						<th colSpan={2}>Actions</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{filteredBookings.map((booking, index) => (
						<tr key={booking.id}>
							<td>{index + 1}</td>
							<td>{booking.id}</td>
							<td>{booking.room.id}</td>
							<td>{booking.room.roomType}</td>
							<td>{safeFormatDate(booking.checkInDate)}</td>
							<td>{safeFormatDate(booking.checkOutDate)}</td>
							<td>{booking.guestName}</td>
							<td>{booking.guestEmail}</td>
							<td>{booking.numOfAdults}</td>
							<td>{booking.numOfChildren}</td>
							<td>{booking.totalNumOfGuests}</td>
							<td>{booking.bookingConfirmationCode}</td>
							<td>
								<button
									className="btn btn-outline-danger btn-sm"
									onClick={() => handleBookingCancellation(booking.id)}>
									Cancel
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{filteredBookings.length === 0 && <p> No booking found for the selected dates</p>}
		</section>
    )
}

export default BookingsTable