var aux = 1;

setInterval(function(){
	var locationDiv = document.getElementById('location');
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
				console.log('Success!');
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