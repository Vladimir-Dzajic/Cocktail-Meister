const urlParams = new URLSearchParams(window.location.search);
const selectedParameter = urlParams.get('par');
makeSearchRequestIngredients();

function showSearchResults(cocktailData) {
    for(let i = 0; i < cocktailData.length; i++) {
        const para = document.createElement("p");
        const cocktailLink = document.createElement("a");
        const img = document.createElement("img");
        img.src = cocktailData[i].drinkThumb + "/preview";
        let node = document.createTextNode(cocktailData[i].drinkName);
        cocktailLink.href = "cocktail-details.html?par=" + cocktailData[i].drinkId;
        cocktailLink.appendChild(img);
        cocktailLink.appendChild(node);
        para.appendChild(cocktailLink);

        const element = document.querySelector("#category-result");
        element.appendChild(para);
        }
} 

function makeSearchRequestIngredients() {
    if(selectedParameter == "vodka" || selectedParameter == "tequila" ||  selectedParameter == "whiskey" || selectedParameter == "rum" || selectedParameter == "gin") {
    apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + selectedParameter;
    } else {
        apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + selectedParameter;
    } 
    //erst nach dem die Daten vom Server eingetroffen sind, starte die Anzeige
    fetch(apiUrl)
    .then((response) => {
        return response.json();
    })
    .then((cocktails) => {
        let cocktailData = getCocktailData(cocktails);
        showSearchResults(cocktailData);
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
