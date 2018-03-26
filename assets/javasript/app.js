'use strict'

// Variables
let gifTopicArray = ['easter', 'cinco de mayo','fourth of july', 'christmas', 'memorial day', 'valentines day', 'st.patricks day', 'mothers day', 'new years', 'thanskgiving', 'halloween'];

//Functions
    // Setup api call & what to do with response
        function displayGIF(){
            var gif = $(this).attr("data-name");
            var limit = "10";
            var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gif+"&api_key=nocYjgof9E3ZBy8HSai3guHAv44q3EjD&limit="+limit;
        
        //ajax call
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
            //check for response
                console.log(response);
            //clear existing gifs
                $('#gif-view').empty();
            // for each gif...
                for (let i = 0; i < response.data.length; i++){
                //div for gif & rating info
                    var gifDiv = $("<div class = 'gif'>");
                    
                //gif image, element to hold it & display it
                    var gifImage = response.data[i].images.fixed_width_still.url;
                    var gifAnimate = response.data[i].images.fixed_width.url;
                    var image = $(`<img gifImage ="${gifImage}" gifAnimate ="${gifAnimate}" class = "gif" gifState = "still">`).attr("src",gifImage);
                    gifDiv.append(image);
                    
                    //gif rating, element to hold it, & display it
                    var gifRating = response.data[i].rating;
                    var pRating = $("<p>").text("Rating: "+gifRating);
                    gifDiv.append(pRating);
                
                //replace current gifs
                    $('#gif-view').append(gifDiv);            
                }
            });
        }
    //display gif -- only add new buttons (no repeats)
        function gifButtons(){
            $("#buttons-view").empty();
            
        //buttons for each gif topic in array + add buttons
            for (let i = 0; i < gifTopicArray.length; i++){
                var a = $("<button>");
                a.addClass("gif-btn");
                a.attr("data-name", gifTopicArray[i]);
                a.text(gifTopicArray[i]);
                $("#buttons-view").prepend(a);
            }
        }

    //When search btn is clicked
        $("#search-gif").on("click", function(event){
            event.preventDefault();
        //grab search string + add to gifTopicArray
            var gif = $("#gif-input").val();
            gifTopicArray.push(gif);
        //display gifTopicArray buttons
            gifButtons();
        });
    
    //when gif-btn is clicked
        $(document).on("click", ".gif-btn", displayGIF);

    //when gif is clicked
        $(document).on("click", ".gif", function(){
        let state = $(this).attr("gifState");
        if (state === "still") {
            $(this).attr("src", $(this).attr("gifAnimate"));
            $(this).attr("gifState", "animate");
        } else {
            $(this).attr("src", $(this).attr("gifImage"));
            $(this).attr("gifState", "still");
            }
        });
  

    //when more-btn is clicked
        //$(document).on("click", ".more-btn", displayMore)

    //display buttons of initial gifTopicArray
        gifButtons();