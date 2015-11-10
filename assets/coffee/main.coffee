$(document).ready ->
  ###alert 'Hi'###
  $('#login').click ->
    data =
      name: 'TheMushrr00m'
    $.ajax
      url: '/login'
      dataType: 'html'
      type: 'GET'
      data: JSON.stringify(data)
      error: (jqXHR, textStatus, errorThrown) ->
        $('body').append "AJAX Error: #{textStatus}"
      success: (data, textStatus, jqXHR) ->
        $('body').append "Successful AJAX call: #{data}"