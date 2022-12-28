import { getMaterialsStart, getMaterialsFailure, getMaterialsSuccess, deleteMaterialStart, deleteMaterialFailure, deleteMaterialSuccess,createMaterialFailure,createMaterialStart,createMaterialSuccess,updateMaterialStart,updateMaterialFailure,updateMaterialSuccess } from "./MaterialActions";
import axios from 'axios'

export const getMaterials = async (dispatch) => {
    dispatch(getMaterialsStart);
    try {
        const res = await axios.get("/materials", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(getMaterialsSuccess(res.data));
    } catch (err) {
        dispatch(getMaterialsFailure());
    }
};

export const createMaterial = async (material, dispatch) => {
    dispatch(createMaterialStart);
    try {
        console.log(material);
        const res = await axios.post("/materials", material, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(createMaterialSuccess(res.data));
    } catch (err) {
        dispatch(createMaterialFailure());
    }
};

// updateMaterial using axios, dispatching updateMaterialStart, updateMaterialSuccess, updateMaterialFailure, and passing in Material id, and Material object to update
export const updateMaterial = async (id, material, dispatch) => {
    dispatch(updateMaterialStart);
    try {
        const res = await axios.put("/materials/" + id, material, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(updateMaterialSuccess(res.data));
    } catch (err) {
        dispatch(updateMaterialFailure());
    }
};



export const deleteMaterial = async (materialId, dispatch) => {
    dispatch(deleteMaterialStart);
    try {
        await axios.delete("/materials/" + materialId, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(deleteMaterialSuccess(materialId));
    } catch (err) {
        dispatch(deleteMaterialFailure());
    }
};


