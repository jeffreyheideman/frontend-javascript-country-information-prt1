import axios from "axios";

const countryList = document.getElementById("country-list");
const errorMessage = document.getElementById("error-message")

async function fetchCountries() {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,flag,population,region")
        console.log(response.data)

        countryList.innerHTML = `<li>
        <p>${ response.data[0].name.common}</p>
        <p>Has a population of ${ response.data[0].population}</p>
        </li>`

    } catch ( e ) {
        console.error( e )
        if (e.response.status  === 404) {
            errorMessage.innerText = "Page not found | 404"
        } else if (e.response.status === 500) {
            errorMessage.innerText = "internal server error | 500"
        }
    }
}

void fetchCountries()

let color
function assignColorToCountry(region) {
    if (region === "Africa") {
        color = "blue"
    } else if (region === "Americas") {
        color = "green"
    } else if (region === "Asia") {
        color = "red"
    } else if (region === "Europe") {
        color = "yellow"
    } else if (region === "Oceania") {
        color = "purple"
    } else {
        color = "black"
    }
}

assignColorToCountry( )

