var aux = 1;

setInterval(function(){
	var locationDiv = document.getElementById('location');

	console.log(locationDiv.innerHTML, aux)

	if (aux != locationDiv.innerHTML) //locationDiv.innerHTML == 2 && 
	{
		aux = locationDiv.innerHTML;
		//console.log(locationDiv.innerHTML, aux,'perro')
		$.ajax({
			url: '/trollme',
			type: 'GET',
			data: 'hello',
			//dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				console.log('Success!');
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('Error!');
			},
			complete: function(data) {
				//console.log('complete!', $( "#container" ).body);
				$('.game').empty();
				//$('#container').replaceWith('<script type="text/javascript" src="petitions/mall.js"></script>');
				//<script type="text/javascript" src="js/phaser.min.js"></script>
				//$('#container').empty();
			}
		});
	}
}, 1000);


/*
$.ajax({
	url: '/mall',
	type: 'GET',
	data: $frmLogin.serialize(),
	//dataType: 'json',
	success: function(data, textStatus, jqXHR) {
		console.log('Success: ', data);
		$('#response').html(data);
	},
	error: function(jqXHR, textStatus, errorThrown) {
		console.log('Error');
	},
	complete: function() {
		$('#nombre').val('');
		$('#pass').val('');
	}
});
*/