var fav_heroes, fav_list = window.localStorage.getItem("fav_hero_list"), no_fav = document.getElementById("no-fav"), character_display = document.getElementById("display_characters"); function displayFavHeroes(e) { for (item of e) console.log(item) } function getData(e) { return new Promise(((a, t) => { fetch(e).then((e => e.json())).then((e => { a(e) })).catch((e => { t(e) })) })) } function loadCharacters(e) { let a = []; e.forEach((e => { if ("" != e) { var t = `https://api.allorigins.win/get?url=https://superheroapi.com/api/4301778239934401/${e}`; a.push(getData(t)) } })), Promise.all(a).then((e => { displayFavHeroes(e) })) } function displayFavHeroes(e) { var a; no_fav.style.display = "none"; var t = []; e.forEach((e => { var a = JSON.parse(e.contents); t.push(`<li class="hero-list-item flex" id="${a.id}"><div class="list-item-img" alt="${a.name}"><a href="./hero.html#${a.id}"><img src="${a.image.url}"></a></div><div class="detail-container valign flex space-between"><div class="list-item-details"<p class="list-item-hero-name">${a.name}</p><p class="list-item-hero-real-name">${a.biography["full-name"]}</p></div><div class="add-favorite"><img src="./images/delete_black_24dp.svg" class="delete-btn" alt="delete favorite"></div></div><div class="show_details flex halign"><a href="./hero.html#${a.id}"> Show details -></a></div></li>`) })), a = t.join(""), character_display.innerHTML = a, loadEventListeners() } function loadEventListeners() { document.querySelectorAll(".delete-btn").forEach((e => { e.addEventListener("click", (e => { e.stopPropagation(); var a = e.target.parentNode.parentNode.parentNode.getAttribute("id"); const t = fav_heroes.indexOf(a); t > -1 && (fav_heroes.splice(t, 1), document.getElementById(a).remove(), 1 == fav_heroes.length && (no_fav.style.display = "block")), window.localStorage.setItem("fav_hero_list", fav_heroes) })) })) } null == fav_list ? no_fav.style.display = "block" : (fav_heroes = fav_list.split(","), fav_heroes = [...new Set(fav_heroes)]), null == fav_list || 0 == fav_list.length ? no_fav.style.display = "block" : (no_fav.style.display = "none", loadCharacters(fav_heroes));