﻿function log(e){
	console.log(e);
}


(function(){
	
	//大標題   titles:['h2XXX' , 'h4OOO']
	var sectionHWF = generateOneSection({'id':'homeworkF' , 'bg':'bgWhite' , titles:['h2期末專題']});
	var sectionHWE = generateOneSection({'id':'homeworkE' , 'bg':'bgGreen' , titles:['h2向右橫波']});
	var sectionHWD = generateOneSection({'id':'homeworkD' , 'bg':'bgWhite' , titles:['h2圓周運動']});
	var sectionHWC = generateOneSection({'id':'homeworkC' , 'bg':'bgGreen' , titles:['h2多球運動']});
	var sectionHWB = generateOneSection({'id':'homeworkB' , 'bg':'bgWhite' , titles:['h2密室小球']});
	var sectionHWA = generateOneSection({'id':'homeworkA' , 'bg':'bgWhite' , titles:['h2滾動']});
	
	//平時 hwF
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF156801' ,'author':'1568丁卲君', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF156403' ,'author':'1564王俐惠', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF156926' ,'author':'1569張劭安', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF157303' ,'author':'1573朱浩鋒', 'col':'4'});

	//平時 hwE
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE156801' ,'author':'1568丁卲君', 'col':'12'});
	
	
	//平時 hwD
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD156801' ,'author':'1568丁卲君', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD156926' ,'author':'1569張劭安', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD157823' ,'author':'1578張善一', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD157927' ,'author':'1579陳岳霆', 'col':'4'});
		
	//平時 hwC
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC156926' ,'author':'1569張劭安', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC156910' ,'author':'1569胡晏慈', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC157303' ,'author':'1573朱浩鋒', 'col':'4'});

	//平時 hwB
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB156801' ,'author':'1568丁卲君', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB157303' ,'author':'1573朱浩鋒', 'col':'4'});
	
	
	//平時一 滾動 hwA
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA157918' ,'author':'1579洪翊哲', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA156801' ,'author':'1568丁卲君', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA156910' ,'author':'1569胡晏慈', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA156926' ,'author':'1569張劭安', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA156516' ,'author':'1565洪宜蓁', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA157904' ,'author':'1579任禹丞', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA157303' ,'author':'1573朱浩鋒', 'col':'4'});
		

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