function findTouristPlaces() {
  const city = document.getElementById("cityInput").value.trim();
  const locationDisplay = document.getElementById("locationDisplay");
  const placesList = document.getElementById("placesList");

  locationDisplay.innerHTML = "";
  placesList.innerHTML = "";

  if (!city) {
    locationDisplay.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=AIzaSyAa-NxpQcLfK6oZ6Y84CQD3du71ZOR5L2g`)
    .then(res => res.json())
    .then(data => {
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        const formattedAddress = data.results[0].formatted_address;

        locationDisplay.innerHTML = `📍 Detected Location: <strong>${formattedAddress}</strong>`;

        const map = new google.maps.Map(document.createElement("div")); // Dummy map
        const service = new google.maps.places.PlacesService(map);

        const request = {
          location: location,
          radius: 10000,
          keyword: 'tourist attractions'
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const maxResults = 20;
            let count = 0;

            results.forEach(place => {
              if (count < maxResults && place.name && place.photos) {
                const name = place.name;
                const photoUrl = place.photos[0].getUrl({ maxWidth: 400, maxHeight: 300 });

                const img = new Image();
                img.src = photoUrl;

                img.onload = () => {
                  const card = document.createElement("div");
                  card.className = "card";
                  card.innerHTML = `
                    <img src="${photoUrl}" alt="${name}">
                    <div class="card-body">
                      <div class="card-title">${name}</div>
                    </div>
                  `;
                  placesList.appendChild(card);
                  count++;
                };

                img.onerror = () => {
                  console.log(`❌ Image failed for: ${name}`);
                };
              }
            });

            setTimeout(() => {
              if (placesList.children.length === 0) {
                placesList.innerHTML = "<p>No tourist places with images found.</p>";
              }
            }, 1500);
          } else {
            placesList.innerHTML = "<p>No tourist places found.</p>";
          }
        });
      } else {
        locationDisplay.innerHTML = "<p>Could not detect location. Try again.</p>";
      }
    })
    .catch(err => {
      console.error(err);
      locationDisplay.innerHTML = "<p>Something went wrong.</p>";
    });
}

function findNearbyPlaces() {
  const city = document.getElementById("cityInput").value.trim();
  const locationDisplay = document.getElementById("locationDisplay");
  const placesList = document.getElementById("placesList");

  locationDisplay.innerHTML = "";
  placesList.innerHTML = "";

  if (!city) {
    locationDisplay.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=AIzaSyAa-NxpQcLfK6oZ6Y84CQD3du71ZOR5L2g`)
    .then(res => res.json())
    .then(data => {
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        const formattedAddress = data.results[0].formatted_address;

        locationDisplay.innerHTML = `📍 Detected Location: <strong>${formattedAddress}</strong>`;

        const map = new google.maps.Map(document.createElement("div"));
        const service = new google.maps.places.PlacesService(map);

        const request = {
          location: location,
          radius: 10000,
          keyword: 'hospital OR hotel OR temple OR beach OR theatre OR park'
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const maxResults = 20;
            let count = 0;

            results.forEach(place => {
              if (count < maxResults && place.name && place.photos) {
                const name = place.name;
                const photoUrl = place.photos[0].getUrl({ maxWidth: 400, maxHeight: 300 });

                const img = new Image();
                img.src = photoUrl;

                img.onload = () => {
                  const card = document.createElement("div");
                  card.className = "card";
                  card.innerHTML = `
                    <img src="${photoUrl}" alt="${name}">
                    <div class="card-body">
                      <div class="card-title">${name}</div>
                    </div>
                  `;
                  placesList.appendChild(card);
                  count++;
                };

                img.onerror = () => {
                  console.log(`❌ Image failed for: ${name}`);
                };
              }
            });

            setTimeout(() => {
              if (placesList.children.length === 0) {
                placesList.innerHTML = "<p>No nearby places with images found.</p>";
              }
            }, 1500);
          } else {
            placesList.innerHTML = "<p>No nearby places found.</p>";
          }
        });
      } else {
        locationDisplay.innerHTML = "<p>Could not detect location. Try again.</p>";
      }
    })
    .catch(err => {
      console.error(err);
      locationDisplay.innerHTML = "<p>Something went wrong.</p>";
    });
}
