import React from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from './AdminHeader'

const Admin = () => {
  return (
    <>
    <AdminHeader title={"Welcome to Admin Panel"} />
    <section className="container mt-5">
      <div className='d-flex flex-column align-items-center gap-3'>
        <Link className='hotel-color' to={"/existing-rooms"}>Manage Rooms</Link>
		    <Link className='hotel-color' to={"/existing-bookings"}>Manage Bookings</Link>
        </div>
    </section>
    </>
  )
}

export default Admin