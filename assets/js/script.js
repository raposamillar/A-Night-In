var drinkCategoryEl = document.querySelector(".drink-category");
var ingredientEl = document.querySelector(".dropdown-content");

// var test2El = document.querySelector(".test")

// JS to toggle the dropdown menu based on click
var drinkCategory = function (event) {
    event.stopPropagation();
    drinkCategoryEl.classList.toggle('is-active');
}

// replace content within the dropdown based on what's been selected
var selectIngredient = function (event) {
    var buttonContent = document.querySelector(".button-content")
    var ingredient = event.target.textContent.trim()
    buttonContent.textContent=ingredient
    console.log(ingredient)
    searchDrinkIngredient(buttonContent.textContent)
}

var searchDrinkIngredient = function (buttonContent) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + buttonContent
    fetch (apiUrl)
        .then(function(response){
            if (!response.ok) {
                console.log("Failed to call API");
            }
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            searchDrinkId(data);
        })
        .catch(function(error){
            console.log("error message")
        });
};

var searchDrinkId = function (data) {
    
}




drinkCategoryEl.addEventListener("click", drinkCategory);
ingredientEl.addEventListener("click", selectIngredient);



// test2El.addEventListener("click", function(e) {
//     e.stopPropagation()
//     test2El.classList.toggle('is-active')
// })

