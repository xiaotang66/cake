ajax("get","cake.json","",function (obj){
 //放大镜和json数据显示
 var piclist={
 	str:"",
 	id:"",
  category:"",
 	list:{},
 	obox:{},
 	max:"",
 	amax:"",
 	middle:"",
  filter:"",
  small:"",
  picsmall:"",
  scrolX:"",
  scrolY:"",
  l:0,
  t:0,
  obj2:{},
  n:0,//选择商品的数量
  bont:1,//商品磅数
  btn:"",//点击添加商品到购物车
  into:"",//点击进入购物车页面
  alertbox:"",//弹出提示模态框
  alert:"",
 	init:function(){
      this.loadstr();//动态加载json数据
      this.magnifier();//放大镜
      this.offset(this.middle);
      this.addnum();//商品数量的加减
      this.insertshop();//商品加入购物车
      this.obj2["磅数"+_this.id]="1磅";
      this.serve();

    
 },//通过jsson加载数据
 loadstr:function(){
    this.list=document.getElementById("content");
    this.obox=document.getElementById("inform-text");
    var str1="";
    var att=window.location.href.split("?");
   this.id=parseInt(att[1])-1;
   console.log(this.id);
   console.log(obj[this.id].image.pic1);
	 this.str+="<div class='left-content'><div class='middle' id='middle'> <a href='#'><img src="+obj[this.id].image.pic1+"></a><div id='filter'></div></div><div id='max'><img src="+obj[this.id].image.pic1+" class='max'></div><div class='bottom'><ul id='small'><li class='active'><img src="+obj[this.id].image.pic1+" class='small' data-url="+obj[this.id].image.pic1+"></li><li><img src="+obj[this.id].image.pic2+" class='small' data-url="+obj[this.id].image.pic2+"></li></ul><div class='direction'><a href='##'><</a><a href='##'>></a></div><div><a id='btn1'>收藏商品</a></div></div></div><div class='right-content'><span class='shops'> <h3>"+obj[this.id].cakename+"</h3><i>"+obj[this.id].intruct+"</i></span><span class='price'><em>市场价：<del>"+obj[this.id].price+"</del></em><b>销售价："+obj[this.id].sale+"</b> </span> <div class='purchase border'><div class='poundage' id='poundage'><em>磅数</em><span> <a href='##' class='bacpic'>1磅</a><a href='##'>2磅</a><a href='##'>3磅</a><i></i></span></div><div class='num'> <em>数量</em><span ><a href='##' id='reduce'>-</a> <input type='text' readonly='readonly' value='1' id='number'> <a href='##' id='add'>+</a></span></div><p>选择你想要的商品信息</p></div><div class='shopcar'><a href='##'>立即购买</a><a href='##' id='insert'>加入购物车</a></div></div>";
    this.list.innerHTML=this.str;
      str1+="<p>"+obj[this.id].text.text1+"</p><p>"+obj[this.id].text.text2+"</p><p>"+obj[this.id].text.text3+"</p><p>"+obj[this.id].text.text4+"</p><img src="+obj[this.id].image.pic2+"><img src="+obj[this.id].image.pic3+"><img src="+obj[this.id].image.pic4+">";
    this.obox.innerHTML=str1;
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
    } ,
  magnifier:function(){
     this.middle=document.getElementById("middle");
     this.filter=document.getElementById("filter");
     this.max=document.getElementById("max");
     this.amax=document.querySelector(".max");
     var smallul=document.getElementById("small");
    this.small=smallul.getElementsByTagName("li");
    this.picsmall=smallul.querySelectorAll("img");
        _this=this;
     this.middle.onmousemove=function(e){
     	_this.mosumove();
     }
      this.middle.onmouseout=function(){
      	_this.max.style.display="none";
     	 _this.filter.style.display="none"
      }
    
     smallul.onmouseover=function(e){
    
      var e=e||event;
        var target=e.target||e.srcElement;
        if(target.tagName=="IMG")
        {
            _this.smallmove();
        }
      }
  },//鼠标移到middle上的时候
  mosumove:function(e)
  {
     	  var e=e||event;
     	 var osl=this.middle.offsetWidth-this.filter.offsetWidth;
     	 var ost=this.middle.offsetHeight-this.filter.offsetHeight;
       this.scrolX=document.body.scrollLeft||document.documentElement.scrollLeft;
       this.scrolY=document.body.scrollTop||document.documentElement.scrollTop;
     	 this.max.style.display="block";
     	 this.filter.style.display="block";
     	 this.l=e.clientX+this.scrolX-this.offset(this.middle).l-this.filter.offsetWidth/2;
     	 this.t=e.clientY+this.scrolY-this.offset(this.middle).t-this.filter.offsetHeight/2;
     	 this.l=_this.l<=0?0:(this.l>=osl?osl:this.l);
     	 this.t= _this.t<=0?0:(this.t>=ost?ost:this.t);
     	 this.filter.style.left=this.l+"px";
     	 this.filter.style.top=this.t+"px";
     	 this.amax.style.left=-2*this.l+"px";
     	 this.amax.style.top=-2*this.t+"px"
  },//获取对象距离屏幕边界的距离
  offset:function(ele)
  {

  	var obj1={};
	 obj1.l = ele.offsetLeft;
	 obj1.t = ele.offsetTop;
	while(ele.offsetParent){
		obj1.l+=ele.offsetParent.offsetLeft;
		obj1.t+=ele.offsetParent.offsetTop;
		ele = ele.offsetParent;
	}
	return obj1;
  },
  //移到小图标改变两个大图
  smallmove:function(){
  /*  console.log(this.small);*/
    for(var i=0;i<this.picsmall.length;i++)
    {
      _this=this;
       this.picsmall[i].onmouseover=function(){
        var attr =this.getAttribute("data-url");
        _this.middle.children[0].children[0].src=attr;
        _this.amax.src=attr;
      }
  }  
  },
  //加减号改变商品数量
  addnum:function(){
      var reduce=document.getElementById("reduce");
      var add = document.getElementById("add");
      var number =document.getElementById("number");
      _this=this;
      reduce.onclick=function(){
        if(_this.n==0)
        {
          _this.n=0;
        }
        else{
          _this.n--;
        }
        number.value=_this.n;
      }
      add.onclick=function(){
        _this.n++;
        number.value=_this.n;
      }

  },
  //加入购物车
  insertshop:function(){
      this.btn=document.getElementById("insert");
      this.n=document.getElementById("number").value;
      var obount=document.getElementById("poundage");
      var bounta=obount.getElementsByTagName("a");
      if(getCookie("shoping"))
      {
        var shoping = JSON.parse(getCookie("shoping"));
        this.obj2=shoping;
      }
      _this=this;
      obount.onclick=function(e){
        var e=e||event;
        var target=e.target||e.srcElement;
          for(var i=0;i<bounta.length;i++)
          {
            bounta[i].className="";
              
          }
           if(e.target.tagName=="A")
              {
                var inner=target.innerHTML;
                console.log(inner);
                target.className="bacpic";
                  if(!_this.obj2["磅数"+_this.id]){
                      _this.obj2["磅数"+_this.id]=inner;
                   }
                   else{
                       _this.obj2["磅数"+_this.id]=inner;
                   }
              }

      } 
       this.btn.onclick=function(){
       	
         if(!_this.obj2[_this.id])
            {
             _this.obj2[_this.id]=1;
            }
            else{
              var n1=_this.obj2[_this.id];
              n1++;
              _this.obj2[_this.id]=n1;
            }
           setCookie("shoping",JSON.stringify(_this.obj2),7);
          _this.intocar();//弹出的提示框
        }
     
  },//模态提示框移动
  intocar:function(){
 this.alertbox = document.getElementById("alertbox");
 this.alert =document.getElementById("alert");
 this.into=document.getElementById("intocar");
 var close=getClassName(this.alert,"clos");
 this.alertbox.style.display="block";
 this.alert.style.left=(document.body.offsetWidth-this.alert.offsetWidth)/2+"px";
 this.alert.style.top= (document.body.offsetHeight-this.alert.offsetHeight)/2+"px";
 _this=this;
 this.alert.onmousedown = function(e){
   var e =e||event;
    e.preventDefault()?e.preventDefault():e.returnvalue=false;
   var ofx = e.offsetX;
   var ofy = e.offsetY;
   athis=_this;
  athis.alertbox.onmousemove=function(e){
    var e =e||event;
    var l = e.clientX-ofx;
    var t = e.clientY-ofy;
    var maxl=athis.alertbox.offsetWidth- athis.alert.offsetWidth;
    var maxt=athis.alertbox.offsetHeight- athis.alert.offsetHeight;
    l=l<=0?0:(l>=maxl?maxl:l);
    t=t<=0?0:(t>=maxt?maxt:t);
    athis.alert.style.left =l+"px";
    athis.alert.style.top =t+"px";
  }
   _this.alertbox.onmouseup = function(){
    _this.alertbox.onmousemove =null;
  }

}
  this.into.onclick=function(){
    window.location.href="shop.html?";
    /*window.location.href="shop.html?"+_this.category+"_"+_this.id;*/
  }
  for(var i=0;i<close.length;i++)
  {
     close[i].onclick=function(){
      console.log(1)
      _this.alertbox.style.display="none";
     }
  }
  }
  
}
piclist.init();
})
