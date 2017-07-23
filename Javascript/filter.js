var data = [ {age: 13},
             {age: 15},
             {age: 16},
             {age: 12}, ];


function getData(data) {
$('form#filter').on('change', function(data) {
    $.ajax({
        url: '/someurl',
        type: 'get',
        dataType: 'json',
        data: data,
        success: function(data) {
            alert('got data successffuly');

         },
        fail: function(data){
            alert('did not retrieve data');
        }
    });
});

}


getData(data);
alert('thanks');
//jQuery.parseJSON
