// Selectors
var searchBar = document.getElementById("searchBar"), // searchbar
    clearBtn = document.getElementById("clear"), // searchbar clear button
    message = document.getElementById("not-found"), // error message when hero not found
    characterList = document.getElementById("characterList"); // display character container

let heroCharacters = []; // hero characters found after search
var characters;

// check if some ids are present in local storage
let favoriteHeroString = window.localStorage.getItem("fav_hero_list");
var favoriteHero;

// if present, make a list of ids else return empty list
favoriteHero = null === favoriteHeroString ? [] : favoriteHeroString.split(",");

// abort request if new request made subsequently
var controller = new AbortController();

// if the search string is not found
function displayNotFound() {
    (characterList.innerHTML = ""), (message.style.display = "block");
}

// display all characters found after searching the string
function displayCharacters(e) {
    // remove error message
    message.style.display = "none";

    var t = [],
        a = window.localStorage.getItem("fav_hero_list"); // get all ids from local storage
    (a = null != a ? a.split(",") : []),
        // for every element in search result
        e.forEach(function (e) {
            var r;
            // check if id is present in search result, if present display result with filled heart; if not marked as favorite before, display the card with outlined heart
            void 0 !== a.find((t) => t == e.id)
                ? ((r = `<li class="hero-list-item flex" id="${e.id}"><div class="list-item-img"><a href="./hero.html#${e.id}"><img src="${e.image.url}" alt="${e.name}"></a></div><div class="detail-container valign flex space-between"><div class="list-item-details"><p class="list-item-hero-name">${e.name}</p><p class="list-item-hero-real-name">${e.biography["full-name"]}</p></div><div class="add-favorite"><img src="./images/299063_heart_icon.svg" class="like-btn" alt="add favorite"></div></div><div class="show_details flex halign"><a href="./hero.html#${e.id}"> Show details -></a></div></li>`),
                    t.push(r))
                : ((r = `<li class="hero-list-item flex" id="${e.id}"><div class="list-item-img"><a href="./hero.html#${e.id}"><img src="${e.image.url}" alt="${e.name}"></a></div><div class="detail-container valign flex space-between"><div class="list-item-details"><p class="list-item-hero-name">${e.name}</p><p class="list-item-hero-real-name">${e.biography["full-name"]}</p></div><div class="add-favorite"><img src="./images/favorite_border_black_24dp.svg" class="like-btn" alt="add favorite"></div></div><div class="show_details flex halign"><a href="./hero.html#${e.id}"> Show details -></a></div></li>`),
                    t.push(r));
        });
    // prepare the html elements and join to form a single string
    var r = t.join("");
    characterList.innerHTML = r; // view on screen
}


// show clear button only when some thing is typed
searchBar.addEventListener("input", function () {
    "" != this.value ? (clearBtn.style.display = "block") : (clearBtn.style.display = "none");
});


// when something is entered, immediately search for the string
searchBar.addEventListener("keyup", (e) => {
    const t = e.target.value; // get target string value
    controller.abort(), // reject previous requests, if made
        (controller = new AbortController()), // for new request
        "" == t
            ? ((clearBtn.style.display = "none"), (characterList.innerHTML = "")) // if search string is empty
            : loadCharacters(t)  // else load the characters from search string
                .then((e) => {
                    "error" == (characters = JSON.parse(e.contents)).response
                        ? displayNotFound() // if characters not found, show error message
                        : (displayCharacters((heroCharacters = characters.results)), // else display the characters
                            document.querySelectorAll(".like-btn").forEach((e) => {
                                e.addEventListener("click", (e) => {  // add event listeners for add to wishlist button
                                    e.stopPropagation();
                                    var t = e.target,
                                        a = t.parentNode.parentNode.parentNode.getAttribute("id");
                                    // if liked, add the id to local storage
                                    if ("./images/favorite_border_black_24dp.svg" == t.getAttribute("src"))
                                        t.setAttribute("src", "./images/299063_heart_icon.svg"), favoriteHero.push(a), window.localStorage.setItem("fav_hero_list", favoriteHero);
                                    // else toggle the heart button and remove element from the local storage
                                    else {
                                        t.setAttribute("src", "./images/favorite_border_black_24dp.svg");
                                        const e = favoriteHero.indexOf(a);
                                        e > -1 && favoriteHero.splice(e, 1), window.localStorage.setItem("fav_hero_list", favoriteHero);
                                    }
                                });
                            }));
                })
                .catch((e) => {
                    displayNotFound(); // if err, display error message
                });
});


// when clicked, clear the text in search bar
clearBtn.addEventListener("click", function () {
    (searchBar.value = ""), (clearBtn.style.display = "none"), searchBar.focus(), (characterList.innerHTML = "");
});

// load characters and make API calls to get data
const loadCharacters = (searchString) => {
    return getHeroData(`https://api.allorigins.win/get?url=https://superheroapi.com/api/4301778239934401/search/${searchString}`)
        .then((results) => results)
        .catch((err) => {
            console.log("Character not found");
        });
};

// send request and return promise as data of 
function getHeroData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((results) => {
                resolve(results);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
