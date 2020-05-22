function standingData(data) {
  data.standings.forEach(function (standing) {
    standing.table.forEach(function (placement) {
      let table = "";
      let logo = placement.team.crestUrl.replace(
        /^http:\/\//i,
        "https://"
      );
      table += `
          <tr>
            <td class="center-align team-name">${placement.position}.</td>
            <td class="center-align">
              <a href="detailclub.html?utm_id=${placement.team.id}"><img src="${logo}" class="logo"></a>
            </td>
            <td>
              <a href="detailclub.html?id=${placement.team.id}">${placement.team.name}</a>
            </td>
            <td class="center-align">${placement.playedGames}</td>
            <td class="center-align">${placement.won}</td>
            <td class="center-align">${placement.draw}</td>
            <td class="center-align">${placement.lost}</td>
            <td class="center-align">${placement.goalDifference}</td>
            <td class="center-align">${placement.points}</td>
          </tr>
        `;

      let content = document.getElementById("list-table").innerHTML + table;
      document.getElementById("list-table").innerHTML = content;
      document.getElementById("progress_container").style.display = 'none';
    });
  });

  document.getElementById("last-update").innerHTML = "Last Updated: " + data.competition.lastUpdated;
}