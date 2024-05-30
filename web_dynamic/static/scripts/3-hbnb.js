$(document).ready(function() {
  const selectedAmen = {};

  $('input[type="checkbox"]').change(function() {
    if (this.checked) {
      selectedAmen[$(this).data('id')] = $(this).data('name');
    } else {
      delete selectedAmen[$(this).data('id')];
    }

    const amenList = Object.values(selectedAmen).join(', ');
    $('div.amenities h4').text(amenList);
  });

  function checkApiStatus() {
    $.get('http://localhost:5001/api/v1/status/')
      .done(function(data) {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      })
      .fail(function() {
        $('#api_status').removeClass('available');
      });
  }

  function loadPlaces() {
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function(data) {
        $('section.places').empty();
        data.forEach(place => {
          const article = $('<article></article>');
          const titleBox = $('<div class="title_box"></div>');
          titleBox.append('<h2>' + place.name + '</h2>');
          titleBox.append('<div class="price_by_night">$' + place.price_by_night + '</div>');
          article.append(titleBox);

          const information = $('<div class="information"></div>');
          information.append('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>');
          information.append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>');
          information.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>');
          article.append(information);

          const description = $('<div class="description"></div>').html(place.description);
          article.append(description);

          $('section.places').append(article);
        });
      }
    });
  }

  checkApiStatus();
  loadPlaces();
});
