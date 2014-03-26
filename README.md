test_stuff
==========

ImageStackLoader
----------------

An image stack loader, useful for preload css images for example.

Define progress and complete handlers and set an images array to preload.

	$(function(){
		function completedHandler(){
			$("#results").append("preload completed<br/>");
			for(var i=0;i<imgs.length;i++){
				$("#results").append("<img src='"+imgs[i]+"' width='250' /><br/>");
			}
		}
		function progressedHandler(e, index){
			$("#results").append("image"+index+" loaded<br/>");
		}
		
		var imgs=[
			"http://lorempixel.com/600/400/sports?1",
			"http://lorempixel.com/600/400/sports?2",
			"http://lorempixel.com/600/400/sports?3"
		];
		
		var stack=new DRUS.ImageStackLoader();
		stack.progressed.add(progressedHandler);
		stack.completed.add(completedHandler);
		stack.preload(imgs);
	});
