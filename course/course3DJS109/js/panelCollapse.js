//====掃瞄並摺疊 once====//
//Section and Content (once)
var allMySection = document.querySelectorAll("li.mySection");
var allMyContent = document.querySelectorAll("li.myContent");
var len=allMySection.length;
for(var i=0;i<len;i++){
    $(allMySection[i]).addClass('list-group-item');
    $(allMyContent[i]).addClass('list-group-item');
    var who=allMySection[i].id;
    
    if(localStorage[who]==="1" && who){//expand
        $($('#'+who)).append(//加入按鈕
            "<a><span class='pull-right panel-expanded clickable'><i class='glyphicon glyphicon-minus'></i></span></a>"
        );
        $($('#'+who+'_')).slideDown();
        /*$(allMySection[i]).append(//加入按鈕
            "<a><span class='pull-right panel-expanded clickable'><i class='glyphicon glyphicon-minus'></i></span></a>"
        );
        $(allMyContent[i]).slideDown();*/
    }else if(who){//collapse
        if($('#'+who).hasClass('btnPM')){
            $('#'+who).append(//加入按鈕
                "<a><span class='pull-right panel-collapsed clickable'><i class='glyphicon glyphicon-plus'></i></span></a>"
            );
        }
        $('#'+who+'_').slideUp();

        /*$(allMySection[i]).append(//加入按鈕
            "<a><span class='pull-right panel-collapsed clickable'><i class='glyphicon glyphicon-plus'></i></span></a>"
        );
        $(allMyContent[i]).slideUp();*/
    }
}


//panel
var allMyPanel = document.querySelectorAll(".panel");


//按鈕動作，摺疊展開
jQuery(function ($) {
        $('.list-group-item span.clickable').on("click", function (e) {
            var who=$(this).parents('.mySection')[0].id;//console.log(who);//取得id
            if ($(this).hasClass('panel-collapsed')) {
                // expand the panel
                $('#'+who+'_').slideDown();
                $(this).removeClass('panel-collapsed').addClass('panel-expanded');
                $(this).find('i').removeClass('glyphicon-plus').addClass('glyphicon-minus');
            }
            else {
                // collapse the panel
                $('#'+who+'_').slideUp();
                $(this).removeClass('panel-expanded').addClass('panel-collapsed');
                $(this).find('i').removeClass('glyphicon-minus').addClass('glyphicon-plus');
            }
            //save
            savePage();
        });
    });



//紀錄網頁狀態
function savePage(){
    
    //Section
    len=allMySection.length;
    for(i=0;i<len;i++){
        is1=($(allMySection[i]).find('span').hasClass('panel-expanded')?"1":"0");
       // console.log(allMySection[i].id+" ,"+is1);
        localStorage[allMySection[i].id] = is1;
    }
    console.log('savePage!!');
}


