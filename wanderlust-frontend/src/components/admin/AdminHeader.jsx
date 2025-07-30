import React from 'react'

const AdminHeader = ({title}) => {
    
  return (
    <header className="header-admin">
 			<div className="overlay-content"></div>
 			<div className="container">
 				<h1 className="header-title">{title}</h1>
 			</div>
 	</header>
  )
}

export default AdminHeader


