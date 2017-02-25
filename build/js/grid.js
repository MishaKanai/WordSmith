$(document).ready(function () {
	$('#documents .item').addClass('grid-group-item');
	$('#list').click(function (event) {
		console.log("list clicked");
		event.preventDefault();
		$('#documents .item').addClass('list-group-item');
		$('#documents .item').removeClass('grid-group-item');
	});
	$('#grid').click(function (event) {
		event.preventDefault();
		console.log("list clicked");
		$('#documents .item').removeClass('list-group-item');
		$('#documents .item').addClass('grid-group-item');
	});
});