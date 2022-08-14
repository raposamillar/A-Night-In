var movieCategoryEl = document.querySelector(".movie-category");
var genreEl = document.querySelector("#genre-list");
var buttonContent2 = document.querySelector(".button-content-2");
var posterEl = document.querySelector(".poster");
var movieDescriptionEl = document.querySelector(".movie-description");
var movieContentEl = document.querySelector(".movie-content");
var shuffleBtn2El = document.querySelector(".movie-btn");


var movieCategory = function (event) {
    event.stopPropagation();
    movieCategoryEl.classList.toggle('is-active');
}

var selectGenre = function (event) {   
    var genre = event.target.textContent.trim();
    buttonContent2.textContent=genre;
    console.log(genre);
    searchMovieGenre(buttonContent2.textContent)
}

var searchMovieGenre = function (buttonContent2) {
    var apiUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=93b9a9ec523abc563cc471bcb1fbab4b&language=en-US"
    fetch (apiUrl)
        .then(function(response){
            if (!response.ok) {
                console.log("Failed to call API");
            }
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            // var check = data.genres;
            checkGenre(data.genres);
            //searchDrinkId(data);

        })
        .catch(function(error){
            console.log("error message")
        });

};

var genreId = ""

var checkGenre = function(check){
    var genre = buttonContent2.textContent.trim();
    var genreCheck = check.findIndex(item=>genre===item.name);
    // console.log(genreCheck);
    console.log(check[genreCheck].id);
    genreId = check[genreCheck].id;
    movieResults(genreId);
}

 var movieResults = function (genreId) {
    var apiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=93b9a9ec523abc563cc471bcb1fbab4b&sort_by=popularity.desc&with_genres=" + genreId +"&language=en&certification_country=US&certification.lte=PG";
    fetch (apiUrl)
        .then(function(response){
            if (!response.ok) {
                console.log("Failed to call API");
            }
            return response.json()
        })
        .then(function(data) {
            // console.log("it worked")
            searchMovie(genreId, data.total_pages)
            console.log("TOTALPAGE IS: "+ data.total_pages)

        })
        .catch(function(error){
            console.log("error message")
        });

};


var searchMovie = function (genreId, rand) {
    console.log("genreid is: "+genreId)
    console.log("rand number is :" +rand)
    var random1 =  Math.floor(Math.random() * rand)
    console.log(random1)
    var apiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=93b9a9ec523abc563cc471bcb1fbab4b&sort_by=popularity.desc&page=" + random1 + "&with_genres=" + genreId + "&language=en&certification_country=US&certification.lte=PG";
    fetch (apiUrl)
        .then(function(response){
            if (!response.ok) {
                console.log("Failed to call API");
            }
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            var random =  Math.floor(Math.random() * data.results.length) ;
            console.log(random);
            // console.log(data.results[random].title);
            displayMovie(data.results[random]);

        })
        .catch(function(error){
            console.log("error message")
        });

};





var displayMovie = function(data){
 
    
    console.log("data is",data);
    // add if statments to check if poster is null.
    posterEl.innerHTML = "<img src='https://image.tmdb.org/t/p/original" + data.poster_path +  "' alt= 'poster-path' class='posterImg'>"
    movieContentEl.textContent= "";
    var title = document.createElement("li");
    var overview = document.createElement("li");
    var date = document.createElement("li");
    var rating = document.createElement("li");

    title.textContent = data.title;
    overview.textContent = data.overview;
    date.textContent = data.release_date;
    rating.textContent = data.vote_average;

    if(posterEl){
        movieContentEl.appendChild(title);
        movieContentEl.appendChild(overview);
        movieContentEl.appendChild(date);
        movieContentEl.appendChild(rating);
    }
  
    
}


shuffleBtn2El.addEventListener("click",searchMovieGenre);



genreEl.addEventListener("click",selectGenre);

movieCategoryEl.addEventListener("click", movieCategory);