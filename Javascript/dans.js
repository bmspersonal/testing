var SummerCamps = {};


var summerCamps = $.get("https://api.myjson.com/bins/akqr3", function(data) {
    SummerCamps.CampData = Object.assign({}, data);
}, 'json');

addEventsFilters();

function addEventsFilters(){
    $("input:checkbox").click(callFilters);
}

function callFilters(){
    var countryData = countryFilter(SummerCamps.CampData);
    var categoryData = categoryFilter(countryData);
    //var durationData = durationFilter(categoryData);
    var ageData = ageFilter(categoryData);
    $(".content-table").text(JSON.stringify(ageData));//Testing out stuff
}

function countryFilter(obj) {
    var countryList = $("input[name=country]");
    var selectCountry = [];
    var objson = obj.summerCamps.campData;
    var flag = 0;
	for (var i = 0; i < objson.length; i++) {
        for(var j = 0; j < countryList.length; j++){
            if (objson[i].country == countryList[j].value && countryList[j].checked === true) {
                selectCountry.push(objson[i]);
                flag = 1;
            }
        }
    }
    if(flag == 1)
        return selectCountry;
    else
        return objson;
}

function categoryFilter(obj) {
    var categoryList = $("input[name=category]");
    console.log(categoryList);
    var selectCategory = [];
    var flag = 0;
	for (var i = 0; i < obj.length; i++) {
        for(var j = 0; j < categoryList.length; j++){
            if (obj[i].category == categoryList[j].value && categoryList[j].checked === true) {
                selectCategory.push(obj[i]);
                flag = 1;
            }	
        }   
    }
    if(flag == 1)
        return selectCategory;
    else
        return obj;
}

function durationFilter(obj) {
    var durationList = $("input[name=duration]");
    var selectDuration = [];
    var flag = 0;
	for (var i = 0; i < obj.length; i++) {
        for(var j = 0; j < durationList.length; j++){
            var weeks = parseInt(obj[i].duration.replace("days", ""));
            var durationChecked = durationList[j].value * 5;
            if (weeks <= durationChecked && durationList[j].checked === true) {
                selectDuration.push(obj[i]);
                flag = 1;
            }
        }   
    }
    if(flag == 1)
        return selectDuration;
    else
        return obj;
}

function ageFilter(obj) {
    var ageList = $("input[name=age]");
    var selectAge = [];
    var flag = 0;
	for (var i = 0; i < obj.length; i++) {
        var dataAgeArray = obj[i].agegroup.replace("years", "").split("-");
        for(var j = 0; j < ageList.length; j++){
            var ageArray = ageList[j].value.split("-");
            console.log("===><>< " + ageArray[1]);
            if(isNaN(ageArray[1]) && ageList.checked === true){
                if(parseInt(ageArray[0]) > parseInt(dataAgeArray[0]) && parseInt(ageArray[0]) < parseInt(dataAgeArray[1])){
                    selectAge.push(obj[i]);
                    flag = 1;
                }
            }else if(((parseInt(ageArray[0]) > parseInt(dataAgeArray[0]) && parseInt(ageArray[0]) < parseInt(dataAgeArray[1])) || (parseInt(ageArray[1]) > parseInt(dataAgeArray[0]) && parseInt(ageArray[1]) < parseInt(dataAgeArray[1]))) && ageList[j].checked === true){
                selectAge.push(obj[i]);
                flag = 1;
            }
        }
    }
    if(flag == 1)
        return selectAge;
    else
        return obj;
}