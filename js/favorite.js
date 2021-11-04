var fav_heroes, // variable to store favorite heroes
    fav_list = window.localStorage.getItem("fav_hero_list"),  // variable to store local storage
    no_fav = document.getElementById("no-fav"), // error message selector
    character_display = document.getElementById("display_characters"); // favorite character display


// get data of requested id from url
function getData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
}


// take all liked characters from localStorage and load their data from their IDs
function loadCharacters(hero_ids) {
    let results = [];
    hero_ids.forEach((id) => {
        if ("" != id) {
            results.push(getData(`https://api.allorigins.win/get?url=https://superheroapi.com/api/4301778239934401/${id}`));
        }
    }),
        Promise.all(results).then((res) => {
            displayFavHeroes(res);
        });
}

// after loading all data in an array, display each character
function displayFavHeroes(hero_data) {
    var data;
    no_fav.style.display = "none";
    var html_list = [];
    hero_data.forEach((item) => {
        var data = JSON.parse(item.contents);
        html_list.push(
            `<li class="hero-list-item flex" id="${data.id}"><div class="list-item-img" alt="${data.name}"><a href="./hero.html#${data.id}"><img src="${data.image.url}"></a></div><div class="detail-container valign flex space-between"><div class="list-item-details"<p class="list-item-hero-name">${data.name}</p><p class="list-item-hero-real-name">${data.biography["full-name"]}</p></div><div class="add-favorite"><img src="./images/delete_black_24dp.svg" class="delete-btn" alt="delete favorite"></div></div><div class="show_details flex halign"><a href="./hero.html#${data.id}"> Show details -></a></div></li>`
        );
    });
    var html_to_be_added = html_list.join("");
    character_display.innerHTML = html_to_be_added;

    // after displaying DOM, add addEventListener for delete button
    loadEventListeners();
}


// After displaying fav heroes, add event listeners to their associated delete button 
function loadEventListeners() {
    document.querySelectorAll(".delete-btn").forEach((item) => {
        item.addEventListener("click", (event) => {
            event.stopPropagation();
            var target_id = event.target.parentNode.parentNode.parentNode.getAttribute("id");
            const index = fav_heroes.indexOf(target_id);
            if (-1 < index) {
                if ((fav_heroes.splice(index, 1), document.getElementById(target_id).remove(), 0 == fav_heroes.length)) no_fav.style.display = "block";
                else if (1 == fav_heroes.length) {
                    var d = fav_heroes[0];
                    "" == d && (no_fav.style.display = "block");
                }
                window.localStorage.setItem("fav_hero_list", fav_heroes);
            }
        });
    });
}

// when the page loads, take the list of ids stored in local storage in form of key-value pair, value is list of hero-ids. make it unique and make requests for all ids
null == fav_list ? (no_fav.style.display = "block") : ((fav_heroes = fav_list.split(",")), (fav_heroes = [...new Set(fav_heroes)])),
    null == fav_list || 0 == fav_list.length ? (no_fav.style.display = "block") : ((no_fav.style.display = "none"), loadCharacters(fav_heroes));
