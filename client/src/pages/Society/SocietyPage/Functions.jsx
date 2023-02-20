export async function GetSocietyEvents(params) {
    const res2 = await fetch(`/events/findbySocietyId/${params.id}`, {
        headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        }
    });
    const data2 = await res2.json();
    return data2;
}

export async function GetSocietyData(params) {
    const res = await fetch(`/societies/find/${params.id}`, {
        headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        }
    });
    const data = await res.json();
    return data;
}
