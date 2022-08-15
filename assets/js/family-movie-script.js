var movieCategoryEl = document.querySelector(".movie-category");
var genreEl = document.querySelector("#genre-list");
var buttonContent2 = document.querySelector(".button-content-2");
var posterEl = document.querySelector(".poster");
var movieDescriptionEl = document.querySelector(".movie-description");
var movieContentEl = document.querySelector(".movie-content");
var shuffleBtn2El = document.querySelector(".movie-btn");
var listOfMoviesEl = document.querySelector(".list-of-movies");
var arrList = []
var genreId = ""

var movieCategory = function (event) {
    event.stopPropagation();
    movieCategoryEl.classList.toggle('is-active');
}

var selectGenre = function (event) {   
    var genre = event.target.textContent.trim();
    buttonContent2.textContent=genre;
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
            checkGenre(data.genres);
        })
        .catch(function(error){
            console.log("error message")
        });

};



var checkGenre = function(check){
    var genre = buttonContent2.textContent.trim();
    var genreCheck = check.findIndex(item=>genre===item.name);
    genreId = check[genreCheck].id;
    movieResults(genreId);
}

 var movieResults = function (genreId) {
    var apiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=93b9a9ec523abc563cc471bcb1fbab4b&sort_by=popularity.desc&with_genres=" + genreId +"&language=en&certification_country=US&certification.lte=PG&certification.gte=G&with_original_language=en";
    fetch (apiUrl)
        .then(function(response){
            if (!response.ok) {
                console.log("Failed to call API");
            }
            return response.json()
        })
        .then(function(data) {
            searchMovie(genreId, data.total_pages)
            console.log("TOTALPAGE IS: "+ data.total_pages)

        })
        .catch(function(error){
            console.log("error message")
        });

};


var searchMovie = function (genreId, totalPage) {
    var page =  Math.floor(Math.random() * 20)
    var apiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=93b9a9ec523abc563cc471bcb1fbab4b&sort_by=primary_release_date.desc&page=" + page + "&with_genres=" + genreId + "&language=en&certification_country=US&certification.lte=PG&certification.gte=G&with_original_language=en";
    fetch (apiUrl)
        .then(function(response){
            if (!response.ok) {
                console.log("Failed to call API");
            }
            return response.json()
        })
        .then(function(data) {
            arrList = []
            for (var i = 0; i < data.results.length; i++){
                if(data.results[i].poster_path){
                    arrList.push(data.results[i])
                    
                }
            }
            displayMovieOptions (arrList)

        })
        .catch(function(error){
            console.log("error message")
        });

};



var displayMovieOptions = function(data){
    console.log(data)
  listOfMoviesEl.textContent=""
    var listRange = Math.floor(Math.random () * ((data.length-5)+1))
    console.log(listRange)
    for (var i = listRange; i < listRange+5; i++){
        var images = document.createElement("img")
        images.setAttribute("src" , "https://image.tmdb.org/t/p/original"+data[i].poster_path)
        images.setAttribute("alt", data[i].id)
        images.setAttribute("style", "width: 250px")
        images.setAttribute("style", "height: 250px")
        listOfMoviesEl.appendChild(images)
    }

    

}

var displayMovie = function(event){
    listOfMoviesEl.setAttribute("style", "display:none")
    movieDescriptionEl.setAttribute("style", "display:block")
    var poster = event.target.getAttribute("alt");
    for (var i = 0; i < arrList.length; i++) {
        if (arrList[i].id==poster){
            posterEl.innerHTML = "<img src='https://image.tmdb.org/t/p/original" + arrList[i].poster_path +  "' alt= 'poster-path' class='posterImg'>"
            movieContentEl.textContent= "";
            var title = document.createElement("li");
            var overview = document.createElement("li");
            var date = document.createElement("li");
            var rating = document.createElement("li");
        
            title.textContent = arrList[i].title;
            overview.textContent = arrList[i].overview;
            date.textContent = arrList[i].release_date;
            rating.textContent = arrList[i].vote_average;
        
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
    movieDescriptionEl.setAttribute("style", "display:none")
    listOfMoviesEl.setAttribute("style", "display:block")
}

listOfMoviesEl.addEventListener("click", displayMovie)
// shuffleBtn2El.addEventListener("click",searchMovieGenre);
shuffleBtn2El.addEventListener("click", previousResults);
genreEl.addEventListener("click",selectGenre);
movieCategoryEl.addEventListener("click", movieCategory);