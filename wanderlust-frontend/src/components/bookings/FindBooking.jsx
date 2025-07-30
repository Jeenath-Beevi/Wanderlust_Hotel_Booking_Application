import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'
import { Card } from 'react-bootstrap'
import { parseISO, format } from 'date-fns'

const FindBooking = () => {

    const [confirmationCode, setConfirmationCode] = useState("")
	const [error, setError] = useState(null)
	const [successMessage, setSuccessMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [bookingInfo, setBookingInfo] = useState({
		id: "",
		bookingConfirmationCode: "",
		room: { id: "", roomType: "" },
		roomNumber: "",
		checkInDate: "",
		checkOutDate: "",
		guestName: "",
		guestEmail: "",
		numOfAdults: "",
		numOfChildren: "",
		totalNumOfGuests: ""
	})

	const emptyBookingInfo = {
		id: "",
		bookingConfirmationCode: "",
		room: { id: "", roomType: "" },
		roomNumber: "",
		checkInDate: "",
		checkOutDate: "",
		guestName: "",
		guestEmail: "",
		numOfAdults: "",
		numOfChildren: "",
		totalNumOfGuests: ""
	}
	const [isDeleted, setIsDeleted] = useState(false)

	const handleInputChange = (event) => {
		setConfirmationCode(event.target.value)
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		setIsLoading(true)

		try {
			const data = await getBookingByConfirmationCode(confirmationCode)
			setBookingInfo(data)
			setError(null)
		} catch (error) {
			setBookingInfo(emptyBookingInfo)
			if (error.response && error.response.status === 404) {
				setError(error.response.data.message)
			} else {
				setError(error.message)
			}
		}

		setTimeout(() => setIsLoading(false), 2000)
	}

	const safeFormatDate = (dateInput, dateFormat = 'MMM do yyyy') => {
  		if (!dateInput) return '—' 
  		const date = typeof dateInput === 'string' ? parseISO(dateInput) : new Date(dateInput)
  		return format(date, dateFormat)
	}

	const handleBookingCancellation = async (bookingId) => {
		try {
			await cancelBooking(bookingInfo.id)
			setIsDeleted(true)
			setSuccessMessage("Booking has been cancelled successfully!")
			setBookingInfo(emptyBookingInfo)
			setConfirmationCode("")
			setError(null)
		} catch (error) {
			setError(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setIsDeleted(false)
		}, 2000)
	}

  return (
    <>
			<div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
				<h2 className="hotel-color text-center mb-4">Find My Booking</h2>
				<form onSubmit={handleFormSubmit} className="col-md-6">
					<div className="input-group mb-3">
						<input
							required
							className="form-control"
							type="text"
							id="confirmationCode"
							name="confirmationCode"
							value={confirmationCode}
							onChange={handleInputChange}
							placeholder="Enter the booking confirmation code"
						/>

						<button type="submit" className="btn btn-hotel input-group-text">
							Find Booking
						</button>
					</div>
				</form>

				{isLoading ? (
					<div>Finding your booking...</div>
				) : error ? (
					<div className="text-danger">Error: {error}</div>
				) : bookingInfo.bookingConfirmationCode ? ( 
				<Card style={{ maxWidth: '600px' }}>
					<Card.Body className="d-flex flex-wrap align-items-center">
					<div className="flex-grow-1 me-3">
						<Card.Title className='hotel-color mb-3'>Booking Information</Card.Title>
						<p className="text-success">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
						<p>Room Number: {bookingInfo.room.id}</p>
						<p>Room Type: {bookingInfo.room.roomType}</p>
						<p>
							Check-in Date:{" "}
							{safeFormatDate(bookingInfo.checkInDate)}
						</p>
						<p>
							Check-out Date:{" "}
							{safeFormatDate(bookingInfo.checkOutDate)}
						</p>
						<p>Full Name: {bookingInfo.guestName}</p>
						<p>Email Address: {bookingInfo.guestEmail}</p>
						<p>Adults: {bookingInfo.numOfAdults}</p>
						<p>Children: {bookingInfo.numOfChildren}</p>
						<p>Total Guest: {bookingInfo.totalNumOfGuests}</p>

						{!isDeleted && (
							<button
								onClick={() => handleBookingCancellation(bookingInfo.id)}
								className="btn btn-danger">
								Cancel Booking
							</button>
						)}
					</div> 
					</Card.Body>
				</Card>
				) : null }

				{isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
			</div>
		</>
  )
}

export default FindBooking