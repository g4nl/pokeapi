function pokeSubmit() {
    document.getElementById('loader').style = "opacity: 1";
	var param = document.getElementById("pokeInput").value;
	var pokeURL = "api/pokemon/" + param;
	var pokeURL2 = "api/pokemon/" + param;
	$.getJSON(pokeURL2, function (data) {
		var pokeID = data.id;
		var pokeName = data.name;
		var pokeType1 = data.types[0].type.name;
		if (data.types.length == 2) {
			var pokeType2 = data.types[1].type.name;
		} else {
			var pokeType2 = null;
			console.log(data.descriptions)
			var descriptionURI = "api.php" + data.location_area_encounters;
			var pokeDescription = "";
		}

		$.getJSON(descriptionURI, function (data2) {
			pokeDescription = data2.description;
		});

		$.getJSON(pokeURL2, function (data3) {

			var imageURI = data3.sprites.front_default;

			var li = "";
			li += '<li><img src="' + imageURI + '">';
			li += '<h1>#' + pokeID + ' ' + pokeName + '</h1>';
			li += '<p>Type 1: ' + pokeType1 + '</p>';


			if (pokeType2 != null) {
				li += '<p>Type 2: ' + pokeType2 + '</p>';
			}

			var species = data.species;
			$.getJSON(species)
				.done(getSpecies)
				.fail(failMessage);


			li += '</li>';


			$("#pokeDetails").empty();


			$("#pokeDetails").append(li).promise().done(function () {

			});

		});

	});
}

function getSpecies(data) {
	    var ul = document.getElementById('pokeDetails');
	        var li2 = document.createElement("li");
	            li2.innerHTML = 'Area: ' + data.habitat.name + "<br>" + 'Capture rate: ' + data.capture_rate + "<br>" + 'Color: ' + data.color.name + "<br>" + "(click anywhere to go back to the top of the page)";
    ul.appendChild(li2);
    
    function bottom() {
        document.getElementById( 'bottom' ).scrollIntoView();
        window.setTimeout( function () { top(); }, 2000 );
    };
    
    bottom();
    document.getElementById('loader').style = "opacity: 0";
}

function failMessage() {
	console.log("Hmm.. looks like something went wrong");
}
































console.log("by @Rob Slingerland & @Ricky Muijters");
//by @Rob Slingerland & @Ricky Muijters