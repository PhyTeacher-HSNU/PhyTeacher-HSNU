function log(e){
	console.log(e);
}


(function(){
	
	//大標題   titles:['h2XXX' , 'h4OOO']
	var sectionFP = generateOneSection({'id':'homeworkF' , 'bg':'bgWhite' , titles:['h2期末專題']});
	var sectionHWE = generateOneSection({'id':'homeworkE' , 'bg':'bgGreen' , titles:['h2向右橫波']});
	var sectionHWD = generateOneSection({'id':'homeworkD' , 'bg':'bgWhite' , titles:['h2圓周運動']});
	var sectionHWC = generateOneSection({'id':'homeworkC' , 'bg':'bgGreen' , titles:['h2多球運動']});
	var sectionHWB = generateOneSection({'id':'homeworkB' , 'bg':'bgWhite' , titles:['h2密室小球']});
	var sectionHWA = generateOneSection({'id':'homeworkA' , 'bg':'bgGreen' , titles:['h2滾動']});
	
	//平時三 fp
	sectionFP.generateOneItem({'folder':'fp','name':'fp154520' ,'author':'1545張博崴', 'col':'4'});
	sectionFP.generateOneItem({'folder':'fp','name':'fp154706' ,'author':'1547呂育尚', 'col':'4'});
	sectionFP.generateOneItem({'folder':'fp','name':'fp154723' ,'author':'1547陳宣佑', 'col':'4'});
	sectionFP.generateOneItem({'folder':'fp','name':'fp154729' ,'author':'1547黃明遠', 'col':'4'});
	sectionFP.generateOneItem({'folder':'fp','name':'fp154431' ,'author':'1544黃暐傑', 'col':'4'});
	sectionFP.generateOneItem({'folder':'fp','name':'fp154722' ,'author':'1457陳冠宇', 'col':'4'});
	sectionFP.generateOneItem({'folder':'fp','name':'fp153938' ,'author':'1539蘇歆媛', 'col':'4'});
	sectionFP.generateOneItem({'folder':'fp','name':'fp154709' ,'author':'1547李瑋晨', 'col':'4'});
	
	//平時三 hwE
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE153932' ,'author':'1539盧德瑜', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE153938' ,'author':'1539蘇歆媛', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE154520' ,'author':'1545張博崴', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE154723' ,'author':'1547陳宣佑', 'col':'4'});
	sectionHWE.generateOneItem({'folder':'hwE','name':'hwE154729' ,'author':'1547黃明遠', 'col':'4'});
		
	//平時三 hwD
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD153938' ,'author':'1539蘇歆媛', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD154520' ,'author':'1445張博崴', 'col':'4'});
	sectionHWD.generateOneItem({'folder':'hwD','name':'hwD154723' ,'author':'1547陳宣佑', 'col':'4'});

	//平時三 hwC
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC153938' ,'author':'1539蘇歆媛', 'col':'4'});
	sectionHWC.generateOneItem({'folder':'hwC','name':'hwC154520' ,'author':'1445張博崴', 'col':'4'});

	//平時二 hwB
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB153938' ,'author':'1539蘇歆媛', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB154431' ,'author':'1544黃暐傑', 'col':'4'});
	sectionHWB.generateOneItem({'folder':'hwB','name':'hwB154520' ,'author':'1445張博崴', 'col':'4'});
	
	//平時一 滾動 hwA
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA153938' ,'author':'1539蘇歆媛', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwAdaan01' ,'author':'大安高工林祐德', 'col':'4'});
	sectionHWA.generateOneItem({'folder':'hwA','name':'hwA154809' ,'author':'1548吳彥廷', 'col':'4'});
	
		
		
		
	
		




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