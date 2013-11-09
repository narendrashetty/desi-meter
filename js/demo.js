/*
 * MovingBoxes demo script
 */

setTimeout(function(){

	$('#slider-one').movingBoxes({
		startPanel   : 4,      // start with this panel
		reducedSize  : 0.5,    // non-current panel size: 80% of panel size
		wrap         : true,   // if true, the panel will "wrap" (it really rewinds/fast forwards) at the ends
		buildNav     : true,   // if true, navigation links will be added
		navFormatter : function(){ return "&#9679;"; }, // function which returns the navigation text for each panel

		// width and panelWidth options removed in v2.2.2, but still backwards compatible
		width        : 800,    // overall width of movingBoxes (not including navigation arrows)
		panelWidth   : 0.2	 // current panel width

	});

	// Examples of how to move the panel from outside the plugin.
	// get (all 3 examples do exactly the same thing):
	//  var currentPanel = $('#slider-one').data('movingBoxes').currentPanel(); // returns # of currently selected/enlarged panel
	//  var currentPanel = $('#slider-one').data('movingBoxes').curPanel; // get the current panel number directly
	//  var currentPanel = $('#slider-one').getMovingBoxes().curPanel; // use internal function to return the object (essentially the same as the line above)

	// set (all 4 examples do exactly the same thing):
	//  var currentPanel = $('#slider-one').data('movingBoxes').currentPanel(2, function(){ alert('done!'); }); // returns and scrolls to 2nd panel
	//  var currentPanel = $('#slider-one').getMovingBoxes().currentPanel(2, function(){ alert('done!'); }); // just like the line above
	//  var currentPanel = $('#slider-one').movingBoxes(2, function(){ alert('done!'); }); // scrolls to 2nd panel, runs callback & returns 2.
	//  var currentPanel = $('#slider-one').getMovingBoxes().change(2, function(){ alert('done!'); }); // internal change function is the main function


	// Report events to console
	$('.mb-slider').bind('initialized.movingBoxes initChange.movingBoxes beforeAnimation.movingBoxes completed.movingBoxes',function(e, slider, tar){
		// show object ID + event in the console
		// namespaced events: e.g. e.type = "completed", e.namespace = "movingBoxes"
		if (window.console && window.console.log){
			var txt = slider.$el[0].id + ': ' + e.type + ', now on panel #' + slider.curPanel + ', targeted panel is ' + tar;
		}
	});

},5000);