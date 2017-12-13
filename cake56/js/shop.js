ajax("get","cake.json","",function (obj){
	 var shoplist={
	 	olist:"",
	 	str:"",
	 	id:"",
	 	obj1:{},
	 	obj2:{},
	 	allcheck:"",
	 	check:"",
	 	allsum:0,
	 	del:"",
	 
	 	init:function(){
            this.getcookie();
            this.btncheck();
            this.addnum();
            this.addsum();
            this.delet();
            this.serve();
	 	},
	 	serve:function(){
	     var wy=document.getElementById("wy");
	        var cook=document.getElementById("cook");
	        wy.onmouseover=function(){
           cook.style.display="block";
        }
         wy.onmouseout=function(){
           cook.style.display="none";
      }
    } ,//获取cookie显示商品
	 	getcookie:function(){
	 		if(getCookie("shoping"))
			 {
			 	var shoping = JSON.parse(getCookie("shoping"));
			 	this.obj1=shoping;
			 }
			
	 	this.olist=document.getElementById("shop-list");
        for(var i in this.obj1)
        {
        	i=parseInt(i);
        	if(!Number.isNaN(i))
        	{
        		var sum=this.obj1[i]*obj[i].sale;
        	 	this.str+="<li data-id="+obj[i].id+"><div class='product-mesg'><input type='checkbox' class='check'><span class='pic'><img src="+obj[i].image.pic1+"> </span> <span class='product-txt'><a href='#'>"+obj[i].cakename+"</a><p><i>磅数：</i><i>"+this.obj1["磅数"+i]+"</i> <a href='#'>修改</a></p> </span></div><p class='price'>"+obj[i].sale+"</p><div class='count' ><a href='##' class='reduce'>-</a> <input type='text' value="+this.obj1[i]+" readonly='readonly' class='number'><a href='##' class='add'>+</a> </div><p class='sum'>"+sum+"</p><a href='#' class='del'>删除</a></li>";
        	   this.allsum+=sum;
        	}
        }      		
        this.olist.innerHTML=this.str;
	 },
	 //全选
	 btncheck:function(){
	 	this.allcheck =document.getElementById("allcheck");
	 	console.log(this.allcheck);
        this.check = getClassName(this.olist,"check");
        _this=this;
			this.allcheck.onclick=function(){
				console.log(1);
				if(_this.allcheck.checked)//注意
				{
					for(var i=0;i<_this.check.length;i++)
					{
						_this.check[i].checked="checked";
					}
				}
				else{
					for(var i=0;i<_this.check.length;i++)
					{
						_this.check[i].checked="";
					}
				}
			}
			for(var i=0;i<_this.check.length;i++)
			{
				_this.check[i].onclick=function()
				{
					var stop=true;
					for(var j=0;j<_this.check.length;j++)
					{
						if(_this.check[j].checked==false)
						{
						 stop=false;
						  break;
						}
						
					}
					if(stop)
					{
						_this.allcheck.checked="checked";
					}
					else
					{
						_this.allcheck.checked="";
					}
				}
			}
			
	},//商品数量
	 addnum:function(){
      this.olist.onclick=function(e)
      {
      	var e=e||event;
      	var target=e.target||e.srcElement;
      	if(target.tagName=="A"&&target.className=="reduce")
      	{
      		var n=target.nextElementSibling.value;
      		n<=1?1:n--;
      		target.nextElementSibling.value=n;
      			target.parentNode.nextElementSibling.innerHTML=target.parentNode.previousElementSibling.innerHTML*n;

      	}
      	if(target.tagName=="A"&&target.className=="add")
      	{
      		var n=target.previousElementSibling.value;
      		n++;
      		target.previousElementSibling.value=n;
      			target.parentNode.nextElementSibling.innerHTML=target.parentNode.previousElementSibling.innerHTML*n;
      	}
      
      	// _this.getcookie();
         _this.addsum(); 
      	
      	
      }
     //this.addsum()
  },//求总价格
   addsum:function(){
  	 var price=document.getElementById("totalsum");
  	 price.innerHTML=this.allsum;
  },
  delet:function(){
  	var delet=getClassName(this.olist,"del");
  	_this=this;
  	for(var i=0;i<delet.length;i++)
  	{
  		 delet[i].onclick=function(){
           this.parentNode.style.display="none";
           var dataid=this.parentNode.getAttribute("data-id")-1;
           
           for(var j in _this.obj1)
           {
             if(j==dataid||j=="磅数"+dataid)
             {
             	delete _this.obj1[j];
             	console.log(_this.obj1);
             	setCookie("shoping",JSON.stringify(_this.obj1),7);
             }
           }
  		}
  	}
  }

    }
    shoplist.init();
})