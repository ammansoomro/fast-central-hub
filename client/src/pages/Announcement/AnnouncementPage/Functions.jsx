export async function GetAnnouncement(params, setAnnouncements) {
    const res = await fetch("/announcements/find/type/" + params.id,
      {
        method: "GET",
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        }
      });
    const data = await res.json();
    setAnnouncements(data);
  }

  