$(document).ready(function () {
	const selectedAmen = {};

	$('input[type="checkbox"]').change(function () {
		if (this.checked) {
			selectedAmen[$(this).data('id')] = $(this).data('name');
		} else {
			delete selectedAmen[$(this).data('id')];
		}

		const amenList = Object.values(selectedAmen).join(', ');
		$('div.amenities h4').text(amenList);
	});
});

function checkApiStatus() {
	$.get('http://localhost:5001/api/v1/status/')
		.done(function (data) {
			if (data.status === "OK") {
				$('#api_status').addClass('available');
			} else {
				$('#api_status').removeClass('available');
			}
		})
		.fail(function () {
			$('#api_status').removeClass('available');
		});
}

checkApiStatus();
