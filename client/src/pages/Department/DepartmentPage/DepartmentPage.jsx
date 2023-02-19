import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { Wrapper, DepartmentBanner, Image, Container, Card, CardImage, DepartmentDetails, TabHeading, Grid, TeacherCard, TeacherCardImage, TabButton} from './Style'
import { getDepartment,getDepartmentTeachers} from './Functions'
const DepartmentPage = () => {
    const params = useParams();
    const [department, setDepartment] = useState({});
    const [departmentAbout, setDepartmentAbout] = useState("");
    const [departmentTeachers, setDepartmentTeachers] = useState([
        {
            name: "Loading...",
            email: "Loading...",
            picture: "Loading...",
            department: "Loading...",
            about: "Loading...",
            _id: "Loading...",
        }
    ]);
    const [tab, setTab] = useState(2);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const pullData = async () => {
            const data = await getDepartment(params.id);
            setDepartment(data);
            setDepartmentAbout(data.about);
        };
        pullData();
    }, [params.id]);

    useEffect(() => {
        const pullData = async () => {
            const data = await getDepartmentTeachers(department.code);
            setDepartmentTeachers(data);
        };
        pullData();
    }, [department.code]);


    return (
        <Wrapper
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}>
            <DepartmentBanner>
                <Image>
                    {/* If department.department is AI then this image else that image */}
                    {
                        <img src={department.backgroundpicture} alt="Please Wait, Fetching Data..." />
                    }
                </Image>
                <Container>
                    <div className="title-container">
                        <div className="title-top">
                            <div className="course-title">
                                <h1>{department.name}</h1>
                            </div>
                            <div className="about">
                                <span>{department.code}</span>
                            </div>
                            <div className="departmentdescription">
                                {/* IF No Department About then do this else that */}
                                {
                                    department.about === "" ?
                                        <p>No Description Available for this Department.</p>
                                        :
                                        <p>{departmentAbout.substring(0, 2500)}</p>
                                }
                            </div>
                        </div>
                    </div>
                </Container>
                <Card>
                    <CardImage>
                        <img src={department.picture} alt="Please Wait, Fetching Data..." />
                    </CardImage>
                </Card>
            </DepartmentBanner>
            <DepartmentDetails>
                {/* 2 Button to change Tab from 1 to 2 and 2 to 1 */}
                <div className="tabButton">
                    <TabButton onClick={() => setTab(2)}>
                        Department Teachers
                    </TabButton>
                    <TabButton onClick={() => setTab(1)}>
                        Tentative Study Plan
                    </TabButton>
                </div>

                {/* Tab 1 */}
                {tab === 1 ? (
                    <TabHeading>
                        <strong>Study Plan</strong>
                    </TabHeading>
                ) : (
                    <Grid>
                        {
                            departmentTeachers.length === 0 ?
                                <div className="noTeachers">
                                    <h1>No Teachers Available for this Department.</h1>
                                </div>
                                :
                                <div className="teachers">
                                    {
                                        departmentTeachers.map((teacher) => {
                                            return (
                                                <Link to={`/teacher/${teacher._id}`} key={teacher.code}>
                                                    <TeacherCard >
                                                        <TeacherCardImage className="teacherImage">
                                                            <img src={teacher.picture} alt="Teacher" />
                                                        </TeacherCardImage>
                                                        <div className="teacherName">
                                                            <p>{teacher.name}</p>
                                                        </div>
                                                    </TeacherCard>
                                                </Link>
                                            )
                                        }
                                        )
                                    }
                                </div>
                        }

                    </Grid>
                )}
            </DepartmentDetails>
        </Wrapper>
    );
}



export default DepartmentPage;