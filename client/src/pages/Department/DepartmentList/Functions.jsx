import axios from 'axios'

export const getDepartments = async () => {
    try{
        const res = await axios.get("/departments", {
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


export const getDepartmentsOnSearch = async (search) => {
    try{
        const res = await axios.get(`/departments/search/${search}`, {
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