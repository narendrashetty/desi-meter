$(window).load(function()
{

var arr=new Array();
var user= new Array();
	var url = "http://api.frrole.com/v1/curated-content?apikey=6rj59JDG8Vv9tAGnsQOL527dce0a83f66&location=india&orderby=popularity&poweruser=true";
		$.getJSON(url, function(json) {
		$('#slider-one').html('');
			var l=json.results.length;
			var k=0;
			var flag=1;
			var count=0;
			for(i=0;i<l;i++) {
			for(j=0;j<=k;j++)
			{
				
				if(json.results[i].username==user[j]){
					flag=0;
					break;
					}else {
					flag=1;	
					}
					
			}
			if(flag==1&&k<=50) {
			arr[k]=json.results[i].displayname;
			user[k++]=json.results[i].username;
		 $('#slider-one').append('<li><a id="'+json.results[i].id+'"><img src="'+json.results[i].profileimage+'" alt="picture"><p style="color:#fff;text-align: center;">'+ json.results[i].displayname +'</p></a></li>');
		 var n = json.results[i].displayname;
		 var s=0;
		 var url1 = "http://api.frrole.com/v1/curated-content?apikey=6rj59JDG8Vv9tAGnsQOL527dce0a83f66&location=world&resultcount=100&username="+json.results[i].username;
		$.getJSON(url1, function(json1) {
			for(m=0,s=0;m<json1.results.length;m++) {
			s+=parseInt(json1.results[m].sentiment);
			}
			 $('#leader').append('<tr><td>'+json1.results[0].displayname+'</td><td>'+json1.results.length+'</td><td>'+s+'</td></tr>');
		 
		});
		
		}		
		}


			doit(user[3]);
			didit(arr[3]);
		 console.log(arr);
		});
		
		$('#slider-one').bind("click",function(){
			
			
			var v=getUrl()["slider1"]; 

			doit(user[v-1]);
			
			didit(arr[v-1]);
			
			});
		
});		
	
	function doit(name) {
			var url = "http://api.frrole.com/v1/curated-content?apikey=6rj59JDG8Vv9tAGnsQOL527dce0a83f66&location=world&resultcount=100&username="+name;
		var j;
		$('#cn_list').html('');
		$.getJSON(url, function(json) {
			var sen=0;
			$('#tweets').text(json.results.length);
			for(i=0;i<json.results.length;i++) {
		 $('#cn_list').append('<div class="cn_page"><div class="cn_item"><img class="prof-img" src="'+json.results[i].profileimage+'" /><span class="name">'+json.results[i].displayname+'</span><br /><div class="id">@'+json.results[i].username+'</div><div class="content">'+json.results[i].tweet_text+'</div></div></div>');
		 sen+=parseInt(json.results[i].sentiment);
		 $('#sentiment').text(sen);
		}
					$('#cn_list div:first').css('display', 'block');	 
var s='<div class="cn_nav"><a id="cn_prev" class="cn_prev disabled"></a><p class="more">View More</p><a id="cn_next" class="cn_next"></a></div>';
$('#cn_list').append(s);		

rebind();			
		 
		});
		
}

	function didit(name) {
			var url = "http://api.frrole.com/v1/curated-content?apikey=6rj59JDG8Vv9tAGnsQOL527dce0a83f66&location=world&query="+name;
		var j;
		$('#cn_list1').html('');
		$.getJSON(url, function(json) {
			var sen=0;
			
			for(i=0;i<json.results.length;i++) {
		 $('#cn_list1').append('<div class="cn_page1"><div class="cn_item1"><img class="prof-img" src="'+json.results[i].profileimage+'" /><span class="name">'+json.results[i].displayname+'</span><br /><div class="id">@'+json.results[i].username+'</div><div class="content">'+json.results[i].tweet_text+'</div></div></div>');
		}
					$('#cn_list1 div:first').css('display', 'block');	 
var s='<div class="cn_nav1"><a id="cn_prev1" class="cn_prev1 disabled"></a><p class="more1">View More</p><a id="cn_next1" class="cn_next1"></a></div>';
$('#cn_list1').append(s);		

rebind();			
		 
		});
		
}
	
	function getUrl() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

function rebind() {
		slide("#cn_next","#cn_prev","#cn_list",".cn_page",".cn_item");	
		slide("#cn_next1","#cn_prev1","#cn_list1",".cn_page1",".cn_item1");	
}
	
	
setTimeout(function() {

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

	$('.mb-slider').bind('initialized.movingBoxes initChange.movingBoxes beforeAnimation.movingBoxes completed.movingBoxes',function(e, slider, tar){
		// show object ID + event in the console
		// namespaced events: e.g. e.type = "completed", e.namespace = "movingBoxes"
		if (window.console && window.console.log){
			var txt = slider.$el[0].id + ': ' + e.type + ', now on panel #' + slider.curPanel + ', targeted panel is ' + tar;
		}
	});
	
	$('.wrapper,.sub').css({"display":"block"});
			

},3000);

function slide(cn_nxt,cn_rev,cn_lst,cn_pag,ite) {
				/*
				for each item we store its index relative to all the document.
				we bind a click event that slides up or down the current item
				and slides up or down the clicked one. 
				Moving up or down will depend if the clicked item is after or
				before the current one
				*/
								var $cn_next	= $(cn_nxt);
				var $cn_prev	= $(cn_rev);
				//wrapper of the left items
				var $cn_list 	= $(cn_lst);
				var $pages		= $cn_list.find(cn_pag);
				//how many pages
				var cnt_pages	= $pages.length;
				//the default page is the first one
				var page		= 1;
				//list of news (left items)
				var $items 		= $cn_list.find(ite);
				//the current item being viewed (right side)
				//index of the item being viewed. 
				//the default is the first one
				var current= 1;
				
				$items.each(function(i){
					var $item = $(this);
					$item.data('idx',i+1);
					
					$item.bind('click',function(){
						var $this 		= $(this);
						$cn_list.find('.selected').removeClass('selected');
						$this.addClass('selected');
						var idx			= $(this).data('idx');
						var $current 	= $cn_preview.find('.cn_content:nth-child('+current+')');
						var $next		= $cn_preview.find('.cn_content:nth-child('+idx+')');
						
						if(idx > current){
							$current.stop().animate({'top':'-300px'},600,'easeOutBack',function(){
								$(this).css({'top':'310px'});
							});
							$next.css({'top':'310px'}).stop().animate({'top':'5px'},600,'easeOutBack');
						}
						else if(idx < current){
							$current.stop().animate({'top':'310px'},600,'easeOutBack',function(){
								$(this).css({'top':'310px'});
							});
							$next.css({'top':'-300px'}).stop().animate({'top':'5px'},600,'easeOutBack');
						}
						current = idx;
					});
				});
				
				/*
				shows next page if exists:
				the next page fades in
				also checks if the button should get disabled
				*/
				$cn_next.bind('click',function(e){
					var $this = $(this);
					$cn_prev.removeClass('disabled');
					++page;
					if(page == cnt_pages)
						$this.addClass('disabled');
					if(page > cnt_pages){ 
						page = cnt_pages;
						return;
					}	
					$pages.hide();
					$cn_list.find(cn_pag+':nth-child('+page+')').fadeIn();
					e.preventDefault();
				});
				/*
				shows previous page if exists:
				the previous page fades in
				also checks if the button should get disabled
				*/
				$cn_prev.bind('click',function(e){
					var $this = $(this);
					$cn_next.removeClass('disabled');
					--page;
					if(page == 1)
						$this.addClass('disabled');
					if(page < 1){ 
						page = 1;
						return;
					}
					$pages.hide();
					$cn_list.find(cn_pag+':nth-child('+page+')').fadeIn();
					e.preventDefault();
				});
				
            }