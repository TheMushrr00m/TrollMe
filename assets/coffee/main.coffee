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
    data =
      name: $('#icon_prefix').val()
      pass: $('#icon-password').val(),
    $.ajax
      url: '/login'
      type: 'POST'
      data: data,
      success: (data, textStatus, jqXHR) ->
        console.log '', data
        if data is 'True'
          window.location = '/usuario'
      error: (jqXHR, textStatus, errorThrown) ->
        console.error 'Error', errorThrown
      complete: ->
        ###window.location = '/home'###