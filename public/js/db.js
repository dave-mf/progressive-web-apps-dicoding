var dbPromised = idb.open('football-info', 1, upgradeDb => {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('teams', { 'keyPath': 'id' })
  }
});

var saveTeam = (team) => {
  dbPromised.then(db => {
    var tx = db.transaction('teams', 'readwrite');
    var store = tx.objectStore('teams')
    team.createdAt = new Date().getTime()
    store.put(team)
    return tx.complete;
  }).then(() => {
    M.toast({ html: `${team.name} Saved` })
    console.log('Saved');
  }).catch(err => {
    console.error('Failed to Save', err);
  });
}

function saveForLater(team) {
  dbPromised
      .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.add(team.result);
      return tx.complete;
      })
      .then(function() {
      console.log("Team berhasil di simpan.");
      });
  }  

var getSavedTeam = () => {
  return dbPromised.then(db => {
    var tx = db.transaction('teams', 'readonly');
    var store = tx.objectStore('teams');
    return store.getAll();
  })
  }

var deleteTeam = (idTeam) => {
  dbPromised.then(db => {
    var tx = db.transaction('teams', 'readwrite');
    var store = tx.objectStore('teams');
    store.delete(idTeam);
    return tx.complete;
  }).then(() => {
    M.toast({ html: 'Team has been deleted!' });
    SaveTeams();
  }).catch(err => {
    console.error('Error: ', err);
  });
} 


function getById(id) {
return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        return store.get(id);
    })
    .then(function(team) {
        resolve(team);
    });
});
}  

// var getTeamById = (id) => {
//   return dbPromised.then(db => {
//     var tx = db.transaction('teams', 'readonly');
//     var store = tx.objectStore('teams');
//     return store.get(id);
//   })
//   }