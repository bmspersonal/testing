var SummerCamps = {};
var table = $("#content-data");


var summerCamps = $.get("https://api.myjson.com/bins/e1hhr", function(data) {
    SummerCamps.CampData = Object.assign({}, data);
}, 'json');

addEventsFilters();

function addEventsFilters(){
    $("input:checkbox").click(callFilters);
}

function addClick(){
console.log("addlclick");
console.log(table);
table.find("span").click(function () {
    selectCamp(SummerCamps.CampData.summerCamps, parseInt(this.id));
})

}

function callFilters(){
    clearTable();
    var countryData = countryFilter(SummerCamps.CampData);
    var categoryData = categoryFilter(countryData);
    var durationData = durationFilter(categoryData);
    var ageData = ageFilter(durationData);
    createTable(ageData);
    addClick();

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
        row.addClass("table-active")
        var text = $("<span/>");

        text.addClass("clickable").attr("id", ageData[i].id).text(ageData[i].name).css({"text-decoration" : "underline","cursor" : "pointer"});
        text.attr({"data-toggle":"modal","data-target":"#campModal"});

        $("<td/>").append(text).appendTo(row);
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

function selectCamp(input, number) {
    //alert();
    var index = input.listOfCamps.indexOf(number);
    console.log(input, number, index);
    var selectedCamp = input.campData[index];
    $("h3.modal-title").text(selectedCamp.name).css("font-weight", "bold");
    $("h4.modal-title").text(selectedCamp.description);
    $(".modal-header").css("background-color", "#90EE90");
    $(".modal-footer").css("background-color","#FFD4AA")
    var showProp = Object.keys(selectedCamp);
    console.log(showProp);
        for(var i = 3; i < showProp.length; i++) {
            $("#"+showProp[i]).text(showProp[i]+": "+selectedCamp[showProp[i]]);
        }
        
}
$("#register").on("click", function(){
    window.open( "payment.html", "_blank")
});
// setTimeout(function(){
// selectCamp(SummerCamps.CampData.summerCamps, 151)
// }, 2000);