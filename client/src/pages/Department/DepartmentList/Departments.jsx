import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDepartments, getDepartmentsOnSearch } from './Functions.jsx'
import { Wrapper, Grid, Card, CardImage, CardHover, CardText, TopMenu, Searchbar } from './Style.jsx'

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
          departments.map((department) => {
            return (
              <Link to={{
                pathname: `/department/${department._id}`,
                department: department
              }}
                key={department._id}
              >
                <Card key={department._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <CardImage>
                    <img src={department.picture} alt={department.code} />
                  </CardImage>
                  <CardHover className="body">
                    <h2>{department.code}</h2>
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
              </Link>
            )
          })
        }
      </Grid>
    </Wrapper>
  )
}

export default Departments 