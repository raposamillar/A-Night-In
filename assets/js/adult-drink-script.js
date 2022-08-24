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
var notificationDrinkEl = document.querySelector(".notificationDrink");
var arrayFetch = [];
var adultDrinkStorage = [];



var drinkCategory = function (event) {
    event.stopPropagation();
    drinkCategoryEl.classList.toggle('is-active');
}


var selectIngredient = function (event) {   
    var ingredient = event.target.textContent.trim();
    buttonContent.textContent=ingredient;
    searchDrinkId(buttonContent.textContent);
}

var arrayFetch = []

var searchDrinkId = function (data) {
    notificationDrinkEl.textContent="";
    outputContainterEl.textContent="";
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + data;
    fetch (apiUrl)
            .then(function(response){
                if (!response.ok){
                    notificationDrinkEl.classList.remove("hide");
                    notificationDrinkEl.textContent = "Failed to load API, please click the shuffle button or reselect the drink again.";
                }
                return response.json()
            })
            .then(function(data){
                arrayFetch = [];
                arrayFetch.push(data.drinks);
                findDrinkId(arrayFetch); 
            })
            .catch(function(error){
                notificationDrinkEl.classList.remove("hide");
                notificationDrinkEl.textContent = "Incorrect drink option input, please try again.";
            })

        }

var findDrinkId = function (arrayFetch){
    var newArray = arrayFetch[0]
    drinkOutputEl.textContent="";
    drinkIdListEl.textContent="";
    outputContainterEl.setAttribute("style", "display:block")
    ingredientImgEl.setAttribute("style", "display:none")
    notificationDrinkEl.classList.add("hide");
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
    notificationDrinkEl.textContent="";
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId
    fetch (apiUrl)
        .then(function(response){
            if (!response.ok){
                notificationDrinkEl.classList.remove("hide");
                notificationDrinkEl.textContent = "Failed to load API, please click the shuffle button or reselect the drink again.";
            }
            return response.json()
        })
        .then(function(data){
            displayIngredient(data)
        })
        .catch(function(error){
            notificationDrinkEl.classList.remove("hide");
            notificationDrinkEl.textContent = "Cannot recognize drink ID, please try selecting the drink option again.";
        })
};



var displayIngredient = function(data){

    ingredientContainerEl.textContent=""
    ingredientContainerEl.classList.add("card")
    outputContainterEl.setAttribute("style", "display:none");
    ingredientImgEl.setAttribute("style", "display:block")
    notificationDrinkEl.classList.add("hide");
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
}


var previousDrink = function (event){
    outputContainterEl.setAttribute("style", "display:block");
    ingredientImgEl.setAttribute("style", "display:none")
    notificationDrinkEl.classList.add("hide");
    drinkOutputEl.textContent="";
    
}


function getId(event){
    var imageId = event.target.getAttribute('alt');
    if (event.target.classList.contains("drinkImg")){
        
        ingredientsContent(imageId);
        outputContainterEl.setAttribute("style", "display:none");
        
    }


}

var SaveLocalStorage = function (event){
    notificationDrinkEl.textContent = "";
    if (!posterEl.children[0]) {
        notificationDrinkEl.textContent = "please select a drink first before saving.";
        notificationDrinkEl.classList.remove("hide");
    } 
    var drinkId = drinkOutputEl.children[0].getAttribute("alt")
    var searchDrinkCheck = adultDrinkStorage.findIndex(item => drinkId == item);
    if (searchDrinkCheck == -1){
    adultDrinkStorage.push(drinkId)
    localStorage.setItem("adult-drinkId", JSON.stringify(adultDrinkStorage));
    }
}

var loadLocalStorage = function (event){
    var drinkhistory = JSON.parse(localStorage.getItem("adult-drinkId"));
    if (drinkhistory){
    adultDrinkOptionsEl.textContent="";
    var searchDrinkCheck = "";
    for (var i = 0; i < drinkhistory.length; i++){
        searchDrinkCheck = adultDrinkStorage.findIndex(item => drinkhistory[i] == item);
        loadSavedDrinks(drinkhistory[i]);
        if (searchDrinkCheck == -1){
        adultDrinkStorage.push(drinkhistory[i]);
    }}}
}

var loadSavedDrinks = function (drinkId){
    notificationDrinkEl.textContent="";
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId
    fetch (apiUrl)
        .then(function(response){
            if (!response.ok){
                notificationDrinkEl.classList.remove("hide");
                notificationDrinkEl.textContent = "Failed to load API, please refersh the page or try again later.";
            }
            return response.json()
        })
        .then(function(data){
            displaySavedDrinkOptions(data)
        })
        .catch(function(error){
            notificationDrinkEl.classList.remove("hide");
            notificationDrinkEl.textContent = "Failed to load saved content. Please try again after saving new contents.";
        })
};


var displaySavedDrinkOptions = function(data){
    notificationDrinkEl.classList.add("hide");
    ingredientImgEl.setAttribute("style", "display:none")
    outputContainterEl.setAttribute("style", "display:block")
    buttonContent.textContent ="Choose your poison"
    for (var i = 0; i < data.drinks.length; i++){
        var img = document.createElement("li");
        img.setAttribute("style", "list-style: none");
        img.classList = "drink-image column is-4-desktop is-5-tablet is-6-mobile";
        img.innerHTML = "<img src='" + data.drinks[i].strDrinkThumb + "' alt='" + data.drinks[i].idDrink  + "' class='drinkImg'>";
        adultDrinkOptionsEl.appendChild(img);
        outputContainterEl.appendChild(adultDrinkOptionsEl);
    }
   
    
}

var loadSavedDrinksId = function (event) {
    searchDrinkId(buttonContent.textContent)
}

loadLocalStorage()

backBtnEl.addEventListener("click", previousDrink);
shuffleBtnEl.addEventListener("click", loadSavedDrinksId);
drinkCategoryEl.addEventListener("click", drinkCategory);
ingredientEl.addEventListener("click", selectIngredient);
outputContainterEl.addEventListener('click', getId); 
saveButtonEl.addEventListener("click", SaveLocalStorage);
loadButtonEl.addEventListener("click", loadLocalStorage);