$(document).ready(function() {
  var $btnLogin;
  $('.button-collapse').sideNav();

  /*Inicializa el efecto Parallax */
  $('.parallax').parallax();

  /*Inicializa el soporte de los modals */
  $('.modal-trigger').leanModal({
    dismissible: false,
    opacity: .8,
    ready: function() {
      return console.log('Ready');
    },
    complete: function() {
      return console.log('Closed');
    }
  });
  $btnLogin = $('#btnLogin');
  return $btnLogin.click(function(e) {
    var data;
    e.preventDefault();
    data = {
      name: $('#icon_prefix').val(),
      pass: $('#icon-password').val()
    };
    return $.ajax({
      url: '/login',
      type: 'GET',
      dataType: 'json',
      data: data,
      success: function(json, textStatus, jqXHR) {
        return console.log(json);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        return console.log('Error', errorThrown);
      },
      complete: function() {}
    });
  });
});
