// get the id of the requested hero from url
const id = window.location.href.split("#")[1];

// select the error message and hero content area
var error_msg = document.getElementById("error-message"),
    hero_content = document.getElementById("character_result");

// get hero data from id using fetch request
function getHeroData(url) {
    return new Promise(((resolve, reject) => {
        fetch(url)
            .then((res => res.json()))
            .then((results => { resolve(results) }))
            .catch((err => { reject(err) }))
    }))
}


// prepare url and send request to get hero data
function loadHero(id) {
    var results;
    "" != id && (results = getHeroData(`https://api.allorigins.win/get?url=https://superheroapi.com/api/4301778239934401/${id}`));
    return results.then((res => res)).catch((err => { console.log("Hero not found") }))
}


// display hero details
function displayHeroDetail(hero_data) {
    var a = JSON.parse(hero_data.contents),
        html_to_add = `<div class="flex space-between heading valign">\n <h1>${a.name}</h1>\n <div class="flex menu_link">\n <a href="./favorites.html" class="flex valign">\n <img src="./images/favorite_white_24dp.svg" alt="favorites" id="favorite-btn">\n </a>\n <a href="./home.html" class="flex valign">\n <img src="./images/home_white_24dp.svg" alt="homepage" id="home-btn">\n </a>\n </div>\n\n</div>\n<div class="hero_container">\n <div class="top_area flex">\n <div class="top-area-left">\n <img src=${a.image.url} alt="${a.name}">\n </div>\n <div class="top-area-right">\n <div class="section-heading">\n Powerstats\n </div>\n <div class="stats">\n <div class="stat-property flex space-between">\n Intelligence<span>${a.powerstats.intelligence}</span>\n </div>\n <div class="stat-value">\n <div id="intelligence" class="stat-range"></div>\n </div>\n </div>\n <div class="stats">\n <div class="stat-property flex space-between">\n Strength<span>${a.powerstats.strength}</span>\n </div>\n <div class="stat-value">\n <div id="strength" class="stat-range"></div>\n </div>\n </div>\n <div class="stats">\n <div class="stat-property flex space-between">Speed<span>${a.powerstats.speed}</span>\n </div>\n <div class="stat-value">\n <div id="speed" class="stat-range"></div>\n </div>\n </div>\n <div class="stats">\n <div class="stat-property flex space-between">\n Durability<span>${a.powerstats.durability}</span></div>\n <div class="stat-value">\n <div id="durability" class="stat-range"></div>\n </div>\n </div>\n <div class="stats">\n <div class="stat-property flex space-between">Power<span>${a.powerstats.power}</span>\n </div>\n <div class="stat-value">\n <div id="power" class="stat-range"></div>\n </div>\n </div>\n <div class="stats">\n <div class="stat-property flex space-between">Combat<span>${a.powerstats.combat}</span>\n </div>\n <div class="stat-value">\n <div id="combat" class="stat-range"></div>\n </div>\n </div>\n </div>\n </div>\n <div class="bottom-area flex">\n <div class="appearance">\n <div class="section-heading">Appearance</div>\n <div class="card-feature flex halign">\n <div class="left-feature">\n <div class="feature">Gender</div>\n <div class="feature-value">${a.appearance.gender}</div>\n <div class="feature">Eye-color</div>\n <div class="feature-value">${a.appearance["eye-color"]}</div>\n <div class="feature">Race</div>\n <div class="feature-value">${a.appearance.race}</div>\n </div>\n <div class="right-feature">\n <div class="feature">Height</div>\n <div class="feature-value">${a.appearance.height ? a.appearance.height[1] : " "}</div>\n <div class="feature">Hair-color</div>\n <div class="feature-value">${a.appearance["hair-color"]}</div>\n <div class="feature">Weight</div>\n <div class="feature-value">${a.appearance.weight ? a.appearance.weight[1] : " "}</div>\n </div>\n </div>\n </div>\n <div class="biography">\n <div class="section-heading">Biography</div>\n <div class="card-feature flex halign">\n <div class="left-feature">\n <div class="feature">Full Name</div>\n <div class="feature-value">${a.biography["full-name"]}</div>\n <div class="feature">Birth Place</div>\n <div class="feature-value">${a.biography["place-of-birth"]}</div>\n <div class="feature">Alignment</div>\n <div class="feature-value">${a.biography.alignment}</div>\n </div>\n <div class="right-feature">\n <div class="feature">Publisher</div>\n <div class="feature-value">${a.biography.publisher}</div>\n <div class="feature">First Appearance</div>\n <div class="feature-value">${a.biography["first-appearance"]}</div>\n </div>\n </div>\n </div>\n <div class="work">\n <div class="section-heading">Work</div>\n <div class="card-feature flex halign">\n <div class="left-feature">\n <div class="feature">Base</div>\n <div class="feature-value">${a.work.base}</div>\n </div>\n <div class="right-feature">\n <div class="feature">Occupation</div>\n <div class="feature-value">\n ${a.work.occupation}\n </div>\n </div>\n </div>\n </div>\n </div>\n</div>`;
    hero_content.innerHTML = html_to_add;
}


// update the powerstats by showing indicators for each value
function updateStats() {
    document.querySelectorAll(".stats").forEach((item => {
        var percentage = item.firstElementChild.firstElementChild.textContent;
        item.lastElementChild.firstElementChild.style.width = percentage + "%"
    }))
}

// check if if is valid, if valid, call loadHero and receivehero details. Then, display the details; otherwise display error message
void 0 === id || "" == id ? error_msg.style.display = "block" : loadHero(id).then((function (e) { displayHeroDetail(e), updateStats() }));