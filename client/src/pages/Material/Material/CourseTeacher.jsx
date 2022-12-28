import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
const CourseTeacher = () => {
  const params = useParams();
  console.log(params)
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
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
    getMaterials();
  }, [params.id, params.teacher_id]);


  return (
    <div>
      <h1>Course Material</h1>
      {materials.map((material) => (
        <div key={material._id}>
          <a href={material.file}>
            <h3>{material.name}</h3>
          </a>
          <p>Semester: {material.semester}</p>
        </div>
      ))}
    </div>

  )
}

export default CourseTeacher;