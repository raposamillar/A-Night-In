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
                // console.log(data)
                arrayFetch = []
                arrayFetch.push(data)
                // console.log(arrayFetch)
                findDrinkId(arrayFetch); 
            })

    
    //console.log(totalDrinks[0]);
    // console.log(buttonContent);
    //console.log(totalDrinks[0].name);
    // for(var i= 0; i < totalDrinks.length; i++){
    //     if(buttonContent == totalDrinks[i].name){
    //         console.log(totalDrinks[i].id);
            
            // var random =  Math.floor(Math.random() * totalDrinks[i].id.length) 
    
            // console.log(random);
            // ingredientsContent(totalDrinks[i].id[random]);
        
            // console.log("found it");

        }

var findDrinkId = function (arrayFetch){
    // console.log(arrayFetch)
    // console.log(arrayFetch[0].drinks)
    drinkIdListEl.textContent="";
    outputContainterEl.setAttribute("style", "display:block")
    ingredientImgEl.setAttribute("style", "display:none")
    if (arrayFetch[0].drinks.length <= 5) {
        for (var i = 0; i < arrayFetch[0].drinks.length; i++){
            var img = document.createElement("li");
            img.setAttribute("style", "list-style: none")
            img.classList = "drink-image";
            img.innerHTML = "<img src='" + arrayFetch[0].drinks[i].strDrinkThumb + "' alt='" + arrayFetch[0].drinks[i].idDrink  + "' class='drinkImg'>";
            drinkIdListEl.appendChild(img);
            outputContainterEl.appendChild(drinkIdListEl)
        }
    } else {
        var listRange = Math.floor(Math.random () * (arrayFetch[0].drinks.length-5))
        // console.log(listRange)
        for (var i = listRange; i < listRange+5; i++){
            var img = document.createElement("li");
            img.setAttribute("style", "list-style: none")
            img.classList = "drink-image";
            img.innerHTML = "<img src='" + arrayFetch[0].drinks[i].strDrinkThumb + "' alt='" + arrayFetch[0].drinks[i].idDrink  + "' class='drinkImg'>";
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
    outputContainterEl.setAttribute("style", "display:none");
    ingredientImgEl.setAttribute("style", "display:block")
    // console.log(data.drinks[0].strIngredient1)
    // console.log(data.drinks[0].strMeasure1)
    var drinkImg = data.drinks[0].strDrinkThumb;
    drinkOutputEl.innerHTML = "<img src='" + drinkImg + "' alt='" + data.drinks[0].idDrink + "' class='drinkImg'>"
    var drinkName = document.createElement("li");
    drinkName.classList = "drink-name"
    drinkName.textContent = data.drinks[0].strDrink
    ingredientImgEl.appendChild(drinkOutputEl);
    ingredientContainerEl.appendChild(drinkName)

    for (var i = 0; i < 15; i++) {
        var arry = [data.drinks[0].strIngredient1,data.drinks[0].strIngredient2,data.drinks[0].strIngredient3,data.drinks[0].strIngredient4,data.drinks[0].strIngredient6,data.drinks[0].strIngredient7,data.drinks[0].strIngredient8,data.drinks[0].strIngredient9,data.drinks[0].strIngredient10,data.drinks[0].strIngredient11,data.drinks[0].strIngredient12,data.drinks[0].strIngredient13,data.drinks[0].strIngredient14,data.drinks[0].strIngredient15];
        var arry1 = [data.drinks[0].strMeasure1,data.drinks[0].strMeasure2,data.drinks[0].strMeasure3,data.drinks[0].strMeasure4,data.drinks[0].strMeasure6,data.drinks[0].strMeasure7,data.drinks[0].strMeasure8,data.drinks[0].strMeasure9,data.drinks[0].strMeasure10,data.drinks[0].strMeasure11,data.drinks[0].strMeasure12,data.drinks[0].strMeasure13,data.drinks[0].strMeasure14,data.drinks[0].strMeasure15];
        
        if (arry[i]){
            var drinkIngredient = document.createElement("li");
            drinkIngredient.classList = "drink-ingredient"
            drinkIngredient.textContent =arry1[i] + " - " + arry[i]
            ingredientContainerEl.appendChild(drinkIngredient)

        }

    }

    var drinkInstruction = document.createElement("li");
    drinkInstruction.classList = "drink-instruction"
    drinkInstruction.textContent = data.drinks[0].strInstructions
    ingredientContainerEl.appendChild(drinkInstruction)
    ingredientImgEl.appendChild(ingredientContainerEl);
    // console.log(data);
}


var previousDrink = function (event){
    outputContainterEl.setAttribute("style", "display:block");
    ingredientImgEl.setAttribute("style", "display:none")
   
    
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
    outputContainterEl.textContent=""
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
    for (var i = 0; i < data.drinks.length; i++){
        var img = document.createElement("li");
        img.setAttribute("style", "list-style: none")
        img.classList = "drink-image";
        img.innerHTML = "<img src='" + data.drinks[i].strDrinkThumb + "' alt='" + data.drinks[i].idDrink  + "' class='drinkImg'>";
        outputContainterEl.appendChild(img);
    }
   
    
}


backBtnEl.addEventListener("click", previousDrink);
shuffleBtnEl.addEventListener("click", selectIngredient);
drinkCategoryEl.addEventListener("click", drinkCategory);
ingredientEl.addEventListener("click", selectIngredient);
outputContainterEl.addEventListener('click', getId); 
saveButtonEl.addEventListener("click", SaveLocalStorage);
loadButtonEl.addEventListener("click", loadLocalStorage);