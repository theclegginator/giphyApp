// create topics array
let topics = ["Dogs", "Food", "Guitar", "Music", "Nintendo", "Art", "Architecture"];
let firstPull = true;
let firstClick = true;
let firstFavorite = true;
let offset = 0; 

// =======================
// create buttons in your HTML page using the topics array above. Use jQuery append method.
// =======================
function buildButtons () {
    $("#buttonArea").empty();
    for (let i = 0; i < topics.length; i++) {
        let button = $("<button>");
        $(button).attr("style", "font-family: 'Maven Pro', sans-serif; font-size: 15px;");
        $(button).attr("data-offset", offset)
        let classDetail = topics[i];
        button.addClass("gifButton"); 
        button.attr("id", `topic-${classDetail}`); // adds a dynamic class to each element with a description
        button.html(topics[i]); // Add the terms from the topics array as the text for the buttons.
        $("#buttonArea").prepend(button);
    }
}

// =======================
// Function to perform the image search for the button that was clicked. A search term is passed in as the argument.
// =======================
function imageSearch (topicSelection, offset) {
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${topicSelection}&api_key=DX5szsYMl0uUPUtcZ2X5cvsy9FG9hZ7F&limit=10&offset=${offset}`;
    // Create AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // Interact with the response data below
        .then(function(response) {
            var results = response.data; // store data request result in a variable to reference below.
            if (firstPull) {
                $("#firstPull").html("<p><h3>Click an image to animate it!</h3></p>")
                firstPull = false;
            }
            for (var i = 0; i < results.length; i++) {
                // dynamically create a new div for each topic that is searched (via click)
                var topicDiv = $("<div>");
                topicDiv.addClass("topicDiv");
                // create a paragraph element and give it the rating from the API results for that image
                var p = $("<p>").text("Rating: " + results[i].rating);
                var topicImage = $("<img>"); // create an image element
                var favoriteIcon = $("<i class='fas fa-star fa-lg'></i>");
                topicImage.attr("src", results[i].images.fixed_height_still.url); //add the image source to the img element
                topicImage.attr("alt", `${topicSelection}-GIF-${(i+1)}`); // provide some alt text
                // add a data attribute to tell us that the image is still. We will use this later.
                topicImage.attr("data-animated", "false"); 
                // append the paragraph element and image element created to the topicDiv. image first so rating goes below it.
                topicDiv.append(topicImage);
                topicDiv.append(p);
                topicDiv.append(favoriteIcon);
                topicDiv.addClass("wrapper");
                //topicDiv.attr("style", "justify-content: center;") 
                // Finally, prepend the div with the image to the gif area of the HTML.
                $("#gifArea").prepend(topicDiv);
                // Due to asynchronous behavior, want to prepend topic title only on the last iteration. 
                if (i === 9) {
                    $("#gifArea").prepend(`<h2>${topicSelection}</h2>`);
                }
              }
              offset += 10;
        });
    
}


// =======================
// Create a click event that will react to any buttons that are pressed. It will pull the topic from the button and pass into AJAX.
// ======================= 
$("#buttonArea").on("click", ".gifButton", function() {
    let topicSelection = $(this).attr("id"); // get the topic from the button ID.
    let currentOffset = parseInt($(this).attr("data-offset"));
    let offset = currentOffset + 10;
    $(this).attr("data-offset", offset);
    topicSelection = topicSelection.substring(6, topicSelection.length); // trim to just the word.
    imageSearch(topicSelection, offset);
  });

// =======================
// Create a click event that will animate the GIF
// ======================= 
$("#gifArea, #favorites").on("click", "img", function() { // Note that function calls out gifArea and favorites to spread the functionality.
    // if (firstClick) { // removes the instructional message after the user clicks the first GIF.
    //     $("#firstPull").html("");
    //     firstClick = false;
    // }
    let animated = $(this).attr("data-animated"); // get the attribute of data-animated
    let imageURL = $(this).attr("src"); // get the source URL of the GIF.
    if (animated === "false") { //if the image is not animated, we will animate it.
        // Still image URLs from giphy have "_s.gif" appended to the end. We will remove this "_s" if it is still to animate it.
        imageURL = imageURL.substring(0, imageURL.length-6) + ".gif";
        $(this).attr("src", imageURL); // insert the new, animate URL
        $(this).attr("data-animated", "true"); // now that we have animated it, change the value.
    }
    else if (animated === "true") {
        imageURL = imageURL.substring(0, imageURL.length-4) + "_s.gif";
        $(this).attr("src", imageURL);
        $(this).attr("data-animated", "false"); 
    }
  });

// =======================
// Add new GIF button based on user input.
// ======================= 
$("#textButton").on("click", function () {
    let textValue = $("#textArea").val().trim();
    if (textValue !== "") {
        topics.unshift(textValue); // add the user entry to the topics array.
        buildButtons(); // run buildButtons function again to rebuild the button list.
        $("#textArea").val(""); // clear out the text box.
    }
});

// =======================
// Clear GIFs using Button
// ======================= 
$("#clearButton").on("click", function () {
    $("#gifArea").html(""); // clear out the gif Area (does not clear out topics array in current state)
    $("#favorites").html("");
    $("#firstPull").html("");
    firstPull = true;
    firstClick = true;
});

$("#gifArea").on("click", ".fa-star", function(){ // When the user clicks a .fas class (favicon), perform this function.
    if (firstFavorite) {
        $("#favorites").prepend("<h2>Favorites</h2>");
        firstFavorite = false;
    }
    $(this).parent().clone().appendTo("#favorites"); // makes a copy of the parent element (the GIF and moves it) 
    $(this).parent().empty(); // remove the gif from here after favoriting
})
$("#favorites").on("click", ".fa-star", function(){ 
    $(this).parent().empty(); // gets rid of the favorite if you click it again
})

buildButtons(); // Run the build buttons function once upon loading the page (without an input)

// Add some logic and use trim() to ensure no blanks get turned into buttons

// Then make a function call that takes each topic in the array remakes the buttons on the page.


// *** once all the above is done, look at the optional goals.