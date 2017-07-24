var SummerCamps = {};
var table = $("#content-data");


var summerCamps = $.get("https://api.myjson.com/bins/akqr3", function(data) {
    SummerCamps.CampData = Object.assign({}, data);
}, 'json');

addEventsFilters();
addClick();

function addEventsFilters(){
    $("input:checkbox").click(callFilters);
}

function addClick(){

$(table).find("span").click(function () {
alert("clicked");
})

}

function callFilters(){
    clearTable();
    var countryData = countryFilter(SummerCamps.CampData);
    var categoryData = categoryFilter(countryData);
    var durationData = durationFilter(categoryData);
    var ageData = ageFilter(durationData);
    createTable(ageData);
   // $(".content-table").text(JSON.stringify(durationData));//Testing out stuff
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
    if(flag == 1){
        console.log(selectCountry.length);
        return selectCountry;
    }
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
            var days = parseInt(obj[i].duration.replace("days", ""));
            var durationChecked = durationList[j].value * 30;
            if (durationChecked === 30 && days <= durationChecked && durationList[j].checked === true) {
                selectDuration.push(obj[i]);
                flag = 1;
            }else if (days >= 30 && days <= durationChecked && durationList[j].checked === true) {
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

function createTable(ageData){

    console.log("in create table");

    var max = Math.max(ageData.length);
   
    for(var i = 0; i < max; i++){
        
        var row = $("<tr/>");
        var text = $("<span/>");

        text.addClass("clickable").text(ageData[i].name);


        $("<td/>").attr("id", ageData[i].id).append(text).appendTo(row);
        $("<td/>").text(ageData[i].country).appendTo(row);
        $("<td/>").text(ageData[i].category).appendTo(row);
        $("<td/>").text(ageData[i].duration).appendTo(row);
        $("<td/>").text(ageData[i].agegroup).appendTo(row);
        row.appendTo($("#content-data tbody"));

    }
    
    table.show();
}

function clearTable(){
    table.find("tbody").empty();
}