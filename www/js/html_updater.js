var aux = 'trollme';


setInterval(function(){
	var locationDiv = document.getElementById('location');
	$('canvas').attr('class', 'game');
	$('canvas').css({'display' : 'inLine'});
	if (aux != locationDiv.innerHTML)
	{
		aux = locationDiv.innerHTML;
		$.ajax({
			url: '/trollme',
			type: 'GET',
			data: 'hello',
			//dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				$('canvas').remove();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('Error!');
			},
			complete: function(data) {
				var new_script = '<script type="text/javascript" src="petitions/'+locationDiv.innerHTML+'.js"></script>';
				$('#container').html(new_script);
			}
		});
	}
}, 1000);