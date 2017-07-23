
var data = {};

function getData() {

    $.get('https://api.myjson.com/bins/1d8jm3', function (camps) {

       //console.log(camps.summerCamps.campData);
        data = camps.summerCamps.campData;
       // console.log(data);
    },'json')
    
    .done(function (camps) {
        data = camps.summerCamps;
    })

    .fail(function () {
        alert('unsuccessful');
    })

}

function filterByCategory(category, data){
    console.log(data);
}


$(document).ready(function () {
    getData();
    filterByCategory("sports", data); 
    console.log(data);
});




//jQuery.parseJSON