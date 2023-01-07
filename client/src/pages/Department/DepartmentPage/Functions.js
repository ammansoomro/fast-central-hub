export const getDepartment =  async (id) => {
    try {
        const res = await fetch(`/departments/find/${id}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
        
    }
}

export const getDepartmentTeachers = async (code) => {
    try {
        const res = await fetch(`/facultys/department/${code}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
        
    }
}