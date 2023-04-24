import axios from "axios";

const countryList = document.getElementById("country-list");
const errorMessage = document.getElementById("error-message");


function giveColorToCountry(region) {
    let className;
    switch (region) {
        case "Africa":
            className = "blue";
            break;
        case "Americas":
            className = "green";
            break;
        case "Asia":
            className = "red";
            break;
        case "Europe":
            className = "yellow";
            break;
        case "Oceania":
            className = "purple";
            break;
        default:
            className = "black";
    }
    return className;
}



async function fetchCountries() {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,flag,population,region,flags");

        response.data.sort((a, b) => a.population - b.population)

        const countryItems = response.data.map(country => {
        const countryName = country.name.common;
        const countryRegion = country.region;
        const countryColorClass = giveColorToCountry(countryRegion);
        const countryFlag = country.flags.png;
        const countryPopulation = country.population;

            return `
                <li class="country-list-item">
                    <img class="flags" src="${countryFlag}" alt="Flag of ${countryName}" width="30px">
                    <p class="${countryColorClass} country-name">${countryName}</p>
                    <p class="population">Has a population of ${countryPopulation}</p>
                </li>`;


    })

        countryList.innerHTML = countryItems.join("");

        // countryList.innerHTML = `
        //     <li>
        //         <img src="${response.data[0].flags.png}" alt="Flag of ${response.data[0].name.common}">
        //         <p class="${countryColorClass}">${countryName}</p>
        //         <p>Has a population of ${country.population}</p>
        //     </li>`;

    } catch (e) {
        console.error(e);

        // Errors communicated in the UI
        if (e.response.status === 404) {
            errorMessage.innerText = "Page not found | 404";
        } else if (e.response.status === 500) {
            errorMessage.innerText = "Internal server error | 500";
        }
    }
}

void fetchCountries();

