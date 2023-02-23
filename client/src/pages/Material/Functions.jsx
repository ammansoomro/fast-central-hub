export async function GetTeacher(params, setTeacher) {
  const res = await fetch("/facultys/find/" + params.teacher_id,
    {
      method: "GET",
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      }
    });
  const data = await res.json();
  setTeacher(data);
}
export async function GetCourse(params, setCourse) {
  const res = await fetch("/courses/find/" + params.id,
    {
      method: "GET",
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      }
    });
  const data = await res.json();
  setCourse(data);
}
export async function GetMaterial(params, setMaterials) {
  const res = await fetch("/materials/bycourseteacher/" + params.id + "/" + params.teacher_id,
    {
      method: "GET",
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      }
    });
  const data = await res.json();
  setMaterials(data);
}
