import axios from 'axios';

export async function getSocieties(setSocieties) {
  const res = await axios.get("/societies", {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    }
  });
  // Sort Data and Store in Courses
  setSocieties(res.data);
  return;
}

export async function getSocietiesOnSearch(search, setSocieties) {
  const res = await axios.get(`/societies/search/${search}`, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    }
  })
  // Sort Data and Store in Courses
  setSocieties(res.data)
}

