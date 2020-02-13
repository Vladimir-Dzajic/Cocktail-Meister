let apiUrl;

const searchField = document.querySelector("#search");
const element = document.querySelector("#cocktail-results");
searchField.addEventListener("keypress", makeSearchRequest);

function showSuggestions(cocktailData) {   
    document.querySelector("#suggestions").innerHTML = ""; 
    for(let i = 0; i < cocktailData.length; i++) {
        const listElement = document.createElement("li");
        const cocktailLink = document.createElement("a");
        cocktailLink.href = "cocktail-details.html?par=" + cocktailData[i].drinkId;
        let node = document.createTextNode(cocktailData[i].drinkName);
        cocktailLink.appendChild(node);
        listElement.appendChild(cocktailLink);

        const element = document.querySelector("#suggestions");
        element.appendChild(listElement);
    }
};

function makeSearchRequest() {
    searchFieldValue = document.querySelector("#search").value;
    apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchFieldValue;

    if(searchFieldValue.length >= 3) {
        fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((cocktails) => {
            let cocktailData = getCocktailData(cocktails);
            showSuggestions(cocktailData);
        });
        function getCocktailData(cocktails) {
            let cocktailData = [];

            cocktails.drinks.forEach(drink => {
                let cocktailObj = {};
                cocktailObj = {drinkName:drink.strDrink, drinkThumb:drink.strDrinkThumb, drinkId:drink.idDrink};
                cocktailData.push(cocktailObj);
            });
            return cocktailData;
        }      
    }
}







