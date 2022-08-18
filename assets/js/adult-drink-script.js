var drinkCategoryEl = document.querySelector(".drink-category");
var ingredientEl = document.querySelector("#drink-list");
var outputContainterEl = document.querySelector(".output-container");
var backBtnEl = document.querySelector(".drink-back-btn");
var shuffleBtnEl = document.querySelector(".drink-shuffle-btn");
var buttonContent = document.querySelector(".button-content");
var ingredientContainerEl = document.querySelector(".ing-content");
var ingredientImgEl = document.querySelector(".ingredients");
var drinkIdListEl = document.querySelector(".drink-id-list");
var drinkOutputEl = document.querySelector(".drinkImgContainer");
var adultDrinkOptionsEl = document.querySelector("#adult-drink-options");
var arrayFetch = [];
var adultDrinkStorage = [];


// JS to toggle the dropdown menu based on click
var drinkCategory = function (event) {
    event.stopPropagation();
    drinkCategoryEl.classList.toggle('is-active');
}

// replace content within the dropdown based on what's been selected
var selectIngredient = function (event) {   
    var ingredient = event.target.textContent.trim();
    buttonContent.textContent=ingredient;
    // console.log(ingredient);
    searchDrinkId(buttonContent.textContent);
    // searchDrinkIngredient(buttonContent.textContent)
}

var arrayFetch = []

var searchDrinkId = function (data) {
    outputContainterEl.textContent="";
    // console.log(data)
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + data;
    fetch (apiUrl)
            .then(function(response){
                if (!response.ok){
                    console.log("API call failed")
                }
                return response.json()
            })
            .then(function(data){
                arrayFetch = [];
                arrayFetch.push(data.drinks);
                findDrinkId(arrayFetch); 
            })

        }

var findDrinkId = function (arrayFetch){
    var newArray = arrayFetch[0]
    drinkOutputEl.textContent="";
    drinkIdListEl.textContent="";
    outputContainterEl.setAttribute("style", "display:block")
    ingredientImgEl.setAttribute("style", "display:none")
    if (newArray.length <= 6) {
        for (var i = 0; i < newArray.length; i++){
            var img = document.createElement("li");
            img.setAttribute("style", "list-style: none")
            img.classList = "drink-image column is-4-desktop is-5-tablet is-6-mobile";
            img.innerHTML = "<img src='" + newArray[i].strDrinkThumb + "' alt='" + newArray[i].idDrink  + "' class='drinkImg'>";
            drinkIdListEl.appendChild(img);
            outputContainterEl.appendChild(drinkIdListEl)
        }
    } else {
        var listRange = Math.floor(Math.random () * (newArray.length-6))
        // console.log(listRange)
        for (var i = listRange; i < listRange+6; i++){
            var img = document.createElement("li");
            img.setAttribute("style", "list-style: none")
            img.classList = "drink-image column is-4-desktop is-5-tablet is-6-mobile";
            img.innerHTML = "<img src='" + newArray[i].strDrinkThumb + "' alt='" + newArray[i].idDrink  + "' class='drinkImg'>";
            drinkIdListEl.appendChild(img);
            outputContainterEl.appendChild(drinkIdListEl)
        }
    }
} 

var ingredientsContent = function (drinkId){
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



var displayIngredient = function(data){

    ingredientContainerEl.textContent=""
    ingredientContainerEl.classList.add("card")
    outputContainterEl.setAttribute("style", "display:none");
    ingredientImgEl.setAttribute("style", "display:block")
    var drinkImg = data.drinks[0].strDrinkThumb;
    drinkOutputEl.innerHTML = "<img src='" + drinkImg + "' alt='" + data.drinks[0].idDrink + "' class='drinkImg card-image'>"
    var drinkName = document.createElement("li");
    drinkName.classList = "drink-name card-header card-header-title"
    drinkName.textContent = data.drinks[0].strDrink
    ingredientImgEl.appendChild(drinkOutputEl);
    ingredientContainerEl.appendChild(drinkName)

    for (var i = 0; i < 15; i++) {
        var arry = [data.drinks[0].strIngredient1,data.drinks[0].strIngredient2,data.drinks[0].strIngredient3,data.drinks[0].strIngredient4,data.drinks[0].strIngredient6,data.drinks[0].strIngredient7,data.drinks[0].strIngredient8,data.drinks[0].strIngredient9,data.drinks[0].strIngredient10,data.drinks[0].strIngredient11,data.drinks[0].strIngredient12,data.drinks[0].strIngredient13,data.drinks[0].strIngredient14,data.drinks[0].strIngredient15];
        var arry1 = [data.drinks[0].strMeasure1,data.drinks[0].strMeasure2,data.drinks[0].strMeasure3,data.drinks[0].strMeasure4,data.drinks[0].strMeasure6,data.drinks[0].strMeasure7,data.drinks[0].strMeasure8,data.drinks[0].strMeasure9,data.drinks[0].strMeasure10,data.drinks[0].strMeasure11,data.drinks[0].strMeasure12,data.drinks[0].strMeasure13,data.drinks[0].strMeasure14,data.drinks[0].strMeasure15];
        
        if (arry[i]){
            var drinkIngredient = document.createElement("li");
            drinkIngredient.classList = "drink-ingredient card-content"
            drinkIngredient.textContent =arry1[i] + " - " + arry[i]
            ingredientContainerEl.appendChild(drinkIngredient)

        }

    }

    var drinkInstruction = document.createElement("li");
    drinkInstruction.classList = "drink-instruction card-content"
    drinkInstruction.textContent = data.drinks[0].strInstructions
    ingredientContainerEl.appendChild(drinkInstruction)
    ingredientImgEl.appendChild(ingredientContainerEl);
    // console.log(data);
}


var previousDrink = function (event){
    outputContainterEl.setAttribute("style", "display:block");
    ingredientImgEl.setAttribute("style", "display:none")
    drinkOutputEl.textContent="";
    
}


function getId(event){
    var imageId = event.target.getAttribute('alt');
    // console.log("myid is:" +imageId)
    if (event.target.classList.contains("drinkImg")){
        
        ingredientsContent(imageId);
        outputContainterEl.setAttribute("style", "display:none");
        // more efficient to hide the content until the user click on the back button. 
        // will need to add css style to class hide to display none
        
    }


}

var SaveLocalStorage = function (event){
    var drinkId = drinkOutputEl.children[0].getAttribute("alt")
    var searchDrinkCheck = adultDrinkStorage.findIndex(item => drinkId == item);
    console.log("drink check: " + searchDrinkCheck)
    if (searchDrinkCheck == -1){
        console.log("data saved")
    adultDrinkStorage.push(drinkId)
    localStorage.setItem("adult-drinkId", JSON.stringify(adultDrinkStorage));
    console.log("movie id stored: " + adultDrinkStorage)
    }
}

var loadLocalStorage = function (event){
    var drinkhistory = JSON.parse(localStorage.getItem("adult-drinkId"));
    // console.log("drink history is : ", drinkhistory)
    adultDrinkOptionsEl.textContent=""
    var searchDrinkCheck = ""
    for (var i = 0; i < drinkhistory.length; i++){
        searchDrinkCheck = adultDrinkStorage.findIndex(item => drinkhistory[i] == item);
        loadSavedDrinks(drinkhistory[i])
        if (searchDrinkCheck == -1){
        adultDrinkStorage.push(drinkhistory[i])
    }}
    console.log(adultDrinkStorage);
}

var loadSavedDrinks = function (drinkId){
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId
    fetch (apiUrl)
        .then(function(response){
            if (!response.ok){
                console.log("API call failed")
            }
            return response.json()
        })
        .then(function(data){
            displaySavedDrinkOptions(data)
        })
};


var displaySavedDrinkOptions = function(data){
    // console.log(data)
    ingredientImgEl.setAttribute("style", "display:none")
    outputContainterEl.setAttribute("style", "display:block")
    // adultDrinkOptionsEl.textContent=""
    buttonContent.textContent ="Choose your poison"
    for (var i = 0; i < data.drinks.length; i++){
        var img = document.createElement("li");
        img.setAttribute("style", "list-style: none")
        img.classList = "drink-image column is-4-desktop is-5-tablet is-6-mobile";
        img.innerHTML = "<img src='" + data.drinks[i].strDrinkThumb + "' alt='" + data.drinks[i].idDrink  + "' class='drinkImg'>";
        adultDrinkOptionsEl.appendChild(img);
        outputContainterEl.appendChild(adultDrinkOptionsEl);
    }
   
    
}

var loadSavedDrinksId = function (event) {
    searchDrinkId(buttonContent.textContent)
}

var loadStoredData = function (){
    var history = JSON.parse(localStorage.getItem("adult-drinkId"));
    if (history) {
        for (var i = 0; i < history.length; i++){
        adultDrinkStorage.push(history[i])
    }}
}

loadStoredData()

backBtnEl.addEventListener("click", previousDrink);
shuffleBtnEl.addEventListener("click", loadSavedDrinksId);
drinkCategoryEl.addEventListener("click", drinkCategory);
ingredientEl.addEventListener("click", selectIngredient);
outputContainterEl.addEventListener('click', getId); 
saveButtonEl.addEventListener("click", SaveLocalStorage);
loadButtonEl.addEventListener("click", loadLocalStorage);