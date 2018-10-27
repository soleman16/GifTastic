let gifManager = {
    selectedGifs: [{}],
    favoriteGifs: [{}],
    gifLimit: 10,
    getGifs: function (userSearch, limit){
        let url = "https://api.giphy.com/v1/gifs/search?q=";
        let apiKey = "&api_key=VrVNHn3sUOMfhqftGc4ZMMu8vcTrbadC"; 
        let limitParameter = "&limit=" + limit;

        $.ajax({
            url: url + userSearch + " football" + apiKey + limitParameter,
            success: function(result) {
                gifManager.clearGifs();
                for(var index in result.data){
                    let currentGif = result.data[index];
                    let title = currentGif.title;
                    let rating = currentGif.rating;
                    let stillUrl = currentGif.images["fixed_height_still"].url;
                    let animationUrl = currentGif.images["fixed_height"].url;
                    gifManager.createGifCard(rating, animationUrl, stillUrl, title, index);
                }
            }
        });
    },
    clearSelectedGifs: function(){
        gifManager.selectedGifs = [{}];
    },
    clearGifs: function(){
        $("#gif-column").empty();
    },
    clearFavorites: function(){
        $(".favorites").empty();
    },
    download: function(url, fileName){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onload = function(){
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = imageUrl;
            tag.download = fileName;
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        }
        xhr.send();
    },
    doesGifExist: function(title){

        for (let index in gifManager.selectedGifs){
            let currentGif = gifManager.selectedGifs[index];
            if(currentGif.title && currentGif.title === title){
                return true;
            }
        }
    
        return false;
    },
    clearDropDown: function(){
        $(".dropdown-menu").empty();
    },  
    displayFavorites: function(){

        gifManager.clearDropDown();
    
        let dropDownElement = $(".dropdown-menu");
    
        for(let index in gifManager.favoriteGifs){
            let currentUrl = gifManager.favoriteGifs[index].url;
            let currentTitle = gifManager.favoriteGifs[index].title;
    
            let menuItem = $("<a>", {
                class: "dropdown-item",
                text: currentTitle, 
                href: currentUrl,
                target: "_blank"
            })
    
            dropDownElement.append(menuItem);
        }
    },
    fadeOut: function() {
        $("#error-message").fadeOut();
    },
    createGifCard: function(rating, animationUrl, stillUrl, title){

        let gifColumnDiv = $("#gif-column");
    
        let card = $("<div>" , {
            class: "card border-secondary mb-3 mr-5 d-inline-block",
            style: "max-width: 200px; height: 300px",
        });
        let cardHeader = $("<div>" , {
            class: "card-header text-center",
            text: "Rating: " + rating.toUpperCase()
        });
        let cardBody = $("<div>" , {
            class: "card-body text-secondary flex-column d-flex h-25"
        });
        let cardTitle = $("<h5>" , {
            class: "card-title",
            text: title,
            style: "font-size: 12px;"
        });
        let cardImage = $("<img>", {
            class: "img-responsive team-image",
            src: stillUrl,
            style: "width: 198px; height: 120px",
            "data-animation-state": "still",
            "data-animation-url": animationUrl,
            "data-still-url": stillUrl,
        })
        let cardCheckbox = $('<input>', {
            class: "card-checkbox",
            type: 'checkbox',
            "data-gif-url": animationUrl,
            "data-gif-title": title
        });
    
        let cardFooter = $("<div>", {
            class: "card-footer bg-transparent border-secondary text-center py-3"
        })
    
        cardBody.append(cardTitle)
        cardFooter.append(cardCheckbox);
        card.append(cardHeader, cardImage, cardBody, cardFooter);
        gifColumnDiv.append(card);
    }
}

let nfl = {
    abbreviatedTeamName: "",
    displayedTeams: [{}],
    nflTeams: 
        [{
            team: "Arizona Cardinals",
            image: "assets/images/cardinals.gif"
        },
        {
            team: "Atlanta Falcons",
            image: "assets/images/falcons.gif"
        },
        {
            team: "Baltimore Ravens",
            image: "assets/images/ravens.gif"
        },
        {
            team: "Buffalo Bills",
            image: "assets/images/bills.gif"
        },
        {
            team: "Carolina Panthers", 
            image: "assets/images/panthers.gif"
        },
        {
            team: "Chicago Bears",
            image: "assets/images/bears.gif"
        },
        {
            team: "Cinncinati Bengals", 
            image: "assets/images/bengals.gif"
        },
        {
            team: "Cleveland Browns",
            image: "assets/images/browns.gif"
        },
        {
            team: "Dallas Cowboys",
            image: "assets/images/cowboys.gif"
        },
        {
            team: "Denver Broncos",
            image: "assets/images/broncos.gif"
        },
        {
            team: "Detroit Lions",
            image: "assets/images/lions.gif"
        },
        {
            team: "Green Bay Packers",
            image: "assets/images/packers.gif"
        }],
    getTeams: function(){
        $.ajax({
            url: "https://api.fantasydata.net/v3/nfl/stats/JSON/TeamSeasonStats/2018",
            headers: { 'Ocp-Apim-Subscription-Key': '0f4c5936b24a49d4b8e7b9f6e1c6c81c' },
            success: function(result) {
                for(let index in result){
                    let currentTeam = result[index];
                    nfl.displayedTeams.push(currentTeam);
                }
            }
        });
    },
    addLogos: function(nflTeams){

        for(let index in nfl.nflTeams){
    
            let image = nfl.nflTeams[index].image;
            let team = nfl.nflTeams[index].team;
    
            let gifLogoSectionDiv = $("#gif-logo-section");
    
            let teamImage = $("<img>", {
                class: "rounded m-5 d-block logo",
                style: "height: 75px; width: 100px",
                src: image,
                "data-team-name": team
            });
    
            gifLogoSectionDiv.append(teamImage);
        }
    },
    getTeamInformation: function(teamName){
        for(let index in nfl.displayedTeams){
    
            let currentTeam = nfl.displayedTeams[index];
    
            if (!jQuery.isEmptyObject(currentTeam)){
    
                let currentTeamName = currentTeam.TeamName.toLowerCase();
        
                if(teamName.toLowerCase().includes(currentTeamName)){
                    return currentTeam;
                }
            }
        }
    },
    getTeamNews: function(){
        $.ajax({
            url: "https://api.fantasydata.net/v3/nfl/stats/JSON/NewsByTeam/" + nfl.abbreviatedTeamName ,
            headers: { 'Ocp-Apim-Subscription-Key': '0f4c5936b24a49d4b8e7b9f6e1c6c81c' },
            success: function(result) {
                nfl.displayNews(result);
            }
        });
    },
    clearLogos: function(){
        $("#gif-logo-section").empty();
    },
    clearNews: function(){
        $("#team-news-column").empty();
    },
    displayNews: function(news){
        let teamNewsDiv = $("#team-news-column");
    
        for(let index in news){
    
            let currentNewsItem = news[index];
    
            let headerElement = $("<h5>", {
                class: "text-muted",
                text: currentNewsItem.Title
            })
        
            let timeAgoElement = $("<p>", {
                text: currentNewsItem.TimeAgo
            })
    
            let contentElement = $("<p>", {
                text: currentNewsItem.Content
            })
        
            teamNewsDiv.append(headerElement, timeAgoElement, contentElement); 
        }
    }
}

/************************************* Start GifTastic ***************************************************/

$(document).ready(function(){

    // Retrieve the object from storage
    let localDb = JSON.parse(localStorage.getItem('favorites'));

    if(localDb){
        gifManager.favoriteGifs = localDb;
        gifManager.displayFavorites();
    }

    nfl.addLogos(nfl.nflTeams);

    nfl.getTeams();

    $("#search-button").on("click", function(){
        event.preventDefault();

        let userSearch = $("#search-text").val();

        let team = nfl.getTeamInformation(userSearch);

        if(team){
            let teamName = team.TeamName.toLowerCase();

            let userEnteredTeam = {
                team: userSearch,
                image: "assets/images/" + teamName + ".gif"
            }
            nfl.nflTeams.push(userEnteredTeam);
            gifManager.clearGifs();
            nfl.clearLogos();
            nfl.clearNews();
            nfl.addLogos(nfl.nflTeams);
        }
        else{
            $("#error-message").show();
            gifManager.clearGifs();
            nfl.clearNews();
            setTimeout(gifManager.fadeOut, 5000);
        }

    });

    $(document).on("click", "#download-gifs-button", function(){
        for(let index in gifManager.selectedGifs){
            let currentUrl = gifManager.selectedGifs[index].url;
            gifManager.download(currentUrl, "teams.gif");
        }

        // reset to empty array because the favorite button looks at this same list
        gifManager.clearSelectedGifs();
        $(".card-checkbox").prop('checked', false);
    });

    $(document).on("click", "#clear-favorites", function(){
        gifManager.clearFavorites();
        localStorage.clear();
    });

    $(document).on("click", "#favorite-gifs-button", function(){

        for(let index in gifManager.selectedGifs){
            let currentGif = gifManager.selectedGifs[index];
            gifManager.favoriteGifs.push(currentGif);
        }

        gifManager.clearSelectedGifs();
        gifManager.displayFavorites();

        $(".card-checkbox").prop('checked', false);
       
        // Put the object into storage
        localStorage.setItem('favorites', JSON.stringify(gifManager.favoriteGifs));
    });

    $(document).on("click", "#add-gifs-button", function(){
        gifManager.getGifs(nfl.abbreviatedTeamName, gifManager.gifLimit + 10);
    });

    // user clicks one of the logos with the logos
    $(document).on("click", ".logo", function(){
        let userSearch = $(this).attr("data-team-name");
        let team = nfl.getTeamInformation(userSearch);
        nfl.abbreviatedTeamName = team.Team;
        nfl.getTeamNews();
        gifManager.clearGifs();
        nfl.clearNews();
        gifManager.getGifs(userSearch, gifManager.gifLimit);
    });

    $(document).on("click", ".card-checkbox", function(){
        let userSelectedGifUrl = $(this).attr("data-gif-url");
        let userSelectedGifTitle = $(this).attr("data-gif-title");

        let selectedGif = {
            title: userSelectedGifTitle, 
            url: userSelectedGifUrl
        }

        if(!gifManager.doesGifExist()){
            gifManager.selectedGifs.push(selectedGif);
        } 
    });

    // user clicks one of the logos with the logos
    $(document).on("click", ".home", function(){
        gifManager.clearGifs();
        nfl.clearNews();
    });

    // one of the gifs
    $(document).on("click", ".team-image", function(){
        let selectedImageState = $(this).attr("data-animation-state");

        if(selectedImageState === "still"){
            let animationUrl = $(this).attr("data-animation-url");
            $(this).attr("src", animationUrl);
            $(this).attr("data-animation-state", "animated");
        }
        else{
            let stillUrl = $(this).attr("data-still-url");
            $(this).attr("src", stillUrl);
            $(this).attr("data-animation-state", "still");
        }
    });
});

/************************************* Start GifTastic ***************************************************/