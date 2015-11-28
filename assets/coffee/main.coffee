$(document).ready ->
  $('.button-collapse').sideNav()
  ###Inicializa el efecto Parallax###
  $('.parallax').parallax()
  ###Inicializa el soporte de los modals###
  $('.modal-trigger').leanModal(
    dismissible: false
    opacity: .8
    ready: ->
      console.log 'Ready'
    complete: ->
      console.log 'Closed'
  )

  $btnLogin = $('#btnLogin')
  $btnLogin.click (e) ->
    e.preventDefault()
    logged = ''
    data =
      name: $('#icon_prefix').val()
      pass: $('#icon-password').val(),
    $.ajax
      url: '/login'
      type: 'GET'
      data: data,
      success: (response, textStatus, jqXHR) ->
        console.log '', response
        if response
          logged = true
      error: (jqXHR, textStatus, errorThrown) ->
        console.error 'Error', errorThrown
      complete: ->
        if logged
          window.location = '/usuario'