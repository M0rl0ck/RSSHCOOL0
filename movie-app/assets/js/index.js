const url =
  "https://api.themoviedb.org/3/discover/movie?api_key=4688edaab044958fdfe1eb91541a0d49&sort_by=popularity.desc&page=1";

const searchUrlStart =
  "https://api.themoviedb.org/3/search/movie?api_key=4688edaab044958fdfe1eb91541a0d49&sort_by=popularity.desc&page=1&query=";

const imgUrlStart = "https://image.tmdb.org/t/p/w1280";

const searchBar = document.querySelector(".input-search");
const main = document.querySelector(".main");

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  showData(data);
}

function showData(data) {
  data.results.map((item) => {
    let imgUrlEnd = item.poster_path;
    let imgUrl = imgUrlStart + imgUrlEnd;
    let title = item.title;
    let overview = item.overview;
    let releaseDate =
      item.release_date === ""
        ? ""
        : item.release_date.split("-").reverse().join("-");
    let voteAverage = item.vote_average;
    let voteAverageClass = "green";
    if (voteAverage < 7.5) {
      voteAverageClass = "broun";
    }
    if (voteAverage < 5.1) {
      voteAverageClass = "red";
    }
    const post = `<div class="poster">
                     <img src=${imgUrl} alt="image">
                     <div class="move-info">
                       <h3>${title}</h3>
                       <div class="rate">
                         <p>${releaseDate}</p>
                         <p class="${voteAverageClass}">${voteAverage}</p>
                       </div>
                     </div>
                     <div class="description">
                       <p>${overview}</p>
                     </div>
                </div>`;
    main.insertAdjacentHTML("beforeend", post);
  });
}

function searchMoove(event) {
  if (event.key === "Enter") {
    let searchUrlEnd = searchBar.value;
    let searchUrl =
      searchUrlEnd.split(" ").join("") === ""
        ? url
        : searchUrlStart + searchUrlEnd;
    main.innerHTML = "";
    getData(searchUrl);
  }
}

getData(url);
searchBar.addEventListener("keyup", searchMoove);
