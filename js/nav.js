document.addEventListener("DOMContentLoaded", function () {
  // Activate sidebar nav
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;
        document.querySelector('.topnav').innerHTML = xhttp.responseText
        document.querySelector('.mobilenav').innerHTML = xhttp.responseText

        // Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
          elm.addEventListener("click", function (event) {
            // Tutup sidenav
            let sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            // Muat konten halaman yang dipanggil
            if (event.target.getAttribute("href") != null) {
              page = event.target.getAttribute("href").substr(1);
            }

            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Load page content
  let page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        let content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          if (page == "home") {
            getMatchFinished();
          } else if (page == "scheduled") {
            getMatchScheduled();
          } else if (page == "standing") {
            getTable();
          } else if (page == "favorite") {
            getMatchFinishSaved();
            getMatchScheduledSaved();
            content.append = eval($('.tabs').tabs());
          }
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});