import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';
import { GetAnnouncement } from './Functions';
import { Heading, MyDiv, MyTable, SelectMaterialType, Container } from './Style.jsx';
const CourseTeacher = () => {
  const params = useParams();
  console.log(params)
  const [announcements, setAnnouncements] = useState([]);
  const [type, setType] = useState("All");

  useEffect(() => {
    const PullData = async () => {
      await GetAnnouncement(params, setAnnouncements);
    };
    PullData();
  }, [params.id,params]);

  console.log(announcements)
  console.log(params.id)

  return (
    <div>
      <Heading>Announcements <span>From</span> {params.id}</Heading>
      <Container>
        <SelectMaterialType
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Default">Default</option>
          <option value="Subject">Subject</option>
          <option value="Date">Date</option>
        </SelectMaterialType>
      </Container>

      <MyDiv>
        <MyTable>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Date</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement._id}>
                <td>{announcement.subject} </td>
                {/* Format announcement.data in a nice format */}
                <td>{announcement.date}</td>
                <td>{announcement.semester}</td>
                <td><a href={announcement.file}><FiDownload /></a></td>
              </tr>
            ))}
          </tbody>
        </MyTable>
      </MyDiv>
    </div>

  )
}

export default CourseTeacher;


