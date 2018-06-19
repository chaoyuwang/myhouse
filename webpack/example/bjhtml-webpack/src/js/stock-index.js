

$(function () {
    //  右弹出框
    var lis = $("#all-contents").find("li");
    // var boxs = $(".layer-box");
    $(lis).hover(function () {
    	$(this).find("h3 a").css("color","#333");
		$(this).find(".layer-box").show();
    },function () {
        $(this).find("h3 a").css("color","#fff");
        $(this).find(".layer-box").hide();
    });

	//  购物车
	// var shopcatBox = $(".shopcat-box");
    // $(shopcatBox).hover(function () {
     //    $(this).find(".wst-cart-box").show();
    // },function () {
     //    $(this).find(".wst-cart-box").hide();
    // });
//
//
//     $(".nav-all").hover(function () {
//         $(".all-contents1").show();
//     },function () {
//         $(".all-contents1").hide()
//     })

//  列表页 商品筛选
// $(".sl-value li a").click(function(){
//     $(this).addClass("pitch").parent().siblings().children("a").removeClass("pitch");
// });

        // 添加id
        // var selectorLines = $(".selector-line").children(".sl-wrap");
        // for( var i = 0; i < selectorLines.length; i++ ){
        //     for ( var z = 0; z <= Number(i)+1;z++ ){
        //         var idName = "slWrap" + z;
        //         selectorLines.eq(i).attr("id",idName);
        //     }
        //     $(idName).find("a").click(function () {
        //         $(this).addClass("pitch").siblings().removeClass();
        //     })
        // }



    //  筛选 可用
    // var crumbLis = $(".crumb").find("li").addClass("crumbs-nav-item");
    // $(".sl-value a").click(function () {
    //     var crumbLis = $(".crumb").find("li");
    //     var lis = [];
    //     var key = $(this).parents(".sl-wrap").children(".sl-key").text();
    //     $(this).parentsUntil("ul").parents(".sl-wrap").hide();
    //     lis.push($(this));
    //     var item = "<li class='crumbs-nav-item'><a><b>" +key+ "</b><i>"+ $(this).html() +"</i><em></em></a></li>";
    //     $(".crumb ul").append(item);
    //     $("li.crumbs-nav-item").find("em").attr("class","delete");
    //
    //     // $(".delete").click(function(){
    //     //     $(this).parent().hide();
    //     // })
    // })
//    清空筛选
//     $("span.over").click(function () {
//         $("li.crumbs-nav-item").remove();
//     })

    $(".tabnav").find('li a').click(function(){
        $(this).addClass("xz").parent().siblings().children().removeClass();
        var index = $(this).parent("li").index();
        $(".detail-content").children().eq(index).show().siblings().hide();
        // if(opts.callback)opts.callback(index);
    });


    // 加
    $(".num-add").click(function(){
        var t = $(this).parent().find("input[class*=buy-num]");
        t.val(parseInt(t.val())+1);
    });
    // 减
    $(".num-min").click(function(){
        var t = $(this).parent().find( "input[class*=buy-num]" );
        t.val(parseInt(t.val())-1);
        if(parseInt(t.val()) <= 0){
            t.val(1);
        }
    });

    //   全选
    $(".chk-all").bind("click",function(){
        $("input[class *= chk-shop]").prop("checked",this.checked);
    });
});
