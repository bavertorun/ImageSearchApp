/*
 *
 * Coded by Baver Torun
 * https://github.com/bavertorun
 *  
 */
// https://unsplash.com/developers Api Key
const accessKey = "YOUR_APİ_KEY"

const formEl = document.querySelector("form")
const inputEl = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-button")
const searchResults = document.querySelector(".search-results")
const showMoreBtn = document.querySelector("#show-more-button")

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const response = await fetch(url)
    const data = await response.json()
    const results = data.results

    if (page === 1) {
        searchResults.innerHTML = ""
    }
    results.map((result) => {
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)


        page++

        if (page > 1) {
            showMoreBtn.style.display = "block"
        }
    })

}

formEl.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1
    searchImages()
})
showMoreBtn.addEventListener("click", () => {
    searchImages()
})

