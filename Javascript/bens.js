var SummerCamps = {};


var summerCamps = $.get("https://api.myjson.com/bins/akqr3", function(data) {
    SummerCamps.CampData = Object.assign({}, data);
}, 'json');


function selectCamp(input, number) {
	var index = input.listOfCamps.indexOf(number);
	var selectedCamp = input.campData[index];
	$("h3.modal-title").append(selectedCamp.name).css("font-weight", "bold");
	$("h4.modal-title").append(selectedCamp.description);
	$(".modal-header").css("background-color", "#90EE90");
	$(".modal-footer").css("background-color","#FFD4AA")
	var showProp = Object.keys(selectedCamp);
	console.log(showProp);
		for(var i = 3; i < showProp.length; i++) {
			$("#"+showProp[i]).html(showProp[i]+": "+selectedCamp[showProp[i]]);
		}
		
}
$("#register").on("click", function(){
	window.open( "payment.html", "_blank")
});
setTimeout(function(){
selectCamp(SummerCamps.CampData.summerCamps, 151)
}, 2000);

// for(var i =0 ; i<22; i++){
// 	summerCamps.CampData[i];

// }

