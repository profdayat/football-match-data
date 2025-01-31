const base_url = "https://api.football-data.org/v4/";
const premier_league = 2021;
const team_uri = `${base_url}teams/`;
const mathes_finished_uri = `${base_url}competitions/${premier_league}/matches?status=FINISHED`;
const mathes_scheduled_uri = `${base_url}competitions/${premier_league}/matches?status=SCHEDULED`;
const standing_uri = `${base_url}competitions/${premier_league}/standings?standingType=TOTAL`;

const fetchApi = function (url) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin": "https://football-dayat.netlify.app/",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      "X-Auth-Token": "f9787328b59348c78ac1e33276519076"
    }
  })
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getMatchFinished() {

  if ('caches' in window) {
    caches.match(mathes_finished_uri).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log(data);
          matchData(data);
        })
      }
    })
  }

  fetchApi(mathes_finished_uri)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      matchData(data);
    })
    .catch(error);
}

function getMatchScheduled() {

  if ('caches' in window) {
    caches.match(mathes_scheduled_uri).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log(data);
          matchDataSchedul(data);
        })
      }
    })
  }

  fetchApi(mathes_scheduled_uri)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      matchDataSchedul(data);
    })
    .catch(error);
}

function getTable() {

  if ('caches' in window) {
    caches.match(standing_uri).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log(data);
          standingData(data);
        })
      }
    })
  }

  fetchApi(standing_uri)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      standingData(data);
    })
    .catch(error);
}

function getClubById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(team_uri + idParam).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log(data);
          clubData(data);
        });
      }
    });
  }

  fetchApi(team_uri + idParam)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      clubData(data);
    })
    .catch(error);
}
