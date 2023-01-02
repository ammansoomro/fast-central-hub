import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {getDepartments,getDepartmentsOnSearch} from './Functions'
import { Wrapper, Grid, Card, CardImage, CardHover, CardText, TopMenu, Searchbar } from './Style'
const Departments = () => {
  const [departments, setDepartments] = useState([])
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    const pullData = async () => {
      const res = await getDepartments();
      setDepartments(res);
    }
    pullData()
  }, [])

  useEffect(() => {
    const pullData = async () => {
        if (search === "") {
          const res = await getDepartments();
          setDepartments(res);
          return;
        }
        const res = await getDepartmentsOnSearch(search)
        setDepartments(res);
    };
    pullData();
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
      >
        {
          departments.map((department) => {
            return (
              <Card key={department._id}>
                <CardImage>
                  <img src={department.picture} alt={department.code} />
                </CardImage>
                <CardHover className="body">
                  <h2>{department.code}</h2>
                  {/* Link to department/:departmentId and also pass the current department object, and department id*/}
                  <Link to={{
                    pathname: `/department/${department._id}`,
                    department: department
                  }}>
                    <button className="btn">View Department</button>
                  </Link>
                  <h4> </h4>
                </CardHover>
                <CardText>
                  <span className="quality"></span>
                  <div className="bottom">
                    <div className="departmentname">
                      {/* <span>{department.code}</span> */}
                      <strong>{department.name}</strong>
                    </div>
                  </div>
                </CardText>
              </Card>
            );
          })
        }
      </Grid>
    </Wrapper>
  )
}

export default Departments 