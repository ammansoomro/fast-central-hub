import { InfoOutlined } from '@material-ui/icons'
import React from 'react'
import './featured.scss'
const Featured = () => {
  return (
    <div className='featured'>
      <img width="100%" src="https://scontent.fkhi22-1.fna.fbcdn.net/v/t39.30808-6/312572415_463432719221492_1495176404838207740_n.png?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeH7ZxbtZUiCUF6Yw3T931lzn0KNf_3f9V-fQo1__d_1XwY7JIjexIjws8Du1KP8dxYXd8wxBtQoZlJySrmGjtUn&_nc_ohc=1TdpF-7bALkAX_zvqx8&tn=h2FvjMTIKKrwI1gw&_nc_ht=scontent.fkhi22-1.fna&oh=00_AfCY99_7ICsG7_pwYjdO_yAXO3TIKWsGaJi9-ceWqDMpDg&oe=637BC670" alt="" />
        <div className="info">
            {/* <img src="" alt="" /> */}
            <h1>PROCOM</h1>
            <span className="desc">
            Procom.net is the annual flagship event from FAST National University happening since 1998.
            <br/>
            Emerging through the horizon with a stronger beam of opportunities, unlocking luminous brilliance of individuals, PROCOM'23 is right here!
            </span>
            <div className="buttons">
                <button className="more">
                    <InfoOutlined />
                    <span>More Info</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Featured