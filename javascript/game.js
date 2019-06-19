/**
 * Alex's sample code
 */

const gifObj = {};

// End Sample

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
}

$("#add-comedian").on("click", function(event) {
  event.preventDefault();

  let comedians = $("#comedian-input")
    .val()
    .trim();

  $("#comedian-input").val(" ");

  topics.push(comedians);

  newButtons();
});

newButtons();

$(document).on("click", ".comedian", displayComedians);

$(document).on("click", ".gif-image", function(e) {
  const currentDataset = e.currentTarget.dataset;
  const { gif_id } = currentDataset;
  const currentGif = gifObj[gif_id];

  currentGif.isActive ? $(this).attr("src", currentGif.stillURL) : $(this).attr("src", currentGif.animatedURL);
  currentGif.isActive = !currentGif.isActive;

  // if (currentGif.isActive) {
  //   currentGif.isActive = false;
  //   $(this).attr('src', currentGif.stillURL);
  // } else {
  //   currentGif.isActive = true;
  //   $(this).attr('src', currentGif.animatedURL);
  // }

  /**
   * HTML STATE MANAGEMENT
   */
//   if (currentDataset.state === "still") {
//     console.log(currentDataset.animated);
//     $(this).attr("src", currentDataset.animated);
//     $(this).attr("data-state", "animated");
//     console.log(this);
//   } else {
//     $(this).attr("src", currentDataset.still);
//     $(this).attr("data-state", "still");
//   }
});

function displayComedians() {
  $("button").on("click", function() {
    let person = $(this).attr("data-name");
    let queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      person +
      "&api_key=lPvbcInOTDVzHEYZP7FbPidwvTsTvjoH&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      let results = response.data;

      for (let i = 0; i < results.length; i++) {
        const currentResult = results[i];
        if (results[i].rating !== "r") {
          let gifDiv = $("<div>");
          let rating = results[i].rating;
          let p = $("<p>").text("Rating: " + rating);
          let personImage = $("<img class='gif-image'>");

          gifObj[currentResult.id] = {
            isActive: false,
            stillURL: currentResult.images.fixed_height_still.url,
            animatedURL: currentResult.images.fixed_height.url
          };

          personImage.attr("src", currentResult.images.fixed_height_still.url);
          personImage.attr("data-gif_id", currentResult.id);

          //   personImage.attr("data-state", "still");
          //   personImage.attr(
          //     "data-still",
          //     results[i].images.fixed_height_still.url
          //   );
          //   personImage.attr("data-animated", results[i].images.fixed_height.url);
          // store links on HTML elements via attributes

          // create an array and push each gif into it, grab by id

          gifDiv.append(p);
          gifDiv.append(personImage);

          $("#gifs-section").prepend(gifDiv);
        }
      }
    });
  });
}
