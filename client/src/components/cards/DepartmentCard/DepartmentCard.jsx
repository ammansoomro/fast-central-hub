import React from 'react'
import { Link } from 'react-router-dom'
import "./DepartmentCard.scss"
const listitem = ({ name, code, picture,id }) => {
  return (
    <div className="Wrapper">
      <div className="Card">
        <div className="CardImagee">
          <img src={picture} alt="" />
        </div>
        <div className="CardHover body">
          <h1>{code}</h1>
          <Link to={{
            pathname: `/department/${id}`,
          }}>
            <button className="btn">View Course</button>
          </Link>
          <h3>{name}</h3>
        </div>
        <div className="CardText">
          <span className="quality"></span>
          <div className="bottom">
            <div className="moviename">
              <span>{code}</span>
              <strong>{name}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default listitem