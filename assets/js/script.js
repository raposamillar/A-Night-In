var drinkCategoryEl = document.querySelector(".drink-category");
var ingredientEl = document.querySelector(".dropdown-content");
var outputContainterEl = document.querySelector(".output-container");
var shuffleBtnEl = document.querySelector(".random-btn");
var buttonContent = document.querySelector(".button-content");
var ingredientContainerEl = document.querySelector(".ing-content");

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
    ingredientsContent(drinkId)

    function ingredientsContent (drinkId){
        var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId
        fetch (apiUrl)
            .then(function(response){
                if (!response.ok){
                    console.log("API call failed")
                }
                return response.json()
            })
            .then(function(data){
                displayIngredient(data)
            })
    };

}

var displayIngredient = function(data){
    ingredientContainerEl.textContent=""
    console.log(data.drinks[0].strIngredient1)
    console.log(data.drinks[0].strMeasure1)
    var drinkName = document.createElement("li");
    drinkName.classList = "drink-name"
    drinkName.textContent = data.drinks[0].strDrink
    var drinkType = document.createElement("li");
    drinkType.classList = "drink-type"
    drinkType.textContent = data.drinks[0].strAlcoholic
    ingredientContainerEl.appendChild(drinkName, drinkType)
    ingredientContainerEl.appendChild(drinkType)

    for (var i = 0; i < 15; i++) {
        var arry = [data.drinks[0].strIngredient1,data.drinks[0].strIngredient2,data.drinks[0].strIngredient3,data.drinks[0].strIngredient4,data.drinks[0].strIngredient6,data.drinks[0].strIngredient7,data.drinks[0].strIngredient8,data.drinks[0].strIngredient9,data.drinks[0].strIngredient10,data.drinks[0].strIngredient11,data.drinks[0].strIngredient12,data.drinks[0].strIngredient13,data.drinks[0].strIngredient14,data.drinks[0].strIngredient15];
        var arry1 = [data.drinks[0].strMeasure1,data.drinks[0].strMeasure2,data.drinks[0].strMeasure3,data.drinks[0].strMeasure4,data.drinks[0].strMeasure6,data.drinks[0].strMeasure7,data.drinks[0].strMeasure8,data.drinks[0].strMeasure9,data.drinks[0].strMeasure10,data.drinks[0].strMeasure11,data.drinks[0].strMeasure12,data.drinks[0].strMeasure13,data.drinks[0].strMeasure14,data.drinks[0].strMeasure15];
        
        if (arry1[i]){
            var drinkMeasure = document.createElement("li");
            drinkMeasure.classList = "drink-measure"
            drinkMeasure.textContent = "Measure: " + arry1[i]
            ingredientContainerEl.appendChild(drinkMeasure)
        }
        if (arry[i]){
            var drinkIngredient = document.createElement("li");
            drinkIngredient.classList = "drink-ingredient"
            drinkIngredient.textContent = "Ingredient: " + arry[i]
            ingredientContainerEl.appendChild(drinkIngredient)

        }
    

    }
    console.log(data)
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

