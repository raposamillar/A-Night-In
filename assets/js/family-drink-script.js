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
var arrayFetch = [];
var drinkStorage = [];


// var test2El = document.querySelector(".test")
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


// JS to toggle the dropdown menu based on click
var drinkCategory = function (event) {
    event.stopPropagation();
    drinkCategoryEl.classList.toggle('is-active');
}

// replace content within the dropdown based on what's been selected
var selectIngredient = function (event) {   
    var ingredient = event.target.textContent.trim();
    buttonContent.textContent=ingredient;
    console.log(ingredient);
    searchDrinkId(buttonContent.textContent);
    // searchDrinkIngredient(buttonContent.textContent)
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
                console.log(data)
                arrayFetch = []
                arrayFetch.push(data.drinks)
                findDrinkId(buttonContent,arrayFetch); 
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

var findDrinkId = function (buttonContent, data){
    console.log(data)
    outputContainterEl.setAttribute("style", "display:block")
    ingredientImgEl.setAttribute("style", "display:none")
    for(var i= 0; i < totalDrinks.length; i++){
        if(buttonContent == totalDrinks[i].name){
            var drinkArray =  totalDrinks[i].id;
            var apiArray = data[0];
            console.log(apiArray[3].strDrinkThumb)
            // arrayMatch()
            // function arrayMatch(){
            //     arr= [];
            for(var k = 0; k < drinkArray.length; k++){
                for(var j=0; j < apiArray.length; j++){
                    if(drinkArray[k]==apiArray[j].idDrink){
                        // console.log("it is");
                        // arr.push(drinkArray[k]);
                        var img = document.createElement("li");
                        img.setAttribute("style", "list-style: none")
                        img.classList = "drink-image";
                        img.innerHTML = "<img src='" + apiArray[j].strDrinkThumb + "' alt='" + apiArray[j].idDrink  + "' class='drinkImg'>";
                        outputContainterEl.appendChild(img);
                    }
                }
            }
            // return arr;
        }
        }
    } 
   
        
    
   
    // var random =  Math.floor(Math.random() * data.drinks.length) 
       
    // var drinkImg = data.drinks[random].strDrinkThumb;
    // var drinkId = data.drinks[random].idDrink;
    // console.log(drinkImg + drinkId)
    // drinkOutputEl.innerHTML = "<img src='" + drinkImg + "' alt='" + drinkId + "' class='drinkImg'>"
    // outputContainterEl.append(drinkOutputEl);
    // ingredientsContent(drinkId)

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
    console.log(data.drinks[0].strIngredient1)
    console.log(data.drinks[0].strMeasure1)
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
    console.log(data);
}


var previousDrink = function (event){
    outputContainterEl.setAttribute("style", "display:block");
    ingredientImgEl.setAttribute("style", "display:none")
   
    
}


function getId(event){
    var imageId = event.target.getAttribute('alt');
    console.log("myid is:" +imageId)
    if (event.target.classList.contains("drinkImg")){
        
        ingredientsContent(imageId);
        outputContainterEl.setAttribute("style", "display:none");
        // more efficient to hide the content until the user click on the back button. 
        // will need to add css style to class hide to display none
        
    }


}

var SaveLocalStorage = function (event){
    var drinkId = drinkOutputEl.children[0].getAttribute("alt")
    var searchCheck = drinkStorage.findIndex(item => drinkId == item);
    if (searchCheck == -1){
    drinkStorage.push(drinkId)
    localStorage.setItem("drinkId", JSON.stringify(drinkStorage));
    }
}

var loadLocalStorage = function (event){
    var drinkhistory = JSON.parse(localStorage.getItem("drinkId"));
    console.log("history is : ", drinkhistory)
    outputContainterEl.textContent=""
    
    for (var i = 0; i < drinkhistory.length; i++){
        loadSavedDrinks(drinkhistory[i])
        drinkStorage.push(drinkhistory[i])
    }

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
        img.classList = "drink-image";
        img.innerHTML = "<img src='" + data.drinks[i].strDrinkThumb + "' alt='" + data.drinks[i].idDrink  + "' class='drinkImg'>";
        outputContainterEl.appendChild(img);
    }
   
    
}


backBtnEl.addEventListener("click", previousDrink);
shuffleBtnEl.addEventListener("click", findDrinkId);
drinkCategoryEl.addEventListener("click", drinkCategory);
ingredientEl.addEventListener("click", selectIngredient);
outputContainterEl.addEventListener('click', getId); 
saveButtonEl.addEventListener("click", SaveLocalStorage);
loadButtonEl.addEventListener("click", loadLocalStorage);
