var drinkCategoryEl = document.querySelector(".drink-category");
var ingredientEl = document.querySelector("#drink-list");
var outputContainterEl = document.querySelector(".output-container");
var backBtnEl = document.querySelector(".back-btn");
var shuffleBtnEl = document.querySelector(".shuffle-btn");
var buttonContent = document.querySelector(".button-content");
var ingredientContainerEl = document.querySelector(".ing-content");
var ingredientImgEl = document.querySelector(".ingredients");
var drinkIdListEl = document.querySelector(".drink-id-list");
var drinkOutputEl = document.querySelector(".drinkImgContainer");
var familyDrinkOptionsEl = document.querySelector("#family-drink-options");
var arrayFetch = [];
var familyDrinkStorage = [];


var Punch = [12862,12890,12954,13032];
var Smoothie = [12710,12708,12712,12720,12714,12716,12718];
var Shake = [12654,12656,12658,12674];
var Coffee = [12770,12780,12782,12784];
var Chocolate = [12730,12732,12734,12736,12738,12746,12748,12750];
var Lassi = [12690,12698,12696,12692,12694];

var totalDrinks = [{name: "Punch", id: Punch},
{name:"Smoothie", id: Smoothie},
{name: "Shake", id: Shake},
{name: "Coffee", id: Coffee},
{name: "Chocolate", id:Chocolate},
{name: "Lassi", id: Lassi}];


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

var searchDrinkId = function (buttonContent) {
    outputContainterEl.textContent="";

    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
    fetch (apiUrl)
            .then(function(response){
                if (!response.ok){
                    console.log("API call failed")
                }
                return response.json()
            })
            .then(function(data){
                arrayFetch = []
                arrayFetch.push(data.drinks)
                findDrinkId(buttonContent,arrayFetch); 
            })
        }

var findDrinkId = function (buttonContent, data){
    outputContainterEl.setAttribute("style", "display:block")
    ingredientImgEl.setAttribute("style", "display:none")
    drinkOutputEl.textContent="";
    familyDrinkOptionsEl.textContent=""
    for(var i= 0; i < totalDrinks.length; i++){
        if(buttonContent == totalDrinks[i].name){
            var drinkArray =  totalDrinks[i].id;
            var apiArray = data[0];
            console.log(apiArray[3].strDrinkThumb)
            for(var k = 0; k < drinkArray.length; k++){
                for(var j=0; j < apiArray.length; j++){
                    if(drinkArray[k]==apiArray[j].idDrink){
                        var img = document.createElement("li");
                        img.setAttribute("style", "list-style: none")
                        img.classList = "drink-image column is-4-desktop is-5-tablet is-6-mobile";
                        img.innerHTML = "<img src='" + apiArray[j].strDrinkThumb + "' alt='" + apiArray[j].idDrink  + "' class='drinkImg'>";
                        familyDrinkOptionsEl.appendChild(img);
                        outputContainterEl.appendChild(familyDrinkOptionsEl)
                    }
                }
            }
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
    console.log(data.drinks[0].strIngredient1)
    console.log(data.drinks[0].strMeasure1)
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
    console.log(data);
}


var previousDrink = function (event){
    outputContainterEl.setAttribute("style", "display:block");
    ingredientImgEl.setAttribute("style", "display:none")
    drinkOutputEl.textContent = ""
}


function getId(event){
    var imageId = event.target.getAttribute('alt');
    console.log("myid is:" +imageId)
    if (event.target.classList.contains("drinkImg")){
        
        ingredientsContent(imageId);
        outputContainterEl.setAttribute("style", "display:none");
    }
}

var SaveLocalStorage = function (event){
    var drinkId = drinkOutputEl.children[0].getAttribute("alt")
    var searchCheck = familyDrinkStorage.findIndex(item => drinkId == item);
    if (searchCheck == -1){
    familyDrinkStorage.push(drinkId)
    localStorage.setItem("family-drinkId", JSON.stringify(familyDrinkStorage));
    }
}

var loadLocalStorage = function (event){
    var drinkhistory = JSON.parse(localStorage.getItem("family-drinkId"));
    familyDrinkOptionsEl.textContent=""
    var searchDrinkCheck = ""
    for (var i = 0; i < drinkhistory.length; i++){
        loadSavedDrinks(drinkhistory[i])
        searchDrinkCheck = familyDrinkStorage.findIndex(item => drinkhistory[i] == item);
        if (searchDrinkCheck == -1){
        familyDrinkStorage.push(drinkhistory[i])
    }}

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
    console.log(data)
    ingredientImgEl.setAttribute("style", "display:none")
    outputContainterEl.setAttribute("style", "display:block")
    for (var i = 0; i < data.drinks.length; i++){
        var img = document.createElement("li");
        img.setAttribute("style", "list-style: none")
        img.classList = "drink-image column is-4-desktop is-5-tablet is-6-mobile";
        img.innerHTML = "<img src='" + data.drinks[i].strDrinkThumb + "' alt='" + data.drinks[i].idDrink  + "' class='drinkImg card-image'>";
        familyDrinkOptionsEl.appendChild(img)
        outputContainterEl.appendChild(familyDrinkOptionsEl);
    }
   
    
}

var loadSavedDrinksId = function (event) {
    searchDrinkId(buttonContent.textContent)
}

var loadStoredData = function (){
    var history = JSON.parse(localStorage.getItem("family-drinkId"));
    if (history) {
        for (var i = 0; i < history.length; i++){
        familyDrinkStorage.push(history[i])
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
