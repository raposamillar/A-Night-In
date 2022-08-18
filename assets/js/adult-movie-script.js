var movieCategoryEl = document.querySelector(".movie-category");
var genreEl = document.querySelector("#genre-list");
var buttonContent2 = document.querySelector(".button-content-2");
var posterEl = document.querySelector(".poster");
var movieDescriptionEl = document.querySelector(".movie-description");
var movieContentEl = document.querySelector(".movie-content");
var backButtonEl = document.querySelector(".back-button");
var shuffleButtonEl = document.querySelector(".shuffle-button");
var saveButtonEl = document.querySelector(".save-button");
var loadButtonEl = document.querySelector(".load-button");
var listOfMoviesEl = document.querySelector(".list-of-movies");
var movieOutputEl = document.querySelector(".movie-output");
var movieDescriptionContainerEl = document.querySelector(".movie-description-container");
var adultMovieOptionsEl = document.querySelector("#adult-movie-options");
var arrList = [];
var genreId = "";
var adultMovieStorage = [];

var movieCategory = function (event) {
    event.stopPropagation();
    movieCategoryEl.classList.toggle('is-active');
}

var selectGenre = function (event) {   
    var genre = event.target.textContent.trim();
    buttonContent2.textContent=genre;
    searchMovieGenre(buttonContent2.textContent);
}

var searchMovieGenre = function (buttonContent2) {
    var apiUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=93b9a9ec523abc563cc471bcb1fbab4b&language=en-US"
    fetch (apiUrl)
        .then(function(response){
            if (!response.ok) {
                console.log("Failed to call API");
            }
            return response.json();
        })
        .then(function(data) {
            checkGenre(data.genres);
        })
        .catch(function(error){
            console.log("error message");
        });

};



var checkGenre = function(check){
    var genre = buttonContent2.textContent.trim();
    var genreCheck = check.findIndex(item=>genre===item.name);
    genreId = check[genreCheck].id;
    movieResults(genreId);
}

 var movieResults = function (genreId) {
    var apiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=93b9a9ec523abc563cc471bcb1fbab4b&sort_by=primary_release_date.desc&with_genres=" + genreId + "&language=en&with_original_language=en";
    fetch (apiUrl)
        .then(function(response){
            if (!response.ok) {
                console.log("Failed to call API");
            }
            return response.json();
        })
        .then(function(data) {
            searchMovie(genreId, data.total_pages);
        })
        .catch(function(error){
            console.log("error message");
        });

};


var searchMovie = function (genreId, totalPage) {
    var page =  Math.floor((Math.random() * 30)+1)
    console.log("ID: " + genreId + " total page: " + page)
    var apiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=93b9a9ec523abc563cc471bcb1fbab4b&sort_by=primary_release_date.desc&page=" + page + "&with_genres=" + genreId + "&with_original_language=en";
    fetch (apiUrl)
        .then(function(response){
            if (!response.ok) {
                console.log("Failed to call API");
            }
            return response.json();
        })
        .then(function(data) {
            arrList = [];
            for (var i = 0; i < data.results.length; i++){
                if(data.results[i].poster_path){
                    arrList.push(data.results[i]);
                }
            }
            displayMovieOptions (arrList);
        })
        .catch(function(error){
            console.log("error message");
        });

};



var displayMovieOptions = function(data){
    movieOutputEl.setAttribute("style", "display:block");
    movieDescriptionContainerEl.setAttribute("style", "display:none");
    posterEl.textContent="";
    listOfMoviesEl.textContent="";
    var listRange = Math.floor(Math.random () * (data.length-6));
    for (var i = listRange; i < listRange+6; i++){
        var images = document.createElement("img");
        images.setAttribute("src" , "https://image.tmdb.org/t/p/original"+data[i].poster_path);
        images.setAttribute("alt", data[i].id);
        images.classList = "movie-images column is-4-desktop is-5-tablet is-6-mobile";
        listOfMoviesEl.appendChild(images);
    }
}

var displayMovie = function(event){
    movieOutputEl.setAttribute("style", "display:none")
    movieDescriptionContainerEl.setAttribute("style", "display:block")
    var poster = event.target.getAttribute("alt");
    for (var i = 0; i < arrList.length; i++) {
        if (arrList[i].id==poster){
            posterEl.innerHTML = "<img src='https://image.tmdb.org/t/p/original" + arrList[i].poster_path +  "' alt='" + arrList[i].id + "' class='posterImg card-image'>"
            movieContentEl.textContent= "";
            movieContentEl.classList.add("card");
            var title = document.createElement("li");
            title.classList = "movie-title card-header-title";
            var overview = document.createElement("li");
            overview.classList = "movie-description card-content";
            var date = document.createElement("li");
            date.classList = "movie-description card-content";
            var rating = document.createElement("li");
            rating.classList = "movie-description card-content";
            title.textContent = arrList[i].title;
            overview.textContent = "Movie Description: " + arrList[i].overview;
            date.textContent = "Movie Release Date: " + arrList[i].release_date;
            rating.textContent = "Movie Rating: " + arrList[i].vote_average;
        
            if(posterEl){
                movieContentEl.appendChild(title);
                movieContentEl.appendChild(overview);
                movieContentEl.appendChild(date);
                movieContentEl.appendChild(rating);
            }
        }
    } 
}

var previousResults = function (){
    movieDescriptionContainerEl.setAttribute("style", "display:none");
    movieOutputEl.setAttribute("style", "display:block");
    posterEl.textContent="";
}


var SaveLocalStorage = function (event){
    var movieId = posterEl.children[0].getAttribute("alt")
    var searchMovieCheck = adultMovieStorage.findIndex(item => movieId == item);
    if (searchMovieCheck == -1){
    adultMovieStorage.push(movieId);
    localStorage.setItem("adult-movieId", JSON.stringify(adultMovieStorage));
    }
}

var loadLocalStorage = function (event){
    var history = JSON.parse(localStorage.getItem("adult-movieId"));
    // console.log("history is : ", history)
    listOfMoviesEl.textContent=""
    var searchMovieCheck = ""
    for (var i = 0; i < history.length; i++){
        loadSavedMovies(history[i])
        searchMovieCheck = adultMovieStorage.findIndex(item => history[i] == item);
        if (searchMovieCheck == -1){
        adultMovieStorage.push(history[i])
    }}

}

var loadSavedMovies = function (movieId){
    var apiUrl = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=93b9a9ec523abc563cc471bcb1fbab4b&language=en-US";
    fetch(apiUrl)
        .then(function(response){
            if (!response.ok){
                console.log("failed to call")
            }
            return response.json()
        })
        .then(function(data){
            displaySavedMovieOptions(data)
        })
        .catch(function(error){
            console.log("error")
        })

}

var displaySavedMovieOptions = function(data){
    // console.log(data)
    movieOutputEl.setAttribute("style", "display:block")
    movieDescriptionContainerEl.setAttribute("style", "display:none")

        var images = document.createElement("img")
        images.setAttribute("src" , "https://image.tmdb.org/t/p/original"+data.poster_path)
        images.setAttribute("alt", data.id)
        images.classList = "movie-images column is-4-desktop is-5-tablet is-6-mobile"
        images.setAttribute("style", "width: 250px")
        images.setAttribute("style", "height: 250px")
        adultMovieOptionsEl.appendChild(images);
        arrList.push(data)
}

var loadStoredData = function (){
    var history = JSON.parse(localStorage.getItem("adult-movieId"));
    if (history) {
        for (var i = 0; i < history.length; i++){
        adultMovieStorage.push(history[i])
    }}
}
loadStoredData()

listOfMoviesEl.addEventListener("click", displayMovie)
// backButtonEl.addEventListener("click",searchMovieGenre);
backButtonEl.addEventListener("click", previousResults);
shuffleButtonEl.addEventListener("click", searchMovieGenre);
genreEl.addEventListener("click",selectGenre);
movieCategoryEl.addEventListener("click", movieCategory);
saveButtonEl.addEventListener("click", SaveLocalStorage);
loadButtonEl.addEventListener("click", loadLocalStorage);