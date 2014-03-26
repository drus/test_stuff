define(['jquery', 'lib/signals'], function($, signals){

	return function(){
		var my={
			error_sg:new signals.Signal(),
			progressed_sg:new signals.Signal(),
			completed_sg:new signals.Signal()
		};

		var _list,
			_total=0,
			_index=0,
			_loader=null,
			_iebuggyStackOverflow;

		function preload(imgs){
			_list=imgs;
			_total=imgs.length;
			_index=0;
			next();
		}

		function next(){
			//log("index: ", _index, " - total: ", _total);
			if (_index === _total){
				my.completed_sg.dispatch();
			}else{
				_loader=$('<img />');
				_loader.error(onError);
				_loader.load(onLoad);
				_loader.attr('src', _list[_index++]);
			}
		}

		function onLoad(e) {
			//log("onLoad index: ", _index, " - total: ", _total);
			_loader.unbind();
			_loader=null;
			my.progressed_sg.dispatch(e, _index);
			_iebuggyStackOverflow=setTimeout(next, 1);
		}

		function onError(e) {
			my.error_sg.dispatch(e, _index);
			next();
		}

		function abort(){
			if(_loader!==null){
				_loader.load(null);
				_loader.error(null);
				_loader=null;
			}

			_index=0;
			_total=0;
			_list=null;
		}

		my.preload=preload;
		my.abort=abort;
		return my;
	};
	

});
