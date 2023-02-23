import axios from 'axios'

export const getProjects = async () => {
    try{
        const res = await axios.get("/projects", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res.data;
    }
    catch(err){
        console.log(err);
    }
}


export const getProjectsOnSearch = async (search) => {
    try{
        const res = await axios.get(`/projects/search/${search}`, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
          });
        return res.data;
    }
    catch(err){
        console.log(err);
    }
}