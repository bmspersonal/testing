$('.form').on('change', function() {
    $.ajax({
        url: '/someurl',
        type: 'post',
        dataType: 'json',
        success: function(data) {
              
                 }
    });
});