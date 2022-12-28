import { getTeachersStart, getTeachersFailure, getTeachersSuccess, deleteTeacherStart, deleteTeacherFailure, deleteTeacherSuccess,createTeacherFailure,createTeacherStart,createTeacherSuccess,updateTeacherStart,updateTeacherFailure,updateTeacherSuccess } from "./TeacherActions";
import axios from 'axios'

export const getTeachers = async (dispatch) => {
    dispatch(getTeachersStart);
    try {
        const res = await axios.get("/facultys", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(getTeachersSuccess(res.data));
    } catch (err) {
        dispatch(getTeachersFailure());
    }
};

export const createTeacher = async (teacher, dispatch) => {
    dispatch(createTeacherStart);
    try {
        console.log(teacher);
        const res = await axios.post("/facultys", teacher, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(createTeacherSuccess(res.data));
    } catch (err) {
        dispatch(createTeacherFailure());
    }
};

// updateTeacher using axios, dispatching updateTeacherStart, updateTeacherSuccess, updateTeacherFailure, and passing in Teacher id, and Teacher object to update
export const updateTeacher = async (id, teacher, dispatch) => {
    dispatch(updateTeacherStart);
    try {
        const res = await axios.put("/facultys/" + id, teacher, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(updateTeacherSuccess(res.data));
    } catch (err) {
        dispatch(updateTeacherFailure());
    }
};



export const deleteTeacher = async (teacherId, dispatch) => {
    dispatch(deleteTeacherStart);
    try {
        await axios.delete("/facultys/" + teacherId, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(deleteTeacherSuccess(teacherId));
    } catch (err) {
        dispatch(deleteTeacherFailure());
    }
};


