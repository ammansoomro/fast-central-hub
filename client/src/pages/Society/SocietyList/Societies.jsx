import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Wrapper, Grid, Card, CardImage, CardHover, CardText, TopMenu, Searchbar } from './Style'
import { useEffect, useState } from 'react'

const Societies = () => {

  const [societies, setSocieties] = useState([])
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    const getSocieties = async () => {
      try {
        const res = await axios.get('/societies')
        setSocieties(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getSocieties()
  }, [])

  useEffect(() => {
    const getSocieties = async () => {
      try {
        if (search === "") {
          const res = await axios.get("/societies", {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
          });
          // Sort Data and Store in Courses
          setSocieties(res.data);
          return;
        }
        const res = await axios.get(`/societies/search/${search}`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });
        // Sort Data and Store in Courses
        setSocieties(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSocieties();
  }, [search]);


  return (
    <Wrapper>
      <TopMenu>
        {/*  */}
        {/* <SearchBar /> */}
        <Searchbar>
          <input class="search__input" value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Quick Search" />
        </Searchbar>
      </TopMenu>
      <Grid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}>
        {
          societies.map((society) => {
            return (
              <Link to={{
                pathname: `/society/${society._id}`,
                society: society
              }}>
                <Card key={society._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CardImage>
                    <img src={society.picture} alt={society.code} />
                  </CardImage>
                  <CardHover className="body">
                    <h2>{society.code}</h2>
                    {/* Link to society/:societyId and also pass the current society object, and society id*/}

                    <button className="btn">View Society</button>

                    <h4> </h4>
                  </CardHover>
                  <CardText>
                    <span className="quality"></span>
                    <div className="bottom">
                      <div className="societyname">
                        {/* <span>{society.code}</span> */}
                        <strong>{society.name}</strong>
                      </div>
                    </div>
                  </CardText>
                </Card>
              </Link>
            );
          })
        }
      </Grid>
    </Wrapper>
  )
}




export default Societies 