import React from 'react'
import { Link } from 'react-router-dom'
import "./SocietyCard.scss"
const listitem = ({ societycode, imageUrl, name,id }) => {
  return (
    <div className="Wrapper">
      <div className="Card">
        <div className="CardImagee">
          <img src={imageUrl} alt="" />
        </div>
        <div className="CardHover body">
          <h1>{societycode}</h1>
          <Link to={{
            pathname: `/society/${id}`,
          }}>
            <button className="btn">View Society</button>
          </Link>
          <h3> </h3>
        </div>
        <div className="CardText">
          <span className="quality"></span>
          <div className="bottom">
            <div className="moviename">
              <span>{societycode}</span>
              <strong>{name}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default listitem