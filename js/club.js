function clubData(data) {
    let detailHTML = "";
    let logo = data.crestUrl.replace(
        /^http:\/\//i,
        "https://"
    );

    detailHTML += `
      <div class="row center-align">
        <div class="col s12 m6">
          <img src="${logo}" class="logo-detail responsive-img"></a>
          <h5>${data.name}</h5>
        </div>
        <div class="col s12 m6">
        <table>
          <tr>
            <td class="team-name">Adress</td>
            <td>${data.address}</td>
          </tr>
          <tr>
            <td class="team-name">Email</td>
            <td>${data.email}</td>
          </tr>
          <tr>
            <td class="team-name">Founded</td>
            <td>${data.founded}</td>
          </tr>
          <tr>
            <td class="team-name">Phone</td>
            <td>${data.phone}</td>
          </tr>
          <tr>
            <td class="team-name">Stadium</td>
            <td>${data.venue}</td>
          </tr>
          <tr>
            <td class="team-name">Website</td>
            <td><a href="${data.website}" target="_blank">${data.website}</a></td>
          </tr>
        </table>
        </div>
      </div>
    `;

    let playerTable = "";
    data.squad.forEach(player => {
        playerTable += `
        <li>
            <div class="collapsible-header"><p class="team-name">${player.name}</p></div>
            <div class="collapsible-body">
                <table>
                <tr>
                    <td>Birth</td>
                    <td>${player.countryOfBirth}, ${player.dateOfBirth}</td>
                </tr>
                <tr>
                    <td>Position</td>
                    <td>${player.position}</td>
                </tr>
                <tr>
                    <td>Shirt Number</td>
                    <td>${player.shirtNumber}</td>
                </tr>
                </table>
            </div>
            </li>
        `;
    })
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("detail-club").innerHTML = detailHTML;
    document.getElementById("player-club").innerHTML = playerTable;
}