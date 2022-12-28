import React from 'react'
import "./TeacherCard.scss"
import { Link } from 'react-router-dom'
const listitem = ({ imageUrl, name, email, department, about, courses, reviews, upvotes, downvotes,id }) => {
  return (
    <div className="Wrapper">
      <div className="Card">
        <div className="CardImage">
          <img src={imageUrl} alt="" />
        </div>
        <div className="CardHover body">
          <h1>{department}</h1>
          <Link to={{
            pathname: `/teacher/${id}`,
          }}>
            <button className="btn">View Teacher</button>
          </Link>
          <p>{email}</p>
        </div>
        <div className="CardText">
          <span className="quality"></span>
          <div className="bottom">
            <div className="moviename">
              <span>{department}</span>
              <strong>{name}</strong>
            </div>
            {/* <div className="rating">
              {upvotes}
              <img
                src="https://cdn-icons-png.flaticon.com/512/6520/6520157.png"
                alt="upvote Logo"
              />
              {downvotes}
              <img src="https://cdn-icons-png.flaticon.com/512/6520/6520152.png" alt="downvote Logo" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default listitem