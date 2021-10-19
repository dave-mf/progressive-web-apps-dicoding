const base_url = "https://api.football-data.org/v2/";
const api_token = "305f8136687f4756a6486f3041d08e7d"
const team_info = `${base_url}teams/`;
const kode_tahun = 2019 
const match_ep = `${base_url}matches/`;
const klasemen_info = `${base_url}competitions/${kode_tahun}/standings?standingType=TOTAL` ;

const fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_token
    }
  });
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

// Blok kode untuk melakukan request data json

function getTeam() {
  if ('caches' in window) {
    caches.match(team_info).then(function(response) {
      if (response) {
        response.json().then(function (data) {
        var str = JSON.stringify(data).replace(/http:/g, 'https:');
        data = JSON.parse(str);
          var teamsHTML = "";
          data.teams.forEach(function(teams) {
            teamsHTML += `
                <div class="grid col m6 s12">
                <div class="card-panel hoverable" style="height:80%;">
                  <a href="./teamDetail.html?id=${teams.id}">
                    <div class="card-image center-align waves-effect waves-block waves-light">
                      <img width="100px" src="${teams.crestUrl}" />
                    </div>
                  </a>
                  <div class="card-content">
                    <span style="font-weight:bold;" class="card-title truncate">${teams.name}</span>
                    <p style="style="width:100%;height:20px;overflow:hidden;text-overflow:ellipsis;"">${teams.address}</p>
                  </div>
                </div>
                </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("team_info").innerHTML = teamsHTML;
        })
      }
    })
  }
  fetchApi(team_info)
  .then(status)
  .then(json)
  .then(function(data) {
    // Objek/array JavaScript dari response.json() masuk lewat data.
    // Menyusun komponen card teams secara dinamis
    var str = JSON.stringify(data).replace(/http:/g, 'https:');
    data = JSON.parse(str);
    var teamHTML = "";
    data.teams.forEach(function(team) {
      teamHTML += `
          <div class="grid col m6 s12" style="height:250px;">
          <div class="card-panel hoverable">
            <a href="./teamDetail.html?id=${team.id}">
              <div class="card-image center-align waves-effect waves-block waves-light">
                <img width="100px" src="${team.crestUrl}" />
              </div>
            </a>
            <div class="card-content">
              <span style="font-weight:bold;" class="card-title truncate">${team.name}</span>
              <p style="style="width:100%;height:20px;overflow:hidden;text-overflow:ellipsis;"">${team.address}</p>
            </div>
          </div>
          </div>
          `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("team_info").innerHTML = teamHTML;
  })
  .catch(error);
}

function getKlasemen() {
  if ('caches' in window) {
    caches.match(klasemen_info).then(function(response) {
      if (response) {
        response.json().then(function (data) {
        var str = JSON.stringify(data).replace(/http:/g, 'https:');
        var data = JSON.parse(str);
          var KlasemenHTML = ''
            data.standings.forEach(klasemen => {
              var isiKlasemen = ''
              klasemen.table.forEach(results => {
                isiKlasemen += `
                    <tr>
                    <td>${results.position}</td>
                    <td><img class="responsive-img" width="24"  src="${ results.team.crestUrl.replace(/^http:\/\//i, 'https://') || 'icon.png'}"> </td>
                    <td>${results.team.name}</td>
                    <td>${results.playedGames}</td>
                    <td>${results.lost}</td>
                    <td>${results.draw}</td>
                    <td>${results.won}</td>
                    <td>${results.points}</td>
                  </tr>
                  `;
              });

              KlasemenHTML += `
              <h5 class="header center-align">Klasemen</h5>
                <div class="card m12 s12" style="margin-top:3%;">
                <div class="card-content"> 
                <table class="responsive-table">
                <thead>
                  <tr>
                    <th>Posisi</th>
                    <th>Team</th>
                    <th>Nama</th>
                    <th>Permainan</th>
                    <th>Kalah</th>
                    <th>Seimbang</th>
                    <th>Menang</th>
                    <th>Poin</th>
                  </tr>
                </thead>
                <tbody>` + isiKlasemen + `</tbody>
                </table>
                </div>
                </div>
                </div>
              `
            });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("klasemen").innerHTML = KlasemenHTML;
        })
      }
    })
  }
  fetchApi(klasemen_info)
  .then(status)
  .then(json)
  .then(function(data) {
    // Objek/array JavaScript dari response.json() masuk lewat data.
    // Menyusun komponen card teams secara dinamis
      // console.log(data)
      var str = JSON.stringify(data).replace(/http:/g, 'https:');
      data = JSON.parse(str);
      var KlasemenHTML = ''
      data.standings.forEach(klasemen => {
        var isiKlasemen = ''
        klasemen.table.forEach(result => {
          isiKlasemen += `
              <tr>
              <td>${result.position}</td>
              <td><img class="responsive-img" width="24"  src="${ result.team.crestUrl.replace(/^http:\/\//i, 'https://') || 'icon.png'}"> </td>
              <td>${result.team.name}</td>
              <td>${result.playedGames}</td>
              <td>${result.lost}</td>
              <td>${result.draw}</td>
              <td>${result.won}</td>
              <td>${result.points}</td>
            </tr>
            `;
        });

        KlasemenHTML += `
        <h5 class="header center-align">Klasemen</h5>
          <div class="card m12 s12" style="margin-top:3%;">
          <div class="card-content"> 
          <table class="responsive-table">
          <thead>
            <tr>
              <th>Posisi</th>
              <th>Team</th>
              <th>Nama</th>
              <th>Permainan</th>
              <th>Kalah</th>
              <th>Seimbang</th>
              <th>Menang</th>
              <th>Poin</th>
            </tr>
          </thead>
          <tbody>` + isiKlasemen + `</tbody>
          </table>
          </div>
          </div>
          </div>
        `
      });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("klasemen").innerHTML = KlasemenHTML;
  })
  
}

function tesgetTeamsById() {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(team_info + idParam).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var teamHTML = `
              <div style="margin-top:3%;" class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img style="width:40%;margin:0 auto;" src="${data.crestUrl}" />
              </div>
              <div class="card-content">
                <span class="card-title" style="font-weight:bold;">${data.name}</span>
                <hr>
                <span class="card-title">${data.shortName}</span>
                <p>Phone    : ${data.phone}</p>
                <p>Website  : ${data.website}</p>
                <p>Founded  : ${data.founded}</p>
                <p>Address  : ${data.address}</p>
              </div>
            </div>
          `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = teamHTML;
        });
      }
    });
  }

  fetchApi(team_info + idParam)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var teamHTML = `
          <div style="margin-top:3%;" class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img style="width:40%;margin:0 auto;" src="${data.crestUrl}" />
          </div>
          <div class="card-content">
            <span class="card-title" style="font-weight:bold;">${data.name}</span>
            <hr>
            <span class="card-title">${data.shortName}</span>
            <p>Phone    : ${data.phone}</p>
            <p>Website  : ${data.website}</p>
            <p>Founded  : ${data.founded}</p>
            <p>Address  : ${data.address}</p>
          </div>
        </div>
        `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = teamHTML;
    });
}

function getTeamsById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(team_info + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var teamHTML = `
            <div style="margin-top:3%;" class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img style="width:40%;margin:0 auto;" src="${data.crestUrl}" />
              </div>
              <div class="card-content">
                <span class="card-title" style="font-weight:bold;">${data.name}</span>
                <hr>
                <span class="card-title">${data.shortName}</span>
                <p>Phone    : ${data.phone}</p>
                <p>Website  : ${data.website}</p>
                <p>Founded  : ${data.founded}</p>
                <p>Address  : ${data.address}</p>
              </div>
            </div>
          `;
            
            document.getElementById("body-content").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    fetchApi(team_info + idParam)
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var teamHTML = `
          <div style="margin-top:3%;" class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img style="width:40%;margin:0 auto;" src="${data.crestUrl}" />
          </div>
          <div class="card-content">
            <span class="card-title" style="font-weight:bold;">${data.name}</span>
            <hr>
            <span class="card-title">${data.shortName}</span>
            <p>Phone    : ${data.phone}</p>
            <p>Website  : ${data.website}</p>
            <p>Founded  : ${data.founded}</p>
            <p>Address  : ${data.address}</p>
          </div>
        </div>
        `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = teamHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(team) {
    articleHTML = '';
    var articleHTML = `
    <div style="margin-top:3%;" class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img style="width:40%;margin:0 auto;" src="${team.crestUrl}" />
          </div>
          <div class="card-content">
            <span class="card-title" style="font-weight:bold;">${data.name}</span>
            <hr>
            <span class="card-title">${team.shortName}</span>
            <p>Phone    : ${team.phone}</p>
            <p>Website  : ${team.website}</p>
            <p>Founded  : ${team.founded}</p>
            <p>Address  : ${team.address}</p>
          </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}

var deleteTeamFunc = idTeam => {
  deleteTeam(idTeam);
}

var SaveTeams = () => {
  var teams = getSavedTeam()
      teams.then(data => {
        teamData = data;
        var html = ''
        data.forEach(team => {
      
      html += `
      <div class="grid col m4 s12">
        <div style="margin-top:3%;" class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img style="width:40%;margin:0 auto;" src="${team.crestUrl}" />
        </div>
        <div class="card-content">
          <span class="card-title" style="font-weight:bold;">${team.name}</span>
          <hr>
          <span class="card-title">${team.shortName}</span>
          <p>Phone    : ${team.phone}</p>
          <p>Website  : ${team.website}</p>
          <p>Founded  : ${team.founded}</p>
          <p>Address  : ${team.address}</p>
        </div>
        <div class="card-action left-align">
            <a class="waves-light waves-effect btn-small red" onclick="deleteTeamFunc(${team.id})">Hapus</a>
        </div>
      </div>
      </div>
    `
    });
    document.getElementById("timFavorit").innerHTML = html;
  })
}



   
  



