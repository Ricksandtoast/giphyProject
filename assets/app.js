$(document).ready(function(){

var topics = ["UFC", "Dogs", "Music","Movies"];


function createButtons(){
  $("#list-of-buttons").empty();

  for (var i = 0; i < topics.length; i++) 
  {
    var gifButton = $("<button>");
    gifButton.text(topics[i]);
    gifButton.addClass("buttons");
    gifButton.addClass("btn btn-info");
    $("#list-of-buttons").append(gifButton);
    gifButton.attr("data-name",topics[i]);

  }
}
$("#button-add").click(function(event){
  //prevent reset
  event.preventDefault();
  var nameOfButton = $('#add-button').val();
  //gets value from form
  
  //puts value into topics array
  topics.push(nameOfButton);
  createButtons();
});


// $(".buttons").click(function(){
//   console.log("fuck");
//   var button = $(this).text();
//   console.log(button);
//   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
//   button + "api_key=dc6zaTOxFJmzC&q=&limit=3";
//   var otherURL = "https://api.giphy.com/v1/gifs/search?api_key=hGCtEiHKvTiiAS7PUixj294VD6ADxZxp&q="+ button+"&limit=2";
//   $.ajax({
//     url: otherURL,
//     method: "GET"
//   }).then(function(response){
//     console.log(response);
//     var results = response.data;
//     var imageTag = $("<img>");
//     imageTag.attr("src", results[0].images.fixed_height.url);
//     var images = $(".images");
//     images.append(imageTag);
//   });
// });

var count = 0;

$(document).on( "click", ".buttons", function() {
  var button = $(this).text();
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
  button + "api_key=dc6zaTOxFJmzC&q=&limit=10";
  var otherURL = "https://api.giphy.com/v1/gifs/search?api_key=hGCtEiHKvTiiAS7PUixj294VD6ADxZxp&q="
  + button+"&limit=10&rating=G&lang=en";
  $.ajax({
    url: otherURL,
    method: "GET"
  }).then(function(response){
    console.log(response);
    var results = response.data;
    for(var i = 0; i<10;i++)
    {
    var imageTag = $("<img>");
    imageTag.addClass("gif");
    imageTag.attr("src", results[i].images.fixed_height_still.url);
    imageTag.attr("data-state","still");
    imageTag.attr("data-still", results[i].images.fixed_height_still.url)
    imageTag.attr("data-animate",results[i].images.fixed_height.url);
    var images = $(".images");
    images.append(imageTag);
    }
  });
});
$(document).on("click", ".gif",function()
{
  var state = $(this).attr("data-state");
  console.log(state);
  if(state == "still"){
    var animate = $(this).attr("data-animate");
    $(this).attr("src", animate);
    $(this).attr("data-state","animate");
  }
  else{
    var still = $(this).attr("data-still");
    $(this).attr("src", still);
    $(this).attr("data-state","still");
  }
  console.log("I clicked a gif");

});
});