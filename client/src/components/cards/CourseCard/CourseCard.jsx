import React from 'react'
import { Link } from 'react-router-dom'
import "./CourseCard.scss"
const listitem = ({ coursecode, imageUrl, name, core_elective, upvotes, downvotes,id }) => {
  return (
    <div className="Wrapper">
      <div className="Card">
        <div className="CardImagee">
          <img src={imageUrl} alt="" />
        </div>
        <div className="CardHover body">
          <h1>{coursecode}</h1>
          <Link to={{
            pathname: `/course/${id}`,
          }}>
            <button className="btn">View Course</button>
          </Link>
          <h3>{core_elective}</h3>
        </div>
        <div className="CardText">
          <span className="quality"></span>
          <div className="bottom">
            <div className="moviename">
              <span>{coursecode}</span>
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