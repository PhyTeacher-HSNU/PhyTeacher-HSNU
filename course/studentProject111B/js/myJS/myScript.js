function log(e){
	console.log(e);
}


(function(){
	
	//大標題   titles:['h2XXX' , 'h4OOO']
	var sectionHWF = generateOneSection({'id':'homeworkF' , 'bg':'bgWhite' , titles:['h2期末專題']});
	var sectionHWE = generateOneSection({'id':'homeworkE' , 'bg':'bgGreen' , titles:['h2向右橫波']});
	var sectionHWD = generateOneSection({'id':'homeworkD' , 'bg':'bgWhite' , titles:['h2圓周運動']});
	var sectionHWC = generateOneSection({'id':'homeworkC' , 'bg':'bgGreen' , titles:['h2多球運動']});
	var sectionHWB = generateOneSection({'id':'homeworkB' , 'bg':'bgWhite' , titles:['h2密室小球']});
	var sectionHWA = generateOneSection({'id':'homeworkA' , 'bg':'bgGreen' , titles:['h2滾動']});
	
	//平時一 hwF
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF159034' ,'author':'1590簡郁珊', 'col':'12'});
	
	//平時一 hwE
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE159034' ,'author':'1590簡郁珊', 'col':'6'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE159517' ,'author':'1595吳宗餘', 'col':'6'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE159924' ,'author':'1599連振佑', 'col':'6'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE160526' ,'author':'1605黃宥翔', 'col':'6'});
	

	//平時一 hwD
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD159034' ,'author':'1590簡郁珊', 'col':'6'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD159517' ,'author':'1595吳宗餘', 'col':'6'});
	
	//平時一 hwC
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC159517' ,'author':'1595吳宗餘', 'col':'6'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC159034' ,'author':'1590簡郁珊', 'col':'6'});
	

	//平時一 hwB
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB159924' ,'author':'1599連振佑', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB159517' ,'author':'1595吳宗餘', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB159534' ,'author':'1595謝竣宇', 'col':'4'});
		
	
	

	
	//平時一 滾動 hwA
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA159034' ,'author':'1590簡郁珊', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA159517' ,'author':'1595吳宗餘', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA159924' ,'author':'1599連振佑', 'col':'4'});
	
		
		
		
	
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