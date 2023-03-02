import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProjects, getProjectsOnSearch } from './Functions.jsx'
import { Wrapper, Grid, Card, CardImage, CardHover, CardText, TopMenu, Searchbar } from './Style.jsx'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [search, setSearch] = useState("");

  useEffect(() => {
    const pullData = async () => {
      const res = await getProjects();
      setProjects(res);
    }
    pullData()
  }, [])

  useEffect(() => {
    const pullData = async () => {
      if (search === "") {
        const res = await getProjects();
        setProjects(res);
        return;
      }
      const res = await getProjectsOnSearch(search)
      setProjects(res);
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
          projects.map((project) => {
            return (
              <Link to={{
                pathname: `/project/${project._id}`,
                project: project
              }}
                key={project._id}
              >
                <Card key={project._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <CardImage>
                    {/* If project.type is "Research" then this image else */}
                    
                    {
                      project.type === "Research" ? (
                        <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FResearch02.png?alt=media&token=ca1f48ab-848a-4fa3-9a0e-d1454a8df42a" alt={project.code} />
                      ) : (
                        <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FProduct02.png?alt=media&token=16f63dc1-0ea5-4fef-bedd-876d9c5ede83" alt={project.code} />
                      )
                    }


                  </CardImage>
                  <CardHover className="body">
                    <h2>{project.type}</h2>
                    <Link to={{
                      pathname: `/project/${project._id}`,
                      project: project
                    }}>
                      <button className="btn">View Project</button>
                    </Link>
                    <h4>{project.supervisor}</h4>
                  </CardHover>
                  <CardText>
                    <span className="quality"></span>
                    <div className="bottom">
                      <div className="projectname">
                        {/* <span>{project.code}</span> */}
                        <strong>{project.name}</strong>
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

export default Projects 