function matchData(data) {
  let matchHTML = "";
  let matches = data.matches;

  matches.forEach(match => {

    matchHTML += `

    <div class="col m6">
      <div class="card hoverable">
        <div class="card-image">
        <img src="images/bgcard.jpg">
        <span class="card-title center-align">
          <div class="row center-align">
            <h5>Matchweek ${match.matchday}</h5>
            <div class="col s12">
            ${match.homeTeam.name} <br/>
            vs<br/> 
            ${match.awayTeam.name}</div>
          </div>
          </span>
            <button class="btn-floating btn-large halfway-fab waves-effect waves-light deep-purple accent-2 btn-add-finish" title="Add to Favorite" type="submit" name="action">
              <i class="material-icons">favorite</i>
            </button>
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p><b>Status</b> ${match.status}</p>
            <p><b>KickOff</b> ${match.utcDate}</p>
            <p><b>Full Time</b></p>
            <p>${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}</p>
            <p><b>Half Time</b></p>
            <p>${match.score.halfTime.homeTeam} : ${match.score.halfTime.awayTeam}</p>
          </div>
        </div>
      </div>
    </div>

    `;
  });
  document.getElementById("finished-matches").innerHTML = matchHTML;

  let btn = document.getElementById("finished-matches").getElementsByClassName("btn-add-finish");
  for (let i = 0; i < btn.length; i++) {
    btn[i].onclick = () => {
      let saveMatchFinish = {
        id: matches[i].id,
        matchDay: matches[i].matchday,
        homeName: matches[i].homeTeam.name,
        awayName: matches[i].awayTeam.name,
        kickOff: matches[i].utcDate,
        status: matches[i].status,
        scoreFullHome: matches[i].score.fullTime.homeTeam,
        scoreFullAway: matches[i].score.fullTime.awayTeam,
        scoreHalfHome: matches[i].score.halfTime.homeTeam,
        scoreHalfAway: matches[i].score.halfTime.awayTeam,
      }
      addMatchFinish(saveMatchFinish);
    }
  }
}

function matchDataSchedul(data) {
  let matchHTML = "";
  let matches = data.matches;

  if (matches.length === 0) {
    console.log('a');
    matchHTML += `
      <p>Data kosong.</p>
      `;
  }

  matches.forEach(match => {

    if (match.score.fullTime.homeTeam == null && match.score.fullTime.awayTeam == null
      && match.score.halfTime.homeTeam == null && match.score.halfTime.awayTeam == null) {
      match.score.fullTime.homeTeam = 0;
      match.score.fullTime.awayTeam = 0;
      match.score.halfTime.homeTeam = 0;
      match.score.halfTime.awayTeam = 0;
    }

    matchHTML += `
    
    <div class="col m6">
      <div class="card hoverable">
        <div class="card-image">
        <img src="images/bgcard.jpg">
        <span class="card-title center-align">
          <div class="row center-align">
            <h5>Matchweek ${match.matchday}</h5>
            <div class="col s12">
            ${match.homeTeam.name} <br/>
            vs<br/> 
            ${match.awayTeam.name}</div>
          </div>
          </span>
            <button class="btn-floating btn-large halfway-fab waves-effect waves-light deep-purple accent-2 btn-add-finish" title="Add to Favorite" type="submit" name="action">
              <i class="material-icons">favorite</i>
            </button>
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p><b>Status</b> ${match.status}</p>
            <p><b>KickOff</b> ${match.utcDate}</p>
            <p><b>Full Time</b></p>
            <p>${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}</p>
            <p><b>Half Time</b></p>
            <p>${match.score.halfTime.homeTeam} : ${match.score.halfTime.awayTeam}</p>
          </div>
        </div>
      </div>
    </div>
    `;
  });
  document.getElementById("scheduled-matches").innerHTML = matchHTML;

  let btn = document.getElementById("scheduled-matches").getElementsByClassName("btn-add-scheduled");
  for (let i = 0; i < btn.length; i++) {
    btn[i].onclick = () => {
      let saveMatchFinish = {
        id: matches[i].id,
        matchDay: matches[i].matchday,
        homeName: matches[i].homeTeam.name,
        awayName: matches[i].awayTeam.name,
        kickOff: matches[i].utcDate,
        status: matches[i].status,
        scoreFullHome: matches[i].score.fullTime.homeTeam,
        scoreFullAway: matches[i].score.fullTime.awayTeam,
        scoreHalfHome: matches[i].score.halfTime.homeTeam,
        scoreHalfAway: matches[i].score.halfTime.awayTeam,
      }
      addMatchScheduled(saveMatchFinish);
    }
  }
}