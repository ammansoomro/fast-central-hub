import axios from 'axios'

export const getProjects = async () => {
    try {
        const res = await axios.get("/projects", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}


export const getProjectsOnSearch = async (search) => {
    try {
        const res = await axios.get(`/projects/search/${search}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const getProjectsOnType = async (type) => {
    try {
        const res = await axios.get(`/projects/type/${type}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });
        return res.data;
    }
    catch (err) {
        console.log(err)
    }
}

export const getProjectsOnDomain = async (domain) => {
    try {
        const res = await axios.get(`/projects/domain/${domain}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });
        return res.data;
    }
    catch (err) {
        console.log(err)
    }
}

export const getProjectsOnTypeAndDomain = async (type, domain) => {
    try {
        const res = await axios.get(`/projects/type/${type}/domain/${domain}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });
        return res.data;
    }
    catch (err) {
        console.log(err)
    }
}
