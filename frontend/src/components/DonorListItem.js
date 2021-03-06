import React from 'react'

export default ({ donor }) => {
  return (
    <div className="row trow">
      <div className="col-xs-2 td">{donor.bloodgroup}</div>
      <div className="col-xs-2 td">{donor.user.username}</div>
      <div className="col-xs-2 td">{donor.name}</div>
      <div className="col-xs-2 td">{donor.age}</div>
      <div className="col-xs-2 td">{donor.city}</div>
      <div className="col-xs-2 td"><a className="register-button" href={`tel:${donor.user.username}`}>Call</a></div>
    </div>
  )
}