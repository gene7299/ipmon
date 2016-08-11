//Render Mode
var stationList = ['莘庄','外环路','莲花路','锦江乐园','上海南站','漕宝路','上海体育馆','徐家汇','衡山路','常熟路','陕西南路','黄陂南路','人民广场','新闸路','汉中路','上海火车站','中山北路','延长路','上海马戏城','汶水路','彭浦新村','共康路','通河新村','呼兰路'];//,'共富新村','宝安公路','友谊西路','富锦路'];
//{disable? transfer stop? start? end? name? enname?  }
var routemaker = null;
var _routemaker = function(id) {
		var handle = {};

    handle.circle = false;
    handle.displaytd = 'right';
		handle.width = 2800;
		handle.height = 540;
		handle.oheight = 0;
		handle.routepointRatio = 0.25;
		handle.cwidth = 50;
		handle.namefontsize = 50;
		handle.animode = '';
		handle.lineWidth = 16;

		var nowStation = 1;
		var prevStation = 0;
		var nextStation = 0;

		var widthForOneStation = 100;
		var cwidth = 50;
		var cborder = 10;
		var crlwidth = cwidth + cborder;
		var namefontsize = 50;

		var lineWidth = 16;
		var onePeriod = null;
		var onePeriodTimeout = null;


		var $route_point;
		var $route_name;

    build = function() {
				cwidth = handle.cwidth;
				namefontsize = handle.namefontsize;
				lineWidth = handle.lineWidth;
				/*
				if( typeof( window.innerWidth ) == 'number' ) {
					handle.width = window.innerWidth;
					handle.height = window.innerHeight;//*parseFloat(handle.showRatio)/100;
					//handle.oheight = window.innerHeight;
				} else if( typeof( window.innerWidth ) == 'number' ){
					handle.width = document.documentElement.clientWidth;
					handle.height = document.documentElement.clientHeight;//*parseFloat(handle.showRatio)/100;
					//handle.oheight = document.documentElement.clientHeight;
				} else {
					handle.width = document.body.offsetWidth;
					handle.height = document.body.offsetHeight;//*parseFloat(handle.showRatio)/100;
					//handle.oheight = document.body.offsetHeight;
				}
				*/
				console.log('handle.width='+handle.width+";handle.height="+handle.height);

				var route_width = parseInt(handle.width);
				var route_height = parseInt(handle.height);

				$route_point = $('#'+id).find('.route_point');
				$route_name = $('#'+id).find('.route_name');

				$route_point.css('width',route_width+"px");
				$route_point.css('height',route_height*handle.routepointRatio+"px");
				$route_point.css('top',0+"px");
				$route_point.css('left',0+"px");
				$route_name.css('width',route_width+"px");
				$route_name.css('height',route_height*(1-handle.routepointRatio)+"px");
				$route_name.css('top',route_height*handle.routepointRatio+"px");
				$route_name.css('left',0+"px");

				widthForOneStation = handle.width/stationList.length;
				console.log("widthForOneStation="+widthForOneStation);
				$('body').append('<style>.'+id+'_station_point_wrapper{width:'+ widthForOneStation +'px;}</style>');
				//$('.route').append('<style>.route_name{width:'+ widthForOneStation +'px;}</style>');
				$('body').append('<style>.'+id+'_station_point{margin-top:'+(handle.height*handle.routepointRatio-(cwidth+cborder+cborder))/2+'px;width:'+ cwidth +'px;height:'+ cwidth +'px;border-width:'+ cborder +'px;}</style>');
				$('body').append('<style>.'+id+'_station_name{width:'+ widthForOneStation +'px;font-size:'+ namefontsize +'px;}</style>');

				$(function(){
					for(var i = 0; i<stationList.length ; i++){
						$route_point.append('<div id="'+id+'_station_point_wrapper_' + i + '" class="station_point_wrapper '+id+'_station_point_wrapper" style="top:'+0+'px;left:'+widthForOneStation*i+'px"></div>');
						$('#'+id+'_station_point_wrapper_' + i ).append('<div id="'+id+'_station_point_' + i + '" class="station_point '+id+'_station_point"></div>');
						$route_name.append('<div id="'+id+'_station_name_' + i + '" class="station_name '+id+'_station_name">'+stationList[i]+'</div>');
					}
				});
				/**create link**/
				$(function(){
					for(var i = 0; i<stationList.length-1 ; i++){
						$route_point.append('<div id="'+id+'_point_link_'+i+'" class="point_link hide"><div id="'+id+'_crumbs_'+i+'" class="crumbs '+id+'_crumbs"><ul id="'+id+'_crumbs_ul_'+i+'"><li><a id="'+id+'_cline_'+i+'_0" href="#1"></a></li><li><a id="'+id+'_cline_'+i+'_1" href="#2"></a></li><li><a id="'+id+'_cline_'+i+'_2" href="#3"></a></li></ul></div></div>');
						$('body').append('<style>#'+id+'_point_link_'+i+'{top:'+parseInt((handle.height*handle.routepointRatio-lineWidth)/2)+'px;left:'+parseInt(handle.width*0.005+cwidth+((widthForOneStation)*i))+'px;width:'+ parseInt(widthForOneStation-crlwidth)*3 +'px;height:'+lineWidth+'px;}</style>');
					}
				});
				var oneOflinktotalLen = parseInt((widthForOneStation-crlwidth)/3)+1;
				console.log('oneOflinktotalLen='+oneOflinktotalLen);
				var margin = 8;
				var crumbsHeight = parseInt(lineWidth*0.85);
				var crumbs_padding = lineWidth/2;
				var crumbsWidth = (oneOflinktotalLen - crumbs_padding - margin);
				var crumbs_padding_top = lineWidth-crumbsHeight;//2*crumbs_padding - crumbsHeight;
				var firstwidth = crumbsWidth-crumbs_padding;
				var html_crumbs = "<style>";
				html_crumbs += "."+id+"_crumbs ul li a {height:"+crumbsHeight+"px;}";
				html_crumbs += "."+id+"_crumbs ul li a {padding-top:"+crumbs_padding_top+"px;}";
				html_crumbs += "."+id+"_crumbs ul li a {padding-right:"+crumbs_padding+"px;}";
				html_crumbs += "."+id+"_crumbs ul li a {margin-right:"+margin+"px;}";
				html_crumbs += "."+id+"_crumbs ul li a {width:"+crumbsWidth+"px;}";
				html_crumbs += "."+id+"_crumbs ul li:first-child a {width:"+firstwidth+"px;}";

				html_crumbs += "."+id+"_crumbs ul li a:after {border-top-width:"+crumbs_padding+"px;}";
				html_crumbs += "."+id+"_crumbs ul li a:after {border-bottom-width:"+crumbs_padding+"px;}";
				html_crumbs += "."+id+"_crumbs ul li a:after {border-left-width:"+crumbs_padding+"px;}";
				html_crumbs += "."+id+"_crumbs ul li a:after {right:-"+crumbs_padding+"px;}";

				html_crumbs += "."+id+"_crumbs ul li a:before {border-top-width:"+crumbs_padding+"px;}";
				html_crumbs += "."+id+"_crumbs ul li a:before {border-bottom-width:"+crumbs_padding+"px;}";
				html_crumbs += "."+id+"_crumbs ul li a:before {border-left-width:"+crumbs_padding+"px;}";

				html_crumbs += "</style>";
				$('body').append(html_crumbs);

				console.log('build object[]!!');

    };
    build.gogo = function(nNowStation) {
				clearInterval(onePeriod);
				onePeriod = null;
				clearTimeout(onePeriodTimeout);
				onePeriodTimeout = null;

				nowStation = nNowStation;

   			//process nowStation action
				$(function(){
					for(var i = 0; i<stationList.length ; i++){
						if(i<nowStation){
							$('#'+id+'_station_point_' + i ).addClass('station_point_past');
							$('#'+id+'_station_name_' + i ).addClass('station_name_past');

							$('#'+id+'_station_point_' + i ).removeClass('station_point_current');
							$('#'+id+'_station_name_' + i ).removeClass('station_name_current');
							$('#'+id+'_station_point_' + i ).removeClass('station_point_feature');
						}else if(i == nowStation){
							$('#'+id+'_station_point_' + i ).addClass('station_point_current');
							$('#'+id+'_station_name_' + i ).addClass('station_name_current');

							$('#'+id+'_station_point_' + i ).removeClass('station_point_past');
							$('#'+id+'_station_name_' + i ).removeClass('station_name_past');
							$('#'+id+'_station_name_' + i ).removeClass('station_point_feature');
						}else{
							$('#'+id+'_station_point_' + i ).addClass('station_point_feature');

							$('#'+id+'_station_point_' + i ).removeClass('station_point_past');
							$('#'+id+'_station_name_' + i ).removeClass('station_name_past');
							$('#'+id+'_station_point_' + i ).removeClass('station_point_current');
							$('#'+id+'_station_name_' + i ).removeClass('station_name_current');
						}
					}
				});
				$(function(){
					for(var i = 0; i<nowStation-1 ; i++){
						$('#'+id+'_point_link_'+i).removeClass('hide');
					}
					for(var j = nowStation-1; j < stationList.length-1 ; j++){
						$('#'+id+'_point_link_'+j).addClass('hide');
					}
				});
				var freq = 100;
				if(handle.animode == "partial"){
					freq = 300;
				}
				function doLinkAnimation(){
					var nowidx = nowStation-1;
					onePeriod = setInterval(function(){
						$('#'+id+'_point_link_'+nowidx).removeClass('hide');
						nowidx++;
						var showLen = stationList.length-1;
						if(handle.animode == "partial"){
							showLen = nowStation + 3;
							if(showLen>=stationList.length-1){
								showLen = stationList.length-1;
							}
						}
						console.log('nowidx='+nowidx);
						console.log('showLen='+showLen);

						if(nowidx >= showLen){
							nowidx = nowStation-1;
							clearInterval(onePeriod);
							onePeriodTimeout = setTimeout(function(){
								if(onePeriodTimeout!==null){
									for(var i = nowStation-1; i<stationList.length-1 ; i++){
										$('#'+id+'_point_link_'+i).addClass('hide');
									}
									doLinkAnimation();
								}
							},300);
						}
					},freq);
				}
				doLinkAnimation();

        return build;
    };
		build.getwidthForOneStation = function(){
			return widthForOneStation;
		}
    for (i$ in handle) {
        fn$(i$);
    }
    return build;

    function fn$(it) {
        build[it] = function(v) {
            if (arguments.length === 0) {
                return handle[it];
            } else {
                handle[it] = v;
                return build;
            }
        };
    }
};

$(document).ready(function() {
		console.log("ready!");
    if (getParameterFromURL(document.location.href, 'preview') == 'true') {
        isPreview = true;
        console.log('Preview Mode!!');
    }

		var viewportH = 1920;
		var viewportV = 1080;
		if( typeof( window.innerWidth ) == 'number' ) {
			viewportH = window.innerWidth;
			viewportV = window.innerHeight;//*parseFloat(handle.showRatio)/100;
			//handle.oheight = window.innerHeight;
		} else if( typeof( window.innerWidth ) == 'number' ){
			viewportH = document.documentElement.clientWidth;
			viewportV = document.documentElement.clientHeight;//*parseFloat(handle.showRatio)/100;
			//handle.oheight = document.documentElement.clientHeight;
		} else {
			viewportH = document.body.offsetWidth;
			viewportV = document.body.offsetHeight;//*parseFloat(handle.showRatio)/100;
			//handle.oheight = document.body.offsetHeight;
		}
		$('.viewport').css('width',viewportH);
		$('.viewport').css('height',viewportV);

		$('#route2').css('width',viewportH);
		$('#route2').css('height',viewportH*370/1920);
		/*
		var direction = 'right';
		setInterval(function(){
			var nowpos = Math.abs(parseInt($('.main').css('left')));
			console.log('nowpos='+nowpos);
			if(nowpos >= parseInt($('.main').css('width')) - parseInt($('.viewport').css('width'))){
				direction = 'left';
			}
			if(nowpos <= 0){
				direction = 'right';
			}
			if(direction == 'right'){
				nowpos++;
			}else{
				nowpos--;
			}
			$('.main').css('left',"-"+nowpos+"px");
		},30);
		*/
		/*
		$(function runBlink(){
			setInterval(function(){
				if($('.blink').css('display') === 'block'){
					$('.blink').css('display','none');
				}else{
					$('.blink').css('display','block');
				}
			},500);
		});
		*/
		routemaker1 = _routemaker('route1').cwidth(70).lineWidth(30).animode('partial').namefontsize(70).width(parseInt($('#route1').css('width'))).height(parseInt($('#route1').css('height')));
		routemaker1();
		routemaker1.gogo(1);

		routemaker2 = _routemaker('route2').cwidth(30).lineWidth(16).animode('fullmap').namefontsize(30).width(parseInt($('#route2').css('width'))).height(parseInt($('#route2').css('height')));
		routemaker2();
		routemaker2.gogo(2);
		var now = 0;
		var widthForOneStation = routemaker1.getwidthForOneStation();
		setInterval(function(){
			var nextLeft = now*widthForOneStation*(-1);
			$('#route1').animate({'left':nextLeft+"px"},"easeOutBounce");
			now++;
			if(now>stationList.length-1){
				now = 0;
			}
			routemaker1.gogo(now);
			routemaker2.gogo(now);
		},3000);

		var toggle = true;
		setInterval(function(){
			if(toggle){
				$('#route_viewport1').addClass('hide');
				$('#imgdoor').addClass('hide');
				$('#route_viewport2').removeClass('hide');
			}else{
				$('#route_viewport2').addClass('hide');
				$('#route_viewport1').removeClass('hide');
				$('#imgdoor').removeClass('hide');
			}
			toggle = !toggle;
		},10000);

});

var urlParams = null;

function std_urlparser(QueryString) {
    var match,
        pl = /\+/g, // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function(s) {
            return decodeURIComponent(s.replace(pl, " "));
        },
        query = QueryString; //window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
}


function getParameterFromURL(url, name) {
    if (urlParams == null) {
        var queryString = url.substring(url.indexOf('?') + 1);
        std_urlparser(queryString);
    }

    return urlParams[name];
    //url = url;
    //return dogetUrlParameter(name);
    //return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
}

String.prototype.startsWith = function(prefix) {
    return (this.substr(0, prefix.length) === prefix);
}

String.prototype.endsWith = function(suffix) {
    return (this.substr(this.length - suffix.length) === suffix);
}

String.prototype.contains = function(txt) {
    return (this.indexOf(txt) >= 0);
}
