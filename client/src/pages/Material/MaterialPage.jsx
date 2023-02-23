import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FiDownload } from 'react-icons/fi';
const CourseTeacher = () => {
  const params = useParams();
  console.log(params)
  const [materials, setMaterials] = useState([]);
  const [course, setCourse] = useState({});
  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const getMaterials = async () => {
      const res = await fetch("/materials/bycourseteacher/" + params.id + "/" + params.teacher_id,
        {
          method: "GET",
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });
      const data = await res.json();
      setMaterials(data);
    };

    const getCourse = async () => {
      const res = await fetch("/courses/find/" + params.id,
        {
          method: "GET",
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });
      const data = await res.json();
      setCourse(data);
    };

    const getTeacher = async () => {
      const res = await fetch("/facultys/find/" + params.teacher_id,
        {
          method: "GET",
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });
      const data = await res.json();
      setTeacher(data);
    };
    getCourse();
    getTeacher();
    getMaterials();
  }, [params.id, params.teacher_id]);

  console.log(teacher)
  console.log(course)

  return (
    <div>
      <Heading>{course.name} <span>Material By</span> {teacher.name}</Heading>
      <MyDiv>
        <MyTable>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Type</th>
              <th>Semester</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material._id}>
                <td>{material.name} </td>
                <td>{material.type}</td>
                <td>{material.semester}</td>
                <td><a href={material.file}><FiDownload /></a></td>
              </tr>
            ))}
          </tbody>
        </MyTable>
      </MyDiv>
    </div>

  )
}

const MyDiv = styled.div`
  padding: 1.5rem 4.5rem;
  min-height: 66vh;

`;


const MyTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border-radius: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    font-family: 'Poppins', sans-serif;
    thead{      border-radius: 1rem;
}
    tr{
      border-radius: 1rem;
    }
  th{
    background-color: #216ce7;
    color: white;
  }
  th , td {
  padding: 8px;
  text-align: center;
  }
  th:first-child, td:first-child {
    text-align: center;
  }

  th:first-child {
    border-radius: 2rem 0rem 0rem 0rem;
  }
  th:last-child {
    border-radius: 0rem 2rem 0rem 0rem;
  }
  tr:nth-child(even){
    background: rgba(255, 255, 255, 0.06);
  color: ghostwhite;
  &:hover{
    background: rgba(255, 255, 255, 0.1);
  }


}
  tr:nth-child(odd){
    background:#050508;
  color: ghostwhite;
  &:hover{
    background: rgba(255, 255, 255, 0.1);
  }
}

`;

const Heading = styled.h1`
  text-align: center;
  color: whistesmoke;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  padding-top: 20px;

  span{
    /* color: gradient of nice blue */
    color: #216ce7;

  }
`;

export default CourseTeacher;
