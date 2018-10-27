let gifManager = {
    selectedGifs: [{}],
    favoriteGifs: [{}],
    gifLimit: 10,
    /**
     * Retrievs gifs corresponding to the team the user selected
     */
    getGifs: function (limit){
        let url = "https://api.giphy.com/v1/gifs/search?q=";
        let apiKey = "&api_key=VrVNHn3sUOMfhqftGc4ZMMu8vcTrbadC"; 
        let limitParameter = "&limit=" + limit;

        $.ajax({
            url: url + nfl.userSelectedTeam + " football" + apiKey + limitParameter,
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
    /**
     * clears the list of selected gifs
     */
    clearSelectedGifs: function(){
        gifManager.selectedGifs = [{}];
    },
    /**
     * Removes the gifs from teh screen
     */
    clearGifs: function(){
        $("#gif-column").empty();
    },
    /**
     * Clears the favorites section
     */
    clearFavorites: function(){
        $(".favorites").empty();
    },
    /**
     * Downloads the Gif from the provided URL.
     */
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
    /**
     * Checks to see if the gif already exists. This is used to ensure
     * the user doesn't add an already selected gif to their
     * favorites section.
     */
    doesGifExist: function(title){
        for (let index in gifManager.selectedGifs){
            let currentGif = gifManager.selectedGifs[index];
            if(currentGif.title && currentGif.title === title){
                return true;
            }
        }
        return false;
    },
    /**
     * Displays the favorites dropdown on the screen
     * and populates the dropdown with the user's favorite
     * gifs.
     */  
    displayFavorites: function(){

        gifManager.clearFavorites();
    
        let dropDownElement = $(".dropdown-menu");
    
        for(let index in gifManager.favoriteGifs){
            let currentUrl = gifManager.favoriteGifs[index].url;
            let currentTitle = gifManager.favoriteGifs[index].title;
    
            let menuItem = $("<a>", {
                class: "dropdown-item",
                text: currentTitle, 
                href: currentUrl,
                target: "_blank",
                style: "white-space: normal;"
            })
    
            dropDownElement.append(menuItem);
        }
    },
    /**
     * Used to fade out the error section on the screen
     */
    fadeOut: function() {
        $("#error-message").fadeOut();
    },
    /**
     * Displays a card for each gif. The card contains the gif image,
     * the title of the gif, the rating of the gif and the ability to
     * interact with the gif.
     */
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

/**
 * nfl object containing the nfl teams and functions pertaining to behaviors
 * associated to the teams
 */
let nfl = {
    // this is needed because the nfl api requires the abbreviated team name
    // to be passed in during a search
    abbreviatedTeamName: "",
    // this is the team selected by the user, or entered in on the search
    userSelectedTeam: "",
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
    /**
     * Retrieves a list of teams from the nfl api
     */
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
    /**
     * Displays the logs on the screen
     */
    addLogos: function(){

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
    /**
     * Returns additional information about the user selected team
     */
    getTeamInformation: function(){
        for(let index in nfl.displayedTeams){
    
            let currentTeam = nfl.displayedTeams[index];
    
            if (!jQuery.isEmptyObject(currentTeam)){
    
                let currentTeamName = currentTeam.TeamName.toLowerCase();
        
                if(nfl.userSelectedTeam.toLowerCase().includes(currentTeamName)){
                    return currentTeam;
                }
            }
        }
    },
    /**
     * retrives news about a given team from the nfl api
     */
    getTeamNews: function(){
        $.ajax({
            url: "https://api.fantasydata.net/v3/nfl/stats/JSON/NewsByTeam/" + nfl.abbreviatedTeamName ,
            headers: { 'Ocp-Apim-Subscription-Key': '0f4c5936b24a49d4b8e7b9f6e1c6c81c' },
            success: function(result) {
                nfl.displayNews(result);
            }
        });
    },
    /**
     * clears the logos from the screen
     */
    clearLogos: function(){
        $("#gif-logo-section").empty();
    },
    /**
     * clears the news section on the screen
     */
    clearNews: function(){
        $("#team-news-column").empty();
    },
    /**
     * Displays news stories about the selected team on the screen
     */
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

    // if the favorites are in local storage they 
    // will be used to populate the list of favorites
    // otherwise the list of favorites will be blank
    if(localDb){
        gifManager.favoriteGifs = localDb;
        gifManager.displayFavorites();
    }

    // renders all of the registered logos on the screen
    nfl.addLogos();

    // gets a list of nfl teams from the nfl api
    nfl.getTeams();

    /**
     * When this button is clicked, the team entered by the 
     * user will be used to search the list of nfl teams. If
     * the team is not in the list a message will be displayed
     * indicating the team does not exist. If the team is found,
     * the team will be added to the list of teams and the team
     * logo will be displayed on the screen.
     */
    $("#search-button").on("click", function(){
        event.preventDefault();

        nfl.userSelectedTeam = $("#search-text").val();

        let team = nfl.getTeamInformation();

        if(team){
            let teamName = team.TeamName.toLowerCase();

            let userEnteredTeam = {
                team: nfl.userSelectedTeam,
                image: "assets/images/" + teamName + ".gif"
            }
            nfl.nflTeams.push(userEnteredTeam);
            gifManager.clearGifs();
            nfl.clearLogos();
            nfl.clearNews();
            nfl.addLogos();
        }
        else{
            $("#error-message").show();
            gifManager.clearGifs();
            nfl.clearNews();
            setTimeout(gifManager.fadeOut, 5000);
        }

    });

    /**
     * When this button is clicked, the selected gif(s) will be downloaded
     */
    $(document).on("click", "#download-gifs-button", function(){
        for(let index in gifManager.selectedGifs){
            let currentUrl = gifManager.selectedGifs[index].url;
            gifManager.download(currentUrl, "teams.gif");
        }

        // reset to empty array because the favorite button looks at this same list
        gifManager.clearSelectedGifs();
        $(".card-checkbox").prop('checked', false);
    });

    /**
     * When this button is clicked it will clear the favorites from local
     * storage and from the dropdown
     */
    $(document).on("click", "#clear-favorites", function(){
        gifManager.clearFavorites();
        localStorage.clear();
    });

    /**
     * When this button is clicked it will add the selected gifs
     * to local storage and display them in the 'favorites' dropdown
     */
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

    /**
     * Retrieves 10 additional gifs of the selected team every time this
     * button is clicked
     */
    $(document).on("click", "#add-gifs-button", function(){
        gifManager.getGifs(gifManager.gifLimit + 10);
    });

    /**
     * This is called whenever the user clicks one of the logos. This will
     * get the abbreviated team name from the list of teams.  It will then make two
     * ajax calls:
     * 
     * 1) The Gif service to retrieve 10 gifs.  It will pass in the abbreviated team
     *  name as one of the parameters.
     * 
     * 2) The NFL service to get the latest news for the selected team
     */
    $(document).on("click", ".logo", function(){
        nfl.userSelectedTeam = $(this).attr("data-team-name");
        let team = nfl.getTeamInformation();
        nfl.abbreviatedTeamName = team.Team;
        nfl.getTeamNews();
        gifManager.clearGifs();
        nfl.clearNews();
        gifManager.getGifs(gifManager.gifLimit);
    });
    /**
     * This function is called whenever the checkbox of a card is clicked.
     * This will store the url and title of the gif in an array (if the gif
     * does not already exist in the array).
     * 
     */
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

    /**
     * This event is called when the user clicks the home link.
     * This will hide all sections except the logo section
     */
    $(document).on("click", ".home", function(){
        gifManager.clearGifs();
        nfl.clearNews();
    });

    /**
     * This function is called when the gif if clicked. This will
     * look at the data-animation-state of the gif and switch to either
     * the still state or the animated state.
     */
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