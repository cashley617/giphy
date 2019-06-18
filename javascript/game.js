
$('button').on('click', function() {
    let person = $(this).attr('data-person');
    let queryURL =
        // "https://api.giphy.com/v1/gifs/search?q=+tinafey+%22&api_key=lPvbcInOTDVzHEYZP7FbPidwvTsTvjoH&limit=10"
      "https://api.giphy.com/v1/gifs/search?q=" +
      person +
      "&api_key=lPvbcInOTDVzHEYZP7FbPidwvTsTvjoH&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
      })
        .then(function(response) {
            let results = response.data;
            console.log(response)
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
});