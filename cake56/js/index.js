
	var obox=document.getElementById("banner");
	var ali=obox.getElementsByTagName("li");
    window.onload=function(){
    	for(var i=0;i<ali.length;i++)
			{
				ali[i].style.width=obox.offsetWidth+"px";
				obox.style["height"]=ali[0].offsetHeight+"px";
			}
     }
	var banner={
		 oul:"",
		 obox:obox,
		 ali:ali,
		 cricle:"",
		 aa:"",
		 innow:0,
		 timer:null,
		 wy:"",
		init:function(){
			this.oul=document.getElementById("pic");
			this.cricle=document.getElementById("circle");
			this.aa=this.cricle.getElementsByTagName("a");
			var img = this.ali[0].cloneNode(true);	
			this.oul.appendChild(img);
			this.oul.style.width=this.ali.length*this.obox.offsetWidth+"px";
			this.autoplay();
			var _this=this;
			this.oul.onmouseover=function(){

              _this.over();
			}
			this.oul.onmouseout=function(){
				_this.outer();
			}
			//点击小圆点移到具体的banner
			this.circlemove();
			this.serve();//鼠标移上去显示二级菜单
			
			},
		autoplay:function(){
			var _this=this;
           this.timer=setInterval(function(){
           	if(_this.innow==_this.ali.length-1)
           	{
               _this.innow=1;
               _this.oul.style.left=0;
           	}
           	else {
           		_this.innow++;
           	}
           	_this.toimag();
           },4000)
		},
		toimag:function(){
          move(this.oul,{"left":this.ali[0].offsetWidth*-this.innow});
          for(var i=0;i<this.aa.length;i++)
          {
              this.aa[i].className="";
          }
          this.aa[this.innow==this.ali.length-1?0:this.innow].className="active";

		},
		over:function(){
			clearInterval(this.timer);
		},
		outer:function(){
			this.autoplay();
		},
		//鼠标移上小圆点
		circlemove:function(){
			for(var i=0;i<this.aa.length;i++)
			{
				var _this=this;
				this.aa[i].index=i;
			   this.aa[i].onmouseover=function(){
              for(var j=0;j<_this.aa.length;j++)
			  {

			  	     _this.aa[j].className="";
			  	    
			  }
		  _this.aa[this.index].className="active";
	      move(_this.oul,{"left":-(this.index)*(_this.ali[0].offsetWidth)});//运动要改变
	      _this.innow=this.index;   

		   }
		}
		},
	  serve:function(){
	  	this.wy=document.getElementById("wy");
	  	var cook=document.getElementById("cook");
	  	this.wy.onmouseover=function(){
           cook.style.display="block";
	  	}
	  	this.wy.onmouseout=function(){
           cook.style.display="none";
	  	}
	  }	
}
 banner.init();

ajax("post","cake.json","",function (obj){
 var piclist={
 	id:"",
 	list:{},
 	titlelist:"",
 	aali:"",
 	init:function(){
 		this.list =document.getElementById("list-pic");
 		var str="";
 		for(var i=0;i<12;i++)
		   {
			    str+= "<li data-id="+obj[i].id+"><a href='##'> <span> <img src="+obj[i].image.pic1+"> </span> <p>"+obj[i].cakename+"<i>"+obj[i].price+"</i></p> </a> </li>";
		   }
		this.list.innerHTML=str;
   this.getsorce();
   this.click();
 },
 getsorce:function(){
 	var title=document.getElementById("title-list");
 	this.aali=title.querySelectorAll("li");
 	for(var i=0;i<this.aali.length;i++)
 	{
 		var _this=this;
 	  this.aali[i].index=i;
      this.aali[i].onclick=function(){
      	 _this.list.innerHTML="";
      	switch (this.index) {
      		case 0:
      		     var str="";
      			 for(var i=0;i<12;i++)
				   {
					    str+="<li data-id="+obj[i].id+"><a href='##'> <span> <img src="+obj[i].image.pic1+"> </span> <p>"+obj[i].cakename+"<i>"+obj[i].price+"</i></p> </a> </li>"; 
				   
				   }
				   
      			break;
      		case 1:
      		    var str="";
      			for(var i=4;i<16;i++)
				   {
					    str+= "<li data-id="+obj[i].id+"><a href='##'> <span> <img src="+obj[i].image.pic1+"> </span> <p>"+obj[i].cakename+"<i>"+obj[i].price+"</i></p> </a> </li>";
				   }
				    
      			break;
      		case 2:
      		  var str="";
      			for(var i=16;i<30;i++)
				   {
					    str+= "<li data-id="+obj[i].id+"><a href='##'> <span> <img src="+obj[i].image.pic1+"> </span> <p>"+obj[i].cakename+"<i>"+obj[i].price+"</i></p> </a> </li>"; 
				   }
				 
      			break;
      		case 3:
      		    var str="";
      			for(var i=30;i<37;i++)
				   {
					    str+= "<li data-id="+obj[i].id+"><a href='##'> <span> <img src="+obj[i].image.pic1+"> </span> <p>"+obj[i].cakename+"<i>"+obj[i].price+"</i></p> </a> </li>";
				   }
				
      			break;
      		case 4:
      		       var str="";
      			    var i=37;
				     str= "<li data-id="+obj[i].id+"><a href='##'> <span> <img src="+obj[i].image.pic1+"> </span> <p>"+obj[i].cakename+"<i>"+obj[i].price+"</i></p> </a> </li>";
      			break;
      		case 5:
      		    var str="";
      			for(var i=38;i<40;i++)
				   {
					    str+= "<li data-id="+obj[i].id+"><a href='##'> <span> <img src="+obj[i].image.pic1+"> </span> <p>"+obj[i].cakename+"<i>"+obj[i].price+"</i></p> </a> </li>";
				   }
      			break;
      	    default:{
      	    	str+="<li>没有更多数据了</li>";
      	    }
      	}
      	 _this.list.innerHTML=str;
      }
 	}
 },
 click:function(e){
 	var _this = this;
 	this.list.onclick=function(e){
   	 var e=e||event;
   	 var target = e.target || e.srcElement;
   	 if(e.target.tagName=="IMG")
   	 {
   	 	var id =target.parentNode.parentNode.parentNode.getAttribute("data-id");
   	 	_this.id=id;
   	 	window.open("detail.html?"+_this.id);
   	 }
   }
 }
}
piclist.init();
})
