
var param = getUrlParams();
var $dropdownTarget = null;

function getUrlParams(){
	var params = {};
	window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
	return params;
}

function alertShow(type, message, dealy){
	var $el = $("<div class='alert alert-"+type+"'><button type='button' onclick='alertHide(this)' class='close'>×</button>"+message+"</div>");
	$("body").append($el);
	if(dealy != null){
		setTimeout(function(){$el.addClass("in");},100);
		setTimeout(function(){$el.removeClass("in");setTimeout(function(){$el.remove();},300);}, dealy);
	}else{
		setTimeout(function(){$el.addClass("in");},100);
	}
}
function alertHide(el){
	var $el = $(el).parent();
	$el.removeClass("in");
	setTimeout(function(){$el.remove();},300);
}

function shortenLargeNumber(num, digits){
	var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],decimal;
	for(var i=units.length-1; i>=0; i--){
		decimal = Math.pow(1000, i+1);
		if(num <= -decimal || num >= decimal) {
			return +(num / decimal).toFixed(digits) + units[i];
		}
	}
	return num;
}

function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function dropdownClose(el){
	$(el).remove();
	$dropdownTarget.parent().removeClass("open");
	$dropdownTarget.next().hide();
}

$(document).on("click", ".modal_container", function(e){
	if( e.target !== this ) return;
	$(this).parent().hide();
	$("body").removeClass("modal_on");
	$(this).parent().trigger("modal.hide");
});

$(document).on("click", "[data-toggle='modal']", function(){
	$($(this).data("target")).css("display","table");
	$("body").addClass("modal_on");
	$($(this).data("target")).trigger("modal.show");
});

$(document).on("click", "[data-close='modal']", function(){
	$("#"+$(this).closest(".modal_backdrop")[0].id).css("display","none");
	$("body").removeClass("modal_on");
});

$(document).on("click", ".dropdown_list > li > a", function(){
	if($dropdownTarget != null){
		$dropdownTarget.parent().removeClass("open");
		$(".dropdown_backdrop").remove();
		setTimeout(function(){
			if($dropdownTarget.parent().hasClass("open")) return;
			$dropdownTarget.next().hide();
		}, 250);
	}
});

$(document).on("click", "[data-toggle='dropdown']", function(event){
	if($dropdownTarget != null){
		if(!$dropdownTarget.is($(event.currentTarget))){
			$dropdownTarget.parent().removeClass("open");
			setTimeout(function(){
				if($dropdownTarget.parent().hasClass("open")) return;
				$dropdownTarget.next().hide();
			}, 250);
		}
	}
	$dropdownTarget = $(this);
	if($dropdownTarget.parent().hasClass("open")){
		$dropdownTarget.parent().removeClass("open");
		$(".dropdown_backdrop").remove();
		setTimeout(function(){
			$dropdownTarget.next().hide();
		}, 250);
	}else{
		if($("body").innerWidth() <= 768){
			var $target = $(this).next();
			$target.css({"margin-left":$target.width()/2*-1,"margin-top":$target.height()/2*-1});
			$("body").append("<div class='dropdown_backdrop' onclick='dropdownClose(this)'></div>");
		}
		$dropdownTarget.next().show();
		setTimeout(function(){
			$dropdownTarget.parent().addClass("open");
		}, 20);
	}
});

$("body").on("click", function(e){
	if ($(e.target).data('toggle') !== 'dropdown'
		&& $(e.target).parents('.dropdown.open').length === 0) {
		if($dropdownTarget != null){
			$dropdownTarget.parent().removeClass("open");
			setTimeout(function(){
				if($dropdownTarget.parent().hasClass("open")) return;
				$dropdownTarget.next().hide();
			}, 250);
		}
	}
});

var modal = {
	"show" : function(id){
		$("#"+id).css("display","table");
		$("body").addClass("modal_on");
	},
	"hide" : function(id){
		$("#"+id).css("display","none");
		$("body").removeClass("modal_on");
	}	
};