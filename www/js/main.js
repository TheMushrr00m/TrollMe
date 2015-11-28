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
    var data, logged;
    e.preventDefault();
    logged = '';
    data = {
      name: $('#icon_prefix').val(),
      pass: $('#icon-password').val()
    };
    return $.ajax({
      url: '/login',
      type: 'GET',
      data: data,
      success: function(response, textStatus, jqXHR) {
        console.log('', response);
        if (response) {
          return logged = true;
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        return console.error('Error', errorThrown);
      },
      complete: function() {
        if (logged) {
          return window.location = '/usuario';
        }
      }
    });
  });
});
