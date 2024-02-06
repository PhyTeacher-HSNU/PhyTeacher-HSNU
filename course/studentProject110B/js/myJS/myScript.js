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
	
	//期末 hwF
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF156327' ,'author':'1563游奕萱', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF156328' ,'author':'1563程暄雯', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF156820' ,'author':'1568陳米姍', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF157101' ,'author':'1571王克洋', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF157315' ,'author':'1573郁博勛', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF157321' ,'author':'1573張庭睿', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF157401' ,'author':'1574方世燊', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF157513' ,'author':'1575林郁澔', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF157519' ,'author':'1575張嘉原', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF157611' ,'author':'1576林宸宇', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF157935' ,'author':'1579劉益全', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF158103' ,'author':'1581江倍伸', 'col':'4'});
	sectionHWF.generateOneItem({'folder':'hwF','name':'hwF999900' ,'author':'金甌女中呂珮嘉', 'col':'4'});
	
	//平時 hwE
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE156328' ,'author':'1563程暄雯', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE156820' ,'author':'1568陳米姍', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE157101' ,'author':'1571王克洋', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE157127' ,'author':'1571陳睿杰', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE157401' ,'author':'1574方世燊', 'col':'4'});

	//平時 hwD
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD156327' ,'author':'1563游奕萱', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD156328' ,'author':'1563程暄雯', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD156820' ,'author':'1568陳米姍', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD157101' ,'author':'1571王克洋', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD157127' ,'author':'1571陳睿杰', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD157138' ,'author':'1571羅允佑', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD157321' ,'author':'1573張庭睿', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD157401' ,'author':'1574方世燊', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD157611' ,'author':'1576林宸宇', 'col':'4'});
		

	//平時 hwC
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC156328' ,'author':'1563程暄雯', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC157611' ,'author':'1576林宸宇', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC157101' ,'author':'1571王克洋', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC157127' ,'author':'1571陳睿杰', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC157138' ,'author':'1571羅允佑', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC157401' ,'author':'1574方世燊', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC999900' ,'author':'金甌女中呂珮嘉', 'col':'4'});
		
		
		
		
		
		
	

	//平時 hwB
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB156327' ,'author':'1563游奕萱', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB156328' ,'author':'1563程暄雯', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB156820' ,'author':'1568陳米姍', 'col':'4'});
	
	//平時一 滾動 hwA
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA156328' ,'author':'1563程暄雯', 'col':'6'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA156820' ,'author':'1568陳米姍', 'col':'6'});


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