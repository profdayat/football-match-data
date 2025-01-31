function standingData(data) {
  data.standings.forEach(function (standing) {
    standing.table.forEach(function (placement) {
      let table = "";
      let logo = placement.team.crest;
      table += `
          <tr>
            <td>${placement.position}.</td>
            <td>
              <a href="detailclub.html?utm_id=${placement.team.id}"><img src="${logo}" class="logo"></a>
            </td>
            <td>
              <a href="detailclub.html?id=${placement.team.id}">${placement.team.name}</a>
            </td>
            <td>${placement.playedGames}</td>
            <td>${placement.won}</td>
            <td>${placement.draw}</td>
            <td>${placement.lost}</td>
            <td>${placement.goalDifference}</td>
            <td>${placement.points}</td>
          </tr>
        `;

      let content = document.getElementById("list-table").innerHTML + table;
      document.getElementById("list-table").innerHTML = content;
      document.getElementById("progress_container").style.display = 'none';
    });
  });

  document.getElementById("last-update").innerHTML = "Last Updated: " + data.competition.lastUpdated;
}