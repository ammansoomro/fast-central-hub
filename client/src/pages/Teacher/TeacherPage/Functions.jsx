import swal from "sweetalert";

export async function DeleteReview(id, setAlreadyReviewed) {
    try {
        const response = await fetch(`/reviewfaculties/${id}`, {
            method: "DELETE",
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to delete review");
        }
        setAlreadyReviewed(false);
        swal({
            title: "Review Deleted",
            icon: "success",
            text: "Your review has been deleted",
            button: false,
            timer: 1800,
        });
    } catch (error) {
        console.error(error);
        // Handle the error as appropriate for your application, e.g. display an error message to the user
    }
}



export async function AddReview(e, review, vote, params, setReview) {
    e.preventDefault();
    try {
        const response = await fetch(`/reviewfaculties`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
            body: JSON.stringify({
                review: review,
                // if vote == "upvote" then upvote = 1 else 0
                upvote: vote === "upvote" ? 1 : 0,
                // if vote == "downvote" then downvote = 1 else 0
                downvote: vote === "downvote" ? 1 : 0,
                faculty_id: params.id,
                // Get user._id from localstorage
                user_id: JSON.parse(localStorage.getItem("user"))._id,
            }),
        });
        if (!response.ok) {
            throw new Error("Failed to add review");
        }
        setReview("");
        swal({
            title: "Review Submitted",
            icon: "success",
            text: "Your review has been submitted",
            button: false,
            timer: 1800,
        });
    } catch (error) {
        console.error(error);
        // Handle the error as appropriate for your application, e.g. display an error message to the user
    }
}



export async function CheckAlreadyReviewed(params, setAlreadyReviewed) {
    const res = await fetch(`/reviewfaculties/find/${params.id}`, {
        method: "GET",
        headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
    });
    const data = await res.json();
    if (data.filter(
        (item) => item.user_id === JSON.parse(localStorage.getItem("user"))._id
    ).length) {
        setAlreadyReviewed(true);
    }
}

export async function GetTeacherReviews(params, setTeacherReviews) {
    try {
        const res = await fetch("/reviewfaculties/find/" + params.id,
            {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                }
            });
        if (!res.ok) {
            throw new Error("Failed to fetch reviews");
        }
        const data = await res.json();
        setTeacherReviews(data);
    } catch (error) {
        console.error(error);
        // Handle the error as appropriate for your application, e.g. display an error message to the user
    }
}

export async function GetTeacherDownVotes(params, setTeacherDownvotes) {
    try {
        const res = await fetch("/reviewfaculties/downvote/" + params.id,
            {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                }
            });
        if (!res.ok) {
            throw new Error("Failed to fetch downvotes");
        }
        const data = await res.json();
        setTeacherDownvotes(data);
    } catch (error) {
        console.error(error);
        // Handle the error as appropriate for your application, e.g. display an error message to the user
    }
}

export async function GetTeacherUpVotes(params, setTeacherUpvotes) {
    try {
        const res = await fetch("/reviewfaculties/upvote/" + params.id,
            {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                }
            });
        const data = await res.json();
        setTeacherUpvotes(data);
    } catch (error) {
        console.error("Error in GetTeacherUpVotes:", error);
    }
}

export async function GetTeacherCoursesData(params, setCourses) {
    try {
        const res = await fetch(`/facultys/courses/${params.id}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });
        const data = await res.json();
        setCourses(data);
    } catch (err) {
        console.log(err);
    }
}
export async function GetTeacherData(params, setTeacher, setTeacherAbout) {
    try {
        const res = await fetch(`/facultys/find/${params.id}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });
        const data = await res.json();
        setTeacher(data);
        setTeacherAbout(data.about);
    } catch (err) {
        console.log(err);
    }
}

export async function GetBackGround(teacher, setBackgroundpicture) {
    try {
        const res = await fetch(`/departments/backgroundpicture/${teacher.department}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });
        if (!res.ok) {
            throw new Error("Failed to fetch background picture");
        }
        const data = await res.json();
        setBackgroundpicture(data);
    } catch (error) {
        console.error(error);
        // Handle the error as appropriate for your application, e.g. display an error message to the user
    }
}
