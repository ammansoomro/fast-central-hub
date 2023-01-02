import axios from "axios";
export const SortTeachersOnName = (teachers) => {
    teachers.sort((a, b) => {
        if (a.email < b.email) {
            return -1;
        }
        if (a.email > b.email) {
            return 1;
        }
        return 0;
    });
    return teachers;
};

// Create a Function to Get Teachers and Sort on Name
export const getTeachers = async () => {
    try {
        const res = await axios.get("/facultys/page/1", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });
        return SortTeachersOnName(res.data);
    } catch (err) {
        console.log(err);
    }
};

export const getTotalFaculty = async () => {
    try {
        const res = await axios.get("/facultys/count", {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
          });
          return res.data;
        } catch (err) {
        console.log(err);
    }
}

export const getFacultyByPage = async (page) => {
    try {
        const res = await axios.get("/facultys/page/" + page, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
          });
          return SortTeachersOnName(res.data);
        } catch (err) {
        console.log(err);
    }
}

// Get Total Faculty Count for Department
export const getTotalFacultyByDepartment = async (department) => {
    try {
        const res = await axios.get("/facultys/count/" + department, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
          });
          return res.data;
        } catch (err) {
        console.log(err);
    }
}

// Get Faculty by Department and Page
export const getFacultyByDepartmentAndPage = async (department, page) => {
    try {
        const res = await axios.get("/facultys/page/" + page + "/" + department, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
          });
        return SortTeachersOnName(res.data);
        } catch (err) {
        console.log(err);
    }
}

// Get Faculty on Search
export const getFacultyOnSearch = async (search) => {
    try {
        const res = await axios.get(`/facultys/search/${search}`, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
          });
          return SortTeachersOnName(res.data);
        } catch (err) {
        console.log(err);
    }
}

export const getTeacherVotes = async () => {
    try {
        const res = await axios.get("/facultys/updownvotescount", {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
          });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}
