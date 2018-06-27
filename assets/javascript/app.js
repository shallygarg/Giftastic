console.log("hi");

var animals = ["dog", "cat", "rabbit", "hamster", "goldfish", "bird", "turtle"];

renderButtons();
// Button click event code
$(document).on("click", '.animal', function(){
    $("#gifs-appear-here").empty();
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +animal+ "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
          console.log(results);
          for(var i =0; i<results.length; i++){
              var gifDiv = $("<div class='images'</div>")
              var rating = $("<p>");
              var image = $("<img>");
              image.addClass("image");
              image.attr("src", results[i].images.fixed_height_still.url);
              image.attr("data-state", "still");
              image.attr("data-still", results[i].images.fixed_height_still.url);
              image.attr("data-animate", results[i].images.fixed_height.url);
              rating.text("Rating: " + results[i].rating);
              gifDiv.append(image);
              gifDiv.append(rating);
              $("#gifs-appear-here").append(gifDiv);
          }
        })
    })
//Playing and pausing gifs
$(document).on("click", ".image", function(){
    var state = $(this).attr("data-state");
    console.log((state));
    if(state=="still"){
        $(this).attr("data-state", "animate");
        var animate = $(this).attr("data-animate");
        $(this).attr("src", animate);
    }else if(state=="animate"){
        $(this).attr("data-state", "still");
        var still = $(this).attr("data-still");
        $(this).attr("src", still);
    }
})

//Adding new animals
$("#add-animal").on("click", function(){
    event.preventDefault();
    console.log("hello");
    var animal = $("#animal-input").val();
    //var movie = $("#movie-input").val().trim();
    console.log(animal);
    animals.push(animal);
    renderButtons();
})
//Code for rendering buttons on the page
function renderButtons(){
    $("#animal-buttons").empty();
    for (var i = 0; i<animals.length; i++){
        var button = $("<button>");
        button.text(animals[i]);
        button.addClass("animal");
        button.attr("data-name", animals[i]);
        $("#animal-buttons").append(button);
    }
}














  


