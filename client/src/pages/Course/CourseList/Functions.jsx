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

const GetCourses = async () => {
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


const getUniqueCodes = async () => {
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

const searchOnCourseName = async (name) => {
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
const getCoursesRating = async () => {
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

const getTotalCourses = async () => {
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

const getCoursesByPage = async (page) => {
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

const getTotalCoursesByCode = async (code) => {
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

const getCoursesByPageAndCode = async (page, code) => {
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

export async function AllCourses(setCourses) {
    const res = await GetCourses();
    setCourses((res));
}

export async function TotalCourses(setTotalCourses) {
    const res5 = await getTotalCourses();
    setTotalCourses(res5);
}

export async function CourseRating(setCourseRating) {
    const res4 = await getCoursesRating();
    setCourseRating(res4);
}

export async function UniqueCodes(setUniqueCodes) {
    const res2 = await getUniqueCodes();
    setUniqueCodes(res2);
}

export async function CodeAndPage(pageNumber, coursecode, setCourses) {
    const res4 = await getCoursesByPageAndCode(pageNumber, coursecode);
    setCourses(res4);
}

export async function TotalByCode(coursecode, setTotalCourses) {
    const res3 = await getTotalCoursesByCode(coursecode);
    setTotalCourses(res3);
}

export async function CourseByPage(pageNumber, setCourses) {
    const res = await getCoursesByPage(pageNumber);
    setCourses(res);
}


export async function SearchedCourse(search, setCourses) {
    const res = await searchOnCourseName(search);
    setCourses(res);
  }