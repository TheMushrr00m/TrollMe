$(document).ready ->
  $('.parallax').parallax()

  ###$('.button-collapse').sideNav()
  $('.modal-trigger').leanModal (e) ->
    e.preventDefault()
  $('#aside').pushpin({ top: 150, bottom: 300 })

  $('.modal-trigger').leanModal(
    dismissible: true
  )
    
  $frmLogin = $('#frmLogin')
  $frmLogin.submit (e) ->
    e.preventDefault()
    $frmLogin = $('#frmLogin')
    $.ajax
      url: '/login'
      type: 'POST'
      data: $frmLogin.serialize(),
      success: (data, textStatus, jqXHR) ->
        console.log "Success: #{data}"
      error: (jqXHR, textStatus, errorThrown) ->
        console.log 'Error'
      complete: ->
        $('#icon_prefix').val ''
        $('#icon-password').val ''###
  ###$('#log-btn').click ->
    data =
      name: $('#name').val()
      pass: $('#pass').val()
    $.ajax
    url: "/home/#{data.name}"
    dataType: 'html'
    type: 'GET'
    data: JSON.stringify(data)
    error: (jqXHR, textStatus, errorThrown) ->
    success: (data, textStatus, jqXHR) ->###

  ###$('#registro').click ->
    data =
      name: 'TheMushrr00m'
    $.ajax
    url: '/register'
    dataType: 'html'
    type: 'POST'
    data: JSON.stringify(data)
    error: (jqXHR, textStatus, errorThrown) ->
    success: (data, textStatus, jqXHR) ->###