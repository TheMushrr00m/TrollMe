$(document).ready(function() {
  var $frmLogin;
  $('.button-collapse').sideNav();

  /*Inicializa el efecto Parallax */
  $('.parallax').parallax();

  /*Inicializa el soporte de los modals */
  $('.modal-trigger').leanModal({
    dismissible: false,
    opacity: .8,
    ready: function() {},
    complete: function() {}
  });
  $frmLogin = $('#frmLogin');
  return $frmLogin.submit(function(e) {
    e.preventDefault();
    return $.ajax({
      type: 'POST',
      url: '/login',
      data: $('#frmLogin').serialize(),
      dataType: 'json',
      error: function(error) {},
      success: function(log) {
        if (log !== null) {
          return window.location = "/" + log.NombreUsuario;
        } else {
          return Materialize.toast('Usuario y/o Contraseña incorrectos!', 3000, 'rounded');
        }
      }
    });
  });
});
