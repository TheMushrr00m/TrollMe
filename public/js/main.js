$(document).ready(function() {
  alert('Hi');
  return $('#login').click(function() {
    var data;
    data = {
      name: 'TheMushrr00m'
    };
    return $.ajax({
      url: '/login',
      dataType: 'html',
      data: JSON.stringify(data),
      error: function(jqXHR, textStatus, errorThrown) {
        return $('body').append("AJAX Error: " + textStatus);
      },
      success: function(data, textStatus, jqXHR) {
        return $('body').append("Successful AJAX call: " + data);
      }
    });
  });
});
