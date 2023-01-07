export const SortReviews = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
};

export const getTeachers = async () => {
    try {
        const res = await fetch("/facultys", {
            method: "GET",
            headers: {
                token:
                    "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        const teachers = await res.json();
        return teachers;
    }
    catch (err) {
        console.log(err);
    }
};

export const getCourse = async (id) => {
    try {
        const res = await fetch(`/courses/find/${id}`, {
            method: "GET",
            headers: {
                token:
                    "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        const course = await res.json();
        return course;
    }
    catch (err) {
        console.log(err);
    }
}


export const getCourseUpvotes = async (id) => {
    try {
        const res = await fetch(`/reviewCourses/upvote/${id}`, {
            method: "GET",
            headers: {
                token:
                    "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        const upvotes = await res.json();
        return upvotes;
    }
    catch (err) {
        console.log(err);
    }
}

export const getCourseDownvotes = async (id) => {
    try {
        const res = await fetch(`/reviewCourses/downvote/${id}`, {
            method: "GET",
            headers: {
                token:
                    "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        const downvotes = await res.json();
        return downvotes;
    }
    catch (err) {
        console.log(err);
    }
}

export const getCourseReviews = async (id) => {
    try {
        const res = await fetch(`/reviewCourses/find/${id}`, {
            method: "GET",
            headers: {
                token:
                    "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        const reviews = await res.json();
        // Sort
        return reviews.sort(SortReviews);
    }
    catch (err) {
        console.log(err);
    }
}

export const getTeacherIds = async (id) => {
    try {
        const res = await fetch("/materials/bycourse/" + id, {
            method: "GET",
            headers: {
                token:
                    "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        const teacherIds = await res.json();
        return teacherIds;
    }
    catch (err) {
        console.log(err);
    }
}

export const getAlreadyReviewed = async (id) => {
    try {
        const res = await fetch(`/reviewCourses/find/${id}`, {
            method: "GET",
            headers: {
                token:
                    "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        const data = await res.json();
        if (data.filter((item) => item.user_id === JSON.parse(localStorage.getItem("user"))._id).length) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log(err);
    }
}

export const getCourseRating = async (id) => {
    try {
        const res = await fetch(`/reviewCourses/rating/${id}`, {
            method: "GET",
            headers: {
                token:
                    "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        const rating = await res.json();
        return rating;
    }
    catch (err) {
        console.log(err);
    }
}