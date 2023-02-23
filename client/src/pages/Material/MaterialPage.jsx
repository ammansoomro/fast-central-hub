import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';
import { GetMaterial, GetCourse, GetTeacher } from './Functions';
import { Heading, MyDiv, MyTable, SelectMaterialType, Container } from './Style.jsx';
const CourseTeacher = () => {
  const params = useParams();
  console.log(params)
  const [materials, setMaterials] = useState([]);
  const [course, setCourse] = useState({});
  const [teacher, setTeacher] = useState({});
  const [type, setType] = useState("All");

  useEffect(() => {
    const PullData = async () => {
      await GetMaterial(params, setMaterials);
      await GetCourse(params, setCourse);
      await GetTeacher(params, setTeacher);
    };
    PullData();
  }, [params.id, params.teacher_id]);

  useEffect(() => {
    const GetMaterialByType = async () => {
      if (type === "All") {
        await GetMaterial(params, setMaterials);
        return;
      }
      const res = await fetch('/materials/bycourseteachertype/' + params.id + '/' + params.teacher_id + '/' + type, {
        method: 'GET',
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        }
      });
      const data = await res.json();
      setMaterials(data);
    };
    GetMaterialByType();
  }, [type]);

  return (
    <div>
      <Heading>{course.name} <span>Material By</span> {teacher.name}</Heading>
      <Container>
        <SelectMaterialType
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Slides">Slides</option>
          <option value="Book">Book</option>
          <option value="Outline">Outline</option>
          <option value="Quiz">Quiz</option>
          <option value="Assignment">Assignment</option>
          <option value="Past Paper">Past Paper</option>
        </SelectMaterialType>
      </Container>

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

export default CourseTeacher;


