jQuery(document).ready(function($){
	var Form = $('#gp-build-taxonomy');
	// set defaults
	Form.on('change', 'input[name="gp-build-taxonomy[public]"]', function(event){
		var el = $(this),
			val = el.val(),
			relatedSelects = Form.find('select[data-public]'),
			relatedRadios = Form.find('input[data-public]');
		relatedSelects.each(function(){
			var el = $(this);
			if ( el.data('public') === 'direct' ) {
				el.val( val );
			} else {
				if ( val === '1' ) {
					el.val('0');
				} else {
					el.val('1');
				}
			}
		});
		relatedRadios.each(function(){
			var el = $(this);
			if ( el.data('public') === 'direct' && val === el.val() ) {
				el.attr('checked', 'checked');
			}
			if ( el.data('public') === 'reverse' && val !== el.val() ) {
				el.attr('checked', 'checked');
			}
		});
	}).on('change', '#gp-build-taxonomy-taxonomy', function(){
		var val = $(this).val().toLowerCase();
		$(this).val( val );
		$('#gp-build-taxonomy-capability-type-1').val( val );
		$('#gp-build-taxonomy-capability-type-2, #gp-build-taxonomy-rewrite-2').val( val +'s' );
	}).on('keyup', '#gp-build-taxonomy-label', function(){
		var el = $(this),
			val = el.val(),
			gender = $('#gp-build-taxonomy-labels-1').val();
		Form.find('input[data-number="plural"]').each(function(){
			var el = $(this),
				format = el.data('format-'+ gender);
			el.val( format.replace('%s', val) );
		});
		var slug = val.toLowerCase().replace(/\ /g, '-').replace(/[^A-Za-z0-9-]*/g, '');
		Form.find('#gp-build-taxonomy-capability-type').find('div.control-group:last-child input').val( slug );
	}).on('keyup', 'input[name="gp-build-taxonomy[labels][singular_name]"]', function(){
		var el = $(this),
			val = el.val(),
			gender = $('#gp-build-taxonomy-labels-1').val();
		Form.find('input[data-number="singular"]').each(function(){
			var el = $(this),
				format = el.data('format-'+ gender);
			el.val( format.replace('%s', val) );
		});
	}).on('change', '#gp-build-taxonomy-labels-1', function(){
		var el = $(this),
			gender = el.val(),
			plural_seed = $('#gp-build-taxonomy-label').val(),
			singular_seed = $('input[name="gp-build-taxonomy[labels][singular_name]"]').val();
		$('#gp-build-taxonomy-labels').find('input[type="text"]').each(function(){
			var el = $(this),
				format = el.data('format-' + gender);
			if ( el.data('number') === 'singular' ) {
				el.val( format.replace('%s', singular_seed) );
			} else if ( el.data('number') === 'plural' ) {
				el.val( format.replace('%s', plural_seed) );
			}
		});
	}).on('change', 'select[name="gp-build-taxonomy[rewrite_enable]"]', function(){
		var el = $(this),
			val = $(this).val();
		if ( val == '1' ) {
			Form.find('.rewrite-opt').removeAttr('disabled').parent().fadeTo(100, 1);
		} else {
			Form.find('.rewrite-opt').attr('disabled', 'disabled').parent().fadeTo(300, 0.4);
		}
	});
	$('#gp-build-taxonomy-public-1').trigger('click');
});