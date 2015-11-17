$(document).ready(function() {

  /*$('#log-btn').click ->
    data =
      name: $('#name').val()
      pass: $('#pass').val()
    $.ajax
    url: "/home/#{data.name}"
    dataType: 'html'
    type: 'GET'
    data: JSON.stringify(data)
    error: (jqXHR, textStatus, errorThrown) ->
    success: (data, textStatus, jqXHR) ->
   */

  /*$('#registro').click ->
    data =
      name: 'TheMushrr00m'
    $.ajax
    url: '/register'
    dataType: 'html'
    type: 'POST'
    data: JSON.stringify(data)
    error: (jqXHR, textStatus, errorThrown) ->
    success: (data, textStatus, jqXHR) ->
   */
  return $('.modal-trigger').leanModal({
    dismissible: false
  });
});
