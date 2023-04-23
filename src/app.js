import axios from "axios";

const countryList = document.getElementById("country-list");
const errorMessage = document.getElementById("error-message")

async function fetchCountries() {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,flag,population,region")
        console.log(response.data)

        countryList.innerHTML = `${ response.data[0]}`

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