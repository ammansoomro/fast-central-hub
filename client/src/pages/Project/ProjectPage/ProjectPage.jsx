import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Wrapper, ProjectBanner, Image, Container, Card, CardImage, ProjectDetails } from './Style';

const ProjectPage = () => {
    const { id } = useParams()
    const [project, setProject] = useState({})
    const [projectAbstract, setProjectAbstract] = useState("");
    useEffect(() => {
        const getProject = async () => {
            const projectFromServer = await fetchProject(id)
            setProject(projectFromServer)
            setProjectAbstract(projectFromServer.abstract)
        }
        getProject()
    }, [id])

    const fetchProject = async (id) => {
        const res = await axios.get(`/projects/find/${id}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        })
        return res.data
    }

    return (
        <Wrapper
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}>
            <ProjectBanner>
                <Image>
                {
                      /* if project.domain == "CS" and project.type == "Research" , else if , else if, else*/

                      project.domain === "CS" && project.type === "Research" ? (
                        <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FResearch02.png?alt=media&token=ca1f48ab-848a-4fa3-9a0e-d1454a8df42a" alt={project.code} />
                      )
                        : project.domain === "CS" && project.type === "Product" ? (
                          <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FProduct02.png?alt=media&token=16f63dc1-0ea5-4fef-bedd-876d9c5ede83" alt={project.code} />
                        )
                          : project.domain === "EE" && project.type === "Research" ? (
                            <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FScreenshot%202023-03-08%20at%2010.58.25%20AM.png?alt=media&token=d49eb5ad-9521-48b6-b304-078c32113880" alt={project.code} />
                          )
                            : project.domain === "EE" && project.type === "Product" ? (
                              <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FScreenshot%202023-03-08%20at%2010.57.23%20AM.png?alt=media&token=ce26f893-0553-4f6f-a435-a17490a91af8" alt={project.code} />
                            )
                              :
                              (
                                <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FProduct02.png?alt=media&token=16f63dc1-0ea5-4fef-bedd-876d9c5ede83" alt={project.code} />
                              )
                    }
                </Image>
                <Container>
                    <div className="title-container">
                        <div className="title-top">
                            <div className="course-title">
                                <h1>{project.name}</h1>
                            </div>
                            <div className="about">
                                <span>{project.code}</span>
                            </div>
                            <div className="projectdescription">
                                {/* IF No Project About then do this else that */}
                                {
                                    project.abstract === "" ?
                                        <p>No Description Available for this Project.</p>
                                        :
                                        <p>{projectAbstract.substring(0, 2440)}</p>
                                }
                            </div>
                        </div>
                    </div>
                </Container>
                <Card>
                    <CardImage>
                        {
                            /* if project.domain == "CS" and project.type == "Research" , else if , else if, else*/

                            project.domain === "CS" && project.type === "Research" ? (
                                <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FResearch02.png?alt=media&token=ca1f48ab-848a-4fa3-9a0e-d1454a8df42a" alt={project.code} />
                            )
                                : project.domain === "CS" && project.type === "Product" ? (
                                    <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FProduct02.png?alt=media&token=16f63dc1-0ea5-4fef-bedd-876d9c5ede83" alt={project.code} />
                                )
                                    : project.domain === "EE" && project.type === "Research" ? (
                                        <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FScreenshot%202023-03-08%20at%2010.58.25%20AM.png?alt=media&token=d49eb5ad-9521-48b6-b304-078c32113880" alt={project.code} />
                                    )
                                        : project.domain === "EE" && project.type === "Product" ? (
                                            <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FScreenshot%202023-03-08%20at%2010.57.23%20AM.png?alt=media&token=ce26f893-0553-4f6f-a435-a17490a91af8" alt={project.code} />
                                        )
                                            :
                                            (
                                                <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FProduct02.png?alt=media&token=16f63dc1-0ea5-4fef-bedd-876d9c5ede83" alt={project.code} />
                                            )
                        }
                    </CardImage>
                </Card>
            </ProjectBanner>
            <ProjectDetails>
                <h1>Project Details</h1>
                <div className="eventdetails">
                    <div className="eventname">
                        <h3>Objective</h3>
                    </div>
                    <div className="eventdescription">
                        <p>{project.objective}</p>
                    </div>
                    <div className="eventname">
                        <h3>Application</h3>
                    </div>
                    <div className="eventdescription">
                        <p>{project.application}</p>
                    </div>
                    <div className="eventname">
                        <h3>Technologies</h3>
                    </div>
                    <div className="eventdescription">
                        <p>{project.technologies}</p>
                    </div>
                    <div className="eventname">
                        <h3>Abstract</h3>
                    </div>
                    <div className="eventdescription">
                        <p>{project.abstract}</p>
                    </div>
                </div>
            </ProjectDetails>
        </Wrapper>
    );
}

export default ProjectPage