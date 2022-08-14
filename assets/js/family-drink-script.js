var drinkCategoryEl = document.querySelector(".drink-category");
var ingredientEl = document.querySelector("#drink-list");
var outputContainterEl = document.querySelector(".output-container");
var shuffleBtnEl = document.querySelector(".drinks-btn");
var buttonContent = document.querySelector(".button-content");
var ingredientContainerEl = document.querySelector(".ing-content");


// var test2El = document.querySelector(".test")
var Punch = [12862,12890,12954,13032];
var Smoothie = [12710,12708,12712,12720,12714,12716,12718];
var Shake = [12654,12656,12658,12674];
var Coffee = [12770,12780,12782,12784];
var Chocolate = [12730,12732,12734,12736,12738,12746,12748,12750];
var Lassi = [12690,12698,12696,12692,12694];

var totalDrinks = [{name: "Punch", id: [12862,12890,12954,13032]},
{name:"Smoothie", id :[12710,12708,12712,12720,12714,12716,12718]},
{name: "Shake", id:[12654,12656,12658,12674]},
{name: "Coffee", id:Coffee},
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

// var searchDrinkIngredient = function (buttonContent) {
//     var apiUrl = "" + buttonContent
//     fetch (apiUrl)
//         .then(function(response){
//             if (!response.ok) {
//                 console.log("Failed to call API");
//             }
//             return response.json()
//         })
//         .then(function(data) {
//             console.log(data);
//             searchDrinkId(data);

//         })
//         .catch(function(error){
//             console.log("error message")
//         });

// };

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
               
                for(var i= 0; i < totalDrinks.length; i++){
                    if(buttonContent == totalDrinks[i].name){
                        var drinkArray =  totalDrinks[i].id;
                        var apiArray = data.drinks;
                        function arrayMatch(){
                            arr= [];
                        
                        for(var k = 0; k < drinkArray.length; k++){
                            for(var j=0; j < apiArray.length; j++){
                                if(drinkArray[k]==apiArray[j].idDrink){
                                    console.log("it is");
                                    arr.push(drinkArray[k]);
                                    console.log(arr);
                                    //debugger;
                                    var img = document.createElement("p");
                                    img.classList = "drink-image";
                                    img.innerHTML = "<img src='" + data.drinks[j].strDrinkThumb + "' alt='" + data.drinks[j].idDrink  + "' class='drinkImg'>";
                                    outputContainterEl.appendChild(img);
                                    console.log("haha ",document.getElementsByTagName('img')[k].getAttribute('alt'));
                                }
                            }

                            // console.log(drinkArray[i]);
                            // console.log(data.drinks[i].idDrink);
                        
                            //var idCheck = drinkArray[i].findIndex(item=>data.drinks[i].idDrink == item );
                            //console.log(idCheck);
                        }
                        return arr;
                    }
                        
                        console.log(arrayMatch(drinkArray,apiArray))
                       
                        
                    }
                } 
                document.querySelector(".drink-image").addEventListener('click', getId);
                
                
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

    
        
    
   
    // var random =  Math.floor(Math.random() * data.drinks.length) 
       
    // var drinkImg = data.drinks[random].strDrinkThumb;
    // var drinkId = data.drinks[random].idDrink;
    // console.log(drinkImg + drinkId)
    // drinkOutputEl.innerHTML = "<img src='" + drinkImg + "' alt='" + drinkId + "' class='drinkImg'>"
    // outputContainterEl.append(drinkOutputEl);
    // ingredientsContent(drinkId)

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



var displayIngredient = function(data){
    ingredientContainerEl.textContent=""
    console.log(data.drinks[0].strIngredient1)
    console.log(data.drinks[0].strMeasure1)
    var drinkImg = data.drinks[0].strDrinkThumb;
    var drinkOutputEl = document.createElement("div");
    drinkOutputEl.innerHTML = "<img src='" + drinkImg + "' alt='qwerty' class='drinkImg'>"
    var drinkName = document.createElement("li");
    drinkName.classList = "drink-name"
    drinkName.textContent = data.drinks[0].strDrink
    outputContainterEl.appendChild(drinkOutputEl);
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
    console.log(data);
}


var shuffleDrink = function (event){
    searchDrinkId(buttonContent.textContent);
    
}


function getId(event){
    var imageId = event.target.getAttribute('alt');
    console.log(imageId);

}



shuffleBtnEl.addEventListener("click", shuffleDrink);
drinkCategoryEl.addEventListener("click", drinkCategory);
ingredientEl.addEventListener("click", selectIngredient);


