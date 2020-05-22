let dbPromise = idb.open("pwadb", 1, function (upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("saved_machweek")) {
    let matchFav = upgradeDb.createObjectStore("saved_machweek");
    matchFav.createIndex("id", "id", { unique: true });
  }
  if (!upgradeDb.objectStoreNames.contains("saved_schedule")) {
    let matchFav = upgradeDb.createObjectStore("saved_schedule");
    matchFav.createIndex("id", "id", { unique: true });
  }
});

/** Match Finish */
function addMatchFinish(match) {
  console.log(match.id);
  dbPromise.then(function (db) {
    var tx = db.transaction('saved_machweek', 'readwrite');
    var store = tx.objectStore('saved_machweek');

    store.put(match, match.id);

    return tx.complete;
  })
    .then(function () {
      M.toast({ html: match.homeName + 'vs' + match.awayName + ' added to favorite' })
      console.log('MatchFinished berhasil disimpan.');
    })
    .catch(function () {
      console.log('Gagal menyimpan match');
    })
}

function deleteMatchFinish(match) {
  dbPromise.then(function (db) {
    let tx = db.transaction("saved_machweek", "readwrite");
    let store = tx.objectStore("saved_machweek");

    store.delete(match, match.id);
    return tx.complete;
  })
    .then(function () {
      console.log('Match dihapus');
    });
}

function getMatchFinishSaved() {
  dbPromise.then(function (db) {
    let tx = db.transaction("saved_machweek", "readonly");
    let store = tx.objectStore("saved_machweek");

    // mengambil primary key
    return store.getAll();
  })
    .then(function (matches) {
      console.log(matches);
      let matchHTML = "";
      // let matches = data.matches;

      matches.forEach(match => {

        matchHTML += `
          <div class="col m6">
          <div class="card hoverable">
            <div class="card-image">
            <img src="images/bgcard.jpg">
            <span class="card-title center-align">
              <div class="row center-align">
                <h5>Matchweek ${match.matchDay}</h5>
                <div class="col s12">
                ${match.homeName} <br/>
                vs<br/> 
                ${match.awayName}</div>
              </div>
              </span>
                <button class="btn-floating btn-large halfway-fab waves-effect waves-light deep-purple accent-2 btn-del-finish" title="Remove Favorite" type="submit" name="action">
                  <i class="material-icons">delete_forever</i>
                </button>
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <p><b>Status</b> ${match.status}</p>
                <p><b>KickOff</b> ${match.kickOff}</p>
                <p><b>Full Time</b></p>
                <p>${match.scoreFullHome} : ${match.scoreFullAway}</p>
                <p><b>Half Time</b></p>
                <p>${match.scoreHalfHome} : ${match.scoreHalfAway}</p>
              </div>
            </div>
          </div>
        </div>
      `;
      });

      document.getElementById("finished-matches-saved").innerHTML = matchHTML;

      let btn = document.getElementById("finished-matches-saved").getElementsByClassName("btn-del-finish");
      for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = () => {
          deleteMatchFinish(matches[i].id);
          getMatchFinishSaved();
        }
      }
    });
}

/** Match Schedule */
function addMatchScheduled(match) {
  console.log(match.id);
  dbPromise.then(function (db) {
    var tx = db.transaction('saved_schedule', 'readwrite');
    var store = tx.objectStore('saved_schedule');

    store.put(match, match.id);

    return tx.complete;
  })
    .then(function () {
      console.log('MatchScheduled berhasil disimpan.');
    })
    .catch(function () {
      console.log('Gagal menyimpan match');
    })
}

function deleteMatchScheduled(match) {
  dbPromise.then(function (db) {
    let tx = db.transaction("saved_schedule", "readwrite");
    let store = tx.objectStore("saved_schedule");

    store.delete(match, match.id);
    return tx.complete;
  })
    .then(function () {
      console.log('Match dihapus');
    });
}

function getMatchScheduledSaved() {
  dbPromise.then(function (db) {
    let tx = db.transaction("saved_schedule", "readonly");
    let store = tx.objectStore("saved_schedule");

    // mengambil primary key
    return store.getAll();
  })
    .then(function (matches) {
      console.log(matches);
      let matchScheduleHTML = "";
      // let matches = data.matches;

      matches.forEach(match => {

        matchScheduleHTML += `
          <div class="col m6">
            <div class="card hoverable">
              <div class="card-image">
              <img src="images/bgcard.jpg">
              <span class="card-title center-align">
                <div class="row center-align">
                  <h5>Matchweek ${match.matchDay}</h5>
                  <div class="col s12">
                  ${match.homeName} <br/>
                  vs<br/> 
                  ${match.awayName}</div>
                </div>
                </span>
                  <button class="btn-floating btn-large halfway-fab waves-effect waves-light deep-purple accent-2 btn-del-finish" title="Remove Favorite" type="submit" name="action">
                    <i class="material-icons">delete_forever</i>
                  </button>
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <p><b>Status</b> ${match.status}</p>
                  <p><b>KickOff</b> ${match.kickOff}</p>
                  <p><b>Full Time</b></p>
                  <p>${match.scoreFullHome} : ${match.scoreFullAway}</p>
                  <p><b>Half Time</b></p>
                  <p>${match.scoreHalfHome} : ${match.scoreHalfAway}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      });

      document.getElementById("scheduled-matches-saved").innerHTML = matchScheduleHTML;

      let btn = document.getElementById("scheduled-matches-saved").getElementsByClassName("btn-del-schedule");
      for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = () => {
          deleteMatchScheduled(matches[i].id);
          getMatchScheduledSaved();
        }
      }
    });
}