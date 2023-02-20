import axios from "axios";
export const SortCoursesOnName = (courses) => {
    courses.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return courses;
  };

export const GetCourses = async () => {
    try {
        const res = await axios.get("/courses/page/1", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        const courses = res.data;
        const sortedCourses = SortCoursesOnName(courses);
        return sortedCourses;
    } catch (err) {
        console.log(err);
    }
};

export const getUniqueCodes = async () => {
    try {
        const res = await axios.get("/courses/uniquecodes", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const searchOnCourseCode = async (code) => {
    try {
        const res = await axios.get(`/courses/searchcode/${code}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        // Sort and then return the courses
        const courses = res.data;
        const sortedCourses = SortCoursesOnName(courses);
        return sortedCourses;
    } catch (err) {
        console.log(err);
    }
}

export const searchOnCourseName = async (name) => {
    try {
        const res = await axios.get(`/courses/search/${name}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        // Sort and then return the courses
        const courses = res.data;
        const sortedCourses = SortCoursesOnName(courses);
        return sortedCourses;
    } catch (err) {
        console.log(err);
    }
}

export const getCoursesVotes = async () => {
    try {
        const res = await axios.get("/courses/votes", {
            headers: {
              token:
                "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const getCoursesRating = async () => {
    try {
        const res = await axios.get("/courses/rating", {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
          });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const getTotalCourses = async () => {
    try {
        const res = await axios.get("/courses/count", {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
          });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const getCoursesByPage = async (page) => {
    try {
        const res = await axios.get(`/courses/page/${page}`, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
          });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const getTotalCoursesByCode = async (code) => {
    try {
        const res = await axios.get(`/courses/count/${code}`, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
          });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const getCoursesByPageAndCode = async (page, code) => {
    try {
        const res = await axios.get(`/courses/page/${page}/${code}`, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
          });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}