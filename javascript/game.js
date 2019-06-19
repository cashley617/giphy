

let topics = [
  "Kate McKinnon",
  "Tina Fey",
  "Amy Poehler",
  "Kristen Wiig",
  "Cecily Strong",
  "Aidy Bryant",
  "Nasim Pedrad",
  "Melissa Villasenor"
];


function newButtons() {

    $("#new-buttons").empty();

    for (let x = 0; x < topics.length; x++) {
        let b = $("<button>");
        
        b.addClass("comedian");
        b.attr("data-name", topics[x]);
        b.text(topics[x]);
        $("#new-buttons").append(b);
    }
};


$('#add-comedian').on('click', function(event) {

    event.preventDefault();
    
    let comedians = $("#comedian-input").val().trim();

    $("#comedian-input").val(" ");

    topics.push(comedians);

    newButtons();
});

newButtons();

$(document).on("click", ".comedian", displayComedians);


function displayComedians() {
    $('button').on('click', function() {
    let person = $(this).attr("data-name");
    let queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      person +
      "&api_key=lPvbcInOTDVzHEYZP7FbPidwvTsTvjoH&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
      })
        .then(function(response) {
            let results = response.data;

            for (let i = 0; i < results.length; i++) {
                if (results[i].rating !== "r") {
                    let gifDiv = $("<div>");
                    let rating = results[i].rating;
                    let p = $("<p>").text("Rating: " + rating);
                    let personImage = $("<img>");

                    personImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.append(p);
                    gifDiv.append(personImage);

                    $('#gifs-section').prepend(gifDiv);
                }
            }
        });
})};