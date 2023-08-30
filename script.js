let countriesData;


console.log("Testing, testing, 1 2 3 ...")

// fetch data from API
const fetchCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const jsonData = await response.json();
    return jsonData;
}
// set up function

const setUp = async () => {
    countriesData = await fetchCountries();
    fillCountriesList(countriesData);
}

function fillCountriesList(jsonData) {
    const countriesList = document.getElementById("countriesList");
    countriesList.innerHTML = "";

    jsonData.forEach(country => {
        const countryName = country.name.common;
        const countryPopulation = country.population;

        const countryLi = document.createElement('li');
        countryLi.textContent = `${countryName} - Population: ${countryPopulation}`;
        countriesList.appendChild(countryLi);

    });
}

// form submission

function formSubmit(event) {
    event.preventDefault();
    const searchInput = document.getElementById("searchInput");
    const searchText = searchInput.value.toLowerCase();
    filterCountries(searchText);
}
// filtered countries
function filterCountries(searchText) {
    const filteredCountries = countriesData.filter(country => {
        const countryName = country.name.common.toLowerCase();
        return countryName.includes(searchText);
    });
    fillCountriesList(filteredCountries);
}

// event listener

const form = document.getElementById("searchForm");
form.addEventListener("submit", formSubmit);

window.onload = setUp;
