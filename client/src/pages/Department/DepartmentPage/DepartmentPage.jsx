import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
    // Sort Reviews by time
    // eslint-disable-next-line 
    useEffect(() => {
        const getDepartment = async () => {
            try {
                const res = await fetch(`/departments/find/${params.id}`, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                const data = await res.json();
                setDepartment(data);
                setDepartmentAbout(data.about);
            } catch (err) {
                console.log(err);
            }
        };
        getDepartment();
    }, [params.id]);

    useEffect(() => {
        const getDepartmentTeachers = async () => {
            try {
                const res = await fetch(`/facultys/department/${department.code}`, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                const data = await res.json();
                setDepartmentTeachers(data);
            } catch (err) {
                console.log(err);
            }
        };

        getDepartmentTeachers();
    }, [department.code]);

    console.log(departmentTeachers);
    console.log(params)


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
                                        <p>{departmentAbout.substring(0, 965)}</p>
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
                    <button className="btn" onClick={() => setTab(2)}>
                        Department Teachers
                    </button>
                    <button className="btn" onClick={() => setTab(1)}>
                        Tentative Study Plan
                    </button>
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
const Wrapper = styled(motion.div)`
margin: 0rem 1rem;
`;

const Grid = styled.div`
    padding: 1.5rem 0rem;
    .teachers {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 4.5rem 1rem;
    }
    .noTeachers {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        h1 {
            font-size: 1.5rem;
            font-weight: 500;
            color: #000;
        }
    }
`;


const TeacherCard = styled.div`
  width: 120px;
  height: 150px;
  /* position: relative; */
  transition: all ease 0.3s;
    /* border: 1px solid rgb(255, 255, 255); */
  border-radius: 1.4rem !important;

    &:hover {
        border: 1px solid #3582c6;
    }

    &:hover .body {
        opacity: 1;
    }
`;

const TeacherCardImage = styled.div`
    border-radius: 1.4rem;
    width: 100%;
    height: 100%;

    img {
        border-radius: 1.4rem;

        width: 100%;
        height: 100%;
        object-fit: fill;
        object-position: center;
    }
`;

const DepartmentBanner = styled.div`
width: 100%;
margin: 10px auto;
  max-width: 1200px;
  min-height: 600px;
  max-height: 580px;
padding: 70px 50px;
position: relative;
display: flex;
justify-content:center;
&::after {
content: "";
position: absolute;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
background: rgba(32, 32, 32, 0.7);
background: linear-gradient(0deg, rgb(8, 8, 8) 0%, rgba(0, 0, 0, 0.6) 100%);
}
`;

const Image = styled.div`
position: absolute;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
border-radius: 5px;
overflow: hidden;
img {
    /* Brightness Filter */
width: 100%;
height: 100%;
object-fit: fill;
object-position: center;
}
&::before {
content: "";
position: absolute;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
background: rgba(32, 32, 32, 0.7);
background: linear-gradient(
  -90deg,
  rgba(37, 37, 37, 0.2) 0%,
  rgba(15, 15, 15, 0.3) 100%
);
}
`;

const Container = styled.div`
z-index: 100;
display: grid;
grid-template-columns: 1fr 1fr;
width: 100%;
position: relative;
.title-container {
width: 100%;
max-width: 500px;
display: flex;
flex-direction: column;
justify-content: space-between;
}
.title-container p{
position: relative;
margin: 1.5rem 0;
color: #747474;
width: 180%;
text-align: justify;
}
.course-title{
width: 150%;
}
.coursedescription{
font-size: 1.1rem;
}
.course-title h1 {
color: #ffffff;
font-weight: 600;
font-size: 2.0rem;
font-family: 'Signika', sans-serif;
line-height: 40px;
letter-spacing: 1px;
}
.about {
display: flex;
justify-content: flex-start;
align-items: center;
margin-top: 10px;
flex-wrap: wrap;
color: #e9e9e9;
}
.rating {
display: flex;
align-items: center;
justify-content: flex;
letter-spacing: 0.1rem;
img {
  height: 2rem;
  width: 2.4rem;
  object-fit: contain;
  object-position: center;
  margin: 0px 10px;
}
}
.about span {
margin-right: 1.1rem;
letter-spacing: 1px;
font-size: 0.8rem;
}
.title-bottom{
display: flex;
justify-content: flex-start;
align-items: center;
flex-wrap: wrap;
}
.btn {
border: none;
outline: 2px solid #3883c5;
background: transparent;
color: #3883c5;
cursor: pointer;
font-weight: bold;
padding: 5px 4px;
transition: 0.4s;
margin-top: 1rem;
margin-right: 0.9rem;
border-radius: 0.2rem;
}
.btn:hover{
transform: translateY(-0.3rem);
color: #355C7D;
outline: 2px solid #355C7D;
}
li{
float: left;
display: block;
color: white;
text-align: center;  
font-weight: bold;
color: #2f85d0;
font-size: 0.8rem;
}
li:not(:first-child){
  padding: 0rem 0.2rem;
}
.category{
margin-right: 40px;
font-size: 1.2rem;
display: flex;
flex-direction: column;
}
.category strong{
font-weight: 500;
color: #ffffff;
}
`;



const DepartmentDetails = styled.section`
width: 100%;
max-width: 1000px;
margin: 2rem auto 1rem auto;
padding: 2rem;
display: flex;
flex-direction: column;
text-align: center;
p{
margin: 1rem 0;
color: #747474;
}
`;


// ==========  Card Image ==========
const CardImage = styled.div`
width: 110%;
height: 100%;
border-radius: 1rem;
img {
border-radius: 1rem;
filter: brightness(0.8);

width: 100%;
height: 100%;
object-fit: fill;
object-position: center;
}
`;

export const TabHeading = styled.section`
width: 100%;
max-width: 800px;
margin: 0rem auto 0rem auto;
display: flex;  
justify-content: flex-start;
align-items:center;
flex-direction: column;
strong{
    /* color: #d3060a; */
    color: #FFFFFF;
    font-family: 'Signika', sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
    padding: 1.2rem;
}
`;
export const Card = styled.div`
  z-index: 2;
  width: 300px;
  height: 350px;
  position: relative;
  border-radius: 1rem;
  margin-top: 1rem;
`;

export const VoteSelect = styled.select`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.1rem;
    height: 30px;
    background: transparent;
    font-size: 0.8rem;
    color: #3883c5;
    font-family: "Poppins", sans-serif;
    /* text-transform: uppercase; */
    cursor: pointer;
    transition: ease-in-out 0.5s;
    font-weight: bold;
    padding: 0px 15px;
    border: none;
    border-bottom: 2px solid #3883c5;
`;


export const DeleteReview = styled.button`
border-radius: 50%;
height: 15px;
width: 15px;
color: #d33838;
  background: #d33838;
font-size: 0.9rem;
font-family: "Poppins", sans-serif;
/* text-transform: uppercase; */
cursor: pointer;
transition: ease-in-out 0.5s;
font-weight: bold;
padding: 0px 3px;
border: none;
&:hover {
  background: #bf1e1e;
  box-shadow: 0 0 5px #d33838, 0 0 10px #d33838, 0 0 15px #d33838, 0 0 20px #d33838, 0 0 25px #d33838, 0 0 30px #d33838;

color: #fff;
}
`;


export const AlreadyReviewed = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.1rem;
    height: 30px;
    background: transparent;
    font-size: 1rem;
    color: #3883c5;
    font-family: "Poppins", sans-serif;
    /* text-transform: uppercase; */
    cursor: pointer;
    transition: ease-in-out 0.5s;
    font-weight: bold;
    margin-bottom: 20px;
    border: none;
`;

export const Btn = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  height: 30px;
  background: #3883c5;
  font-size:    0.8rem;
  color: #fff;
  font-family: "Poppins", sans-serif;
  /* text-transform: uppercase; */
  cursor: pointer;
  transition: ease-in-out 0.5s;
  font-weight: bold;
  border: none;
  padding: 0px 15px;

  &:hover {
    border: 3px solid #3883c5;
    color: #3883c5;
    background: transparent;
  }
`;


export default DepartmentPage;