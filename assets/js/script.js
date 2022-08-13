var drinkCategoryEl = document.querySelector(".drink-category");
var ingredientEl = document.querySelector(".dropdown-content");
var outputContainterEl = document.querySelector(".output-container");
var shuffleBtnEl = document.querySelector(".random-btn");
var buttonContent = document.querySelector(".button-content")

// var test2El = document.querySelector(".test")

// JS to toggle the dropdown menu based on click
var drinkCategory = function (event) {
    event.stopPropagation();
    drinkCategoryEl.classList.toggle('is-active');
}

// replace content within the dropdown based on what's been selected
var selectIngredient = function (event) {   
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
    outputContainterEl.textContent=""
    var drinkOutputEl = document.createElement("div");
    
    var random =  Math.floor(Math.random() * data.drinks.length) 
       
    var drinkImg = data.drinks[random].strDrinkThumb;
    var drinkId = data.drinks[random].idDrink;
    console.log(drinkImg + drinkId)
    drinkOutputEl.innerHTML = "<img src='" + drinkImg + "' alt='" + drinkId + "' class='drinkImg'>"
    outputContainterEl.append(drinkOutputEl);


}

var shuffleDrink = function (event){
    searchDrinkIngredient(buttonContent.textContent)
    
}


shuffleBtnEl.addEventListener("click", shuffleDrink);
drinkCategoryEl.addEventListener("click", drinkCategory);
ingredientEl.addEventListener("click", selectIngredient);



// test2El.addEventListener("click", function(e) {
//     e.stopPropagation()
//     test2El.classList.toggle('is-active')
// })

