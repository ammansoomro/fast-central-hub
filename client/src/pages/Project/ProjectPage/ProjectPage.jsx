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
    }, [])

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
                    {project.type === "Research" ? (
                        <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2F3357684.jpg?alt=media&token=a9cf75f1-2103-4aa9-a7a0-c9376cad08b2" alt={project.code} />
                    ) : (
                        <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2F3408105.jpg?alt=media&token=38c14d17-d551-447c-9cb8-295977a2a4a4" alt={project.code} />
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
                                        <p>{projectAbstract.substring(0, 1850)}</p>
                                }
                            </div>
                        </div>
                    </div>
                </Container>
                <Card>
                    <CardImage>
                        {project.type === "Research" ? (
                            <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FScreenshot%202023-02-24%20at%204.29.32%20AM.png?alt=media&token=a47fea83-19b3-4195-99b4-e81c3396f37c" alt={project.code} />
                        ) : (
                            <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Project%2FScreenshot%202023-02-24%20at%204.31.28%20AM.png?alt=media&token=b26f6a78-8184-4913-8bb7-78c1b8717cd6" alt={project.code} />
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