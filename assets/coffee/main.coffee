$(document).ready ->
  $('.button-collapse').sideNav()
  ###Inicializa el efecto Parallax###
  $('.parallax').parallax()
  ###Inicializa el soporte de los modals###
  $('.modal-trigger').leanModal
    dismissible: false
    opacity: .8
    ready: ->
    complete: ->

  $frmLogin = $('#frmLogin')
  $frmLogin.submit (e) ->
    e.preventDefault()
    $.ajax
      type: 'POST'
      url: '/login'
      data: $('#frmLogin').serialize()
      dataType: 'json'
      error: (error) ->
      success: (log) ->
        if log isnt null
          window.location = "/#{log.NombreUsuario}"
        else
          Materialize.toast('Usuario y/o Contraseña
            incorrectos!', 3000, 'rounded')