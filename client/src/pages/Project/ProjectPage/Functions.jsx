export async function GetProjectData(params) {
    const res = await fetch(`/projects/find/${params.id}`, {
        headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        }
    });
    const data = await res.json();
    return data;
}
