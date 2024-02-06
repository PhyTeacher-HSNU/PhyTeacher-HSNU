function log(e){
	console.log(e);
}


(function(){
	
	//大標題   titles:['h2XXX' , 'h4OOO']
	var sectionHWI = generateOneSection({'id':'homeworkI' , 'bg':'bgWhite' , titles:['h2專題研究']});
	var sectionHWH = generateOneSection({'id':'homeworkH' , 'bg':'bgGreen' , titles:['h2期末專題']});
	var sectionHWG = generateOneSection({'id':'homeworkG' , 'bg':'bgWhite' , titles:['h2中心力場']});
	var sectionHWF = generateOneSection({'id':'homeworkF' , 'bg':'bgGreen' , titles:['h2彈簧與物']});
	var sectionHWE = generateOneSection({'id':'homeworkE' , 'bg':'bgWhite' , titles:['h2連續背景']});
	var sectionHWD = generateOneSection({'id':'homeworkD' , 'bg':'bgGreen' , titles:['h2波動']});
	var sectionHWC = generateOneSection({'id':'homeworkC' , 'bg':'bgWhite' , titles:['h2氣體動力論']});
	var sectionHWB = generateOneSection({'id':'homeworkB' , 'bg':'bgGreen' , titles:['h2密室小球']});
	var sectionHWA = generateOneSection({'id':'homeworkA' , 'bg':'bgWhite' , titles:['h2滾動']});
	
	//I 專題研究 hwI
	sectionHWI.generateOneItem({'folder':'hwI','name':'hwI153403A' ,'author':'1534吳昱良', 'col':'6'});
	sectionHWI.generateOneItem({'folder':'hwI','name':'hwI153403B' ,'author':'1534吳昱良', 'col':'6'});
	

	//平時H 期末專題 hwH
//	sectionHWH.generateOneItem({'folder':'hwH','name':'hwH153312' ,'author':'1533林丞翊', 'col':'4'});
	sectionHWH.generateOneItem({'folder':'hwH','name':'hwH153317' ,'author':'1533倪德耀', 'col':'4'});
//	sectionHWH.generateOneItem({'folder':'hwH','name':'hwH153325' ,'author':'1533劉穆霖', 'col':'4'});
	sectionHWH.generateOneItem({'folder':'hwH','name':'hwH153327' ,'author':'1533鄭信一', 'col':'4'});
	sectionHWH.generateOneItem({'folder':'hwH','name':'hwH153329' ,'author':'1533鍾佳聿', 'col':'4'});
	sectionHWH.generateOneItem({'folder':'hwH','name':'hwH153401' ,'author':'1534王誼章', 'col':'4'});
	sectionHWH.generateOneItem({'folder':'hwH','name':'hwH153403' ,'author':'1534吳昱良', 'col':'4'});
//	sectionHWH.generateOneItem({'folder':'hwH','name':'hwH153405' ,'author':'1534呂東晉', 'col':'4'});
	sectionHWH.generateOneItem({'folder':'hwH','name':'hwH153414' ,'author':'1534孫堃展', 'col':'4'});
	sectionHWH.generateOneItem({'folder':'hwH','name':'hwH153426' ,'author':'1534劉興宸', 'col':'4'});
//	sectionHWH.generateOneItem({'folder':'hwH','name':'hwH153306' ,'author':'1533朱紹誠', 'col':'4'});
	sectionHWH.generateOneItem({'folder':'hwH','name':'hwH153321' ,'author':'1533黃家元', 'col':'4'});
	sectionHWH.generateOneItem({'folder':'hwH','name':'hwH153413' ,'author':'1534林瑋庭', 'col':'4'});


	//平時G 中心力場 hwG
//	sectionHWG.generateOneItem({'folder':'hwG','name':'hwG153312' ,'author':'1533林丞翊', 'col':'4'});
	sectionHWG.generateOneItem({'folder':'hwG','name':'hwG153317' ,'author':'1533倪德耀', 'col':'4'});
//	sectionHWG.generateOneItem({'folder':'hwG','name':'hwG153325' ,'author':'1533劉穆霖', 'col':'4'});
	sectionHWG.generateOneItem({'folder':'hwG','name':'hwG153327' ,'author':'1533鄭信一', 'col':'4'});
	sectionHWG.generateOneItem({'folder':'hwG','name':'hwG153329' ,'author':'1533鍾佳聿', 'col':'4'});
	sectionHWG.generateOneItem({'folder':'hwG','name':'hwG153401' ,'author':'1534王誼章', 'col':'4'});
	sectionHWG.generateOneItem({'folder':'hwG','name':'hwG153403' ,'author':'1534吳昱良', 'col':'4'});
//	sectionHWG.generateOneItem({'folder':'hwG','name':'hwG153405' ,'author':'1534呂東晉', 'col':'4'});
	sectionHWG.generateOneItem({'folder':'hwG','name':'hwG153414' ,'author':'1534孫堃展', 'col':'4'});
	sectionHWG.generateOneItem({'folder':'hwG','name':'hwG153426' ,'author':'1534劉興宸', 'col':'4'});
	sectionHWG.generateOneItem({'folder':'hwG','name':'hwG153306' ,'author':'1533朱紹誠', 'col':'4'});

	
	//平時F 彈簧與物 hwF
//	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF153312' ,'author':'1533林丞翊', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF153317' ,'author':'1533倪德耀', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF153325' ,'author':'1533劉穆霖', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF153327' ,'author':'1533鄭信一', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF153329' ,'author':'1533鍾佳聿', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF153401' ,'author':'1534王誼章', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF153403' ,'author':'1534吳昱良', 'col':'4'});
//	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF153405' ,'author':'1534呂東晉', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF153414' ,'author':'1534孫堃展', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF153426' ,'author':'1534劉興宸', 'col':'4'});
//	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF153306' ,'author':'1533朱紹誠', 'col':'4'});

	
	//平時E 連續背景 hwE
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE153312' ,'author':'1533林丞翊', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE153317' ,'author':'1533倪德耀', 'col':'4'});
//	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE153325' ,'author':'1533劉穆霖', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE153327' ,'author':'1533鄭信一', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE153329' ,'author':'1533鍾佳聿', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE153401' ,'author':'1534王誼章', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE153403' ,'author':'1534吳昱良', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE153405' ,'author':'1534呂東晉', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE153414' ,'author':'1534孫堃展', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE153426' ,'author':'1534劉興宸', 'col':'4'});
//	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE153306' ,'author':'1533朱紹誠', 'col':'4'});


	//平時D 波動 hwD
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD153317' ,'author':'1533倪德耀', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD153325' ,'author':'1533劉穆霖', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD153327' ,'author':'1533鄭信一', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD153329' ,'author':'1533鍾佳聿', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD153401' ,'author':'1534王誼章', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD153403' ,'author':'1534吳昱良', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD153405' ,'author':'1534呂東晉', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD153414' ,'author':'1534孫堃展', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD153426' ,'author':'1534劉興宸', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD153306' ,'author':'1533朱紹誠', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD153312' ,'author':'1533林丞翊', 'col':'4'});


	//平時二 密室小球 hwC
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC153312' ,'author':'1533林丞翊', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC153317' ,'author':'1533倪德耀', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC153325' ,'author':'1533劉穆霖', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC153327' ,'author':'1533鄭信一', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC153329' ,'author':'1533鍾佳聿', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC153401' ,'author':'1534王誼章', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC153403' ,'author':'1534吳昱良', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC153405' ,'author':'1534呂東晉', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC153414' ,'author':'1534孫堃展', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC153426' ,'author':'1534劉興宸', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC153306' ,'author':'1533朱紹誠', 'col':'4'});

	//平時二 密室小球 hwB
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB153306' ,'author':'1533朱紹誠', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB153312' ,'author':'1533林丞翊', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB153317' ,'author':'1533倪德耀', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB153325' ,'author':'1533劉穆霖', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB153327' ,'author':'1533鄭信一', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB153329' ,'author':'1533鍾佳聿', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB153401' ,'author':'1534王誼章', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB153403' ,'author':'1534吳昱良', 'col':'4'});
	//sectionHWB.generateOneItem({'folder':'hwB','name':'hwB153405' ,'author':'1534呂東晉', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB153414' ,'author':'1534孫堃展', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB153426' ,'author':'1534劉興宸', 'col':'4'});

	//平時一 滾動 hwA
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA153306' ,'author':'1533朱紹誠', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA153312' ,'author':'1533林丞翊', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA153317' ,'author':'1533倪德耀', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA153325' ,'author':'1533劉穆霖', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA153327' ,'author':'1533鄭信一', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA153329' ,'author':'1533鍾佳聿', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA153401' ,'author':'1534王誼章', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA153403' ,'author':'1534吳昱良', 'col':'4'});
	//sectionHWA.generateOneItem({'folder':'hwA','name':'hwA153405' ,'author':'1534呂東晉', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA153414' ,'author':'1534孫堃展', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA153426' ,'author':'1534劉興宸', 'col':'4'});



	//generate one section
	function generateOneSection(initObj){
		//varligColorIns
		var id=initObj.id||'';
		var bg=initObj.bg||'bgWhite';//預設白底, bgWhite, bgGreen
		var sectClass=(bg==='bgWhite'?'portfolio':'success portfolio2');//section class
		var starClass=(bg==='bgWhite'?'star-primary':'star-light');//star class

		
		//tags
		var sect = $('<section>').attr('class',sectClass).attr('id',id);
		sect.generateOneItem = generateOneItem;
		var containerDiv = $('<div>').attr('class','container');
		var rowTitleDiv = $('<div>').attr('class','row');//row title
		//titles
		if(initObj.titles){
			var titleDiv=$('<div>').attr('class','col-lg-12 text-center');
			var len=initObj.titles.length;
			for(var i=0 ; i<len ; i++){
				var str = initObj.titles[i];
				var hhStr = str.substring(0,2);log(hhStr);
				var title = str.substring(2,1000);
				var hhTag=$('<'+hhStr+'>').html(title);
				titleDiv.append(hhTag);
			}
		
		}
		titleDiv.append($('<hr>').attr('class',starClass));
		sect.rowContentDiv = $('<div>').attr('class','row');//row content,學生作業加到這

		
		//append 組裝
		sect.append(containerDiv.append(rowTitleDiv.append(titleDiv)).append(sect.rowContentDiv));
		$('#allStudentProject').append(sect);


		//return
		return sect;
		


	}


	function generateOneItem(itemObj){
		//pointer
		var rowContentDiv = this.rowContentDiv;

		//vars
		var folder=itemObj.folder;
		var name=itemObj.name;
		var type=itemObj.type||'swf';
		var col=itemObj.col||'4';
		var author=itemObj.author;

		//strings
		var itemClass = 'col-sm-'+col+' portfolio-item';
		var smallImgSrc='homeworks/'+folder+'/'+name+'/'+name+'.png';
		//make url(onePage的網址，可傳值)
		var url='homeworks/'+folder+'/'+name+'/index.html';
		
		

		//tags
		var itemDiv=$('<div>').attr('class' , itemClass);
		var aa=$('<a>').attr('href',url).attr('class','portfolio-link').attr('target','_blank');
		var captionDiv=$('<div>').attr('class','caption');
		var capContentDiv=$('<div>').attr('class','caption-content');
		var ii=$('<i>').attr('class','fa fa-search-plus fa-3x');
		var img=$('<img>').attr('src',smallImgSrc).attr('class','img-responsive')

		//append 組裝
		itemDiv.append(aa.append(captionDiv.append(capContentDiv.append(ii))).append(img));
		rowContentDiv.append(itemDiv);


	}
	

})();