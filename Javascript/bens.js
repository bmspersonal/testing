var filters = {};
	filters = fetchdata();
	console.log(filters);

var resjson = "";
	function fetchdata() {
	$.get("https://api.myjson.com/bins/1d8jm3",	function(data) {
		resjson = JSON.stringify(data.summerCamps.campData);
		//console.log(JSON.parse(resjson));
		return resjson;
	}, 'json');
}

function countryFilter(obj, countryname) {
	var selectCountry = [];
	var objson = JSON.parse(obj);
	for (var i = 0; i < objson.length; i++) {
		if (objson[i].country == countryname) {
			console.log(countryname);
				selectCountry.push(objson[i]);
		}	
	}
	return selectCountry;
}

/*$(document).ready(function(){
var resjson = {};
	
	$.get("https://api.myjson.com/bins/1d8jm3",	function(campdata) {
		resjson = campdata.summerCamps.campData;
	}, 'json');
	countryFilter(resjson, "India");
	});

function countryFilter(obj, countryname) {
	var selectCountry = [];
	for (var i = 0; i < obj.length; i++) {
		if (obj[i].country == countryname) {
				selectCountry.push(obj[i]);
		}	
	}
	return selectCountry;
}*/

/*function durationFilter(obj, durationlength) {
	var selectDuration = [];
	for (var i = 0; i < obj.length; i++) {
		if(obj[i].duration.indexOf("days")) {

		}
		var weeks = obj[i].duration.replace("weeks","");
		if (weeks == durationlength.replace("weeks", "")) {
				selectCountry.push(obj[i]);
		}	
	}
	return selectCountry; */
}


