import { InfoOutlined } from '@material-ui/icons'
import React from 'react'
import './featured.scss'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Featured = () => {

  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const getFeatured = async () => {
      try {
        const res = await axios.get("/societies/random", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setFeatured(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getFeatured();
  }, []);

  console.log(featured)
  return (
    <div className='featured'>
      <img width="100%" src={featured.background} alt={featured.name} />
      <div className="info">
        <h1>{featured.name}</h1>
        <span className="desc">
          {featured.description}
        </span>
        <div className="buttons">
          <Link to={
            {
              pathname: `/society/${featured._id}`,
              society: featured

            }
          }>
            <button className="more">
              <InfoOutlined />
              <span>More Info</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Featured