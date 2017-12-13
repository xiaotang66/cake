//设置cookie
function setCookie(_name,val,expires){
	var d = new Date();
	d.setDate(d.getDate()+expires);
	document.cookie=_name+"="+val+";path=/;"+"expires="+d;
}
//获取cookie
function getCookie(_name)
{
	var cookie = document.cookie;
	var arr = cookie.split("; ");//注意空格，容易出错。。。。。
	for(var i=0;i<arr.length;i++)
	{
		var newarr = arr[i].split("=");
		
		if(newarr[0]== _name)
		{
			return newarr[1];
			
		}
	}
}
//删除cookie
function removeCookie(_name,val){
 setCookie(_name,val,-1); 
}
//b封装document.getElementByclassName 需要定义一个变量获取
function getClassName(aparent,aclass)
{
	var ochild = document.getElementsByTagName('*');
	var reg = new RegExp('\\b'+aclass+'\\b','i');
	var arry =[];
	for(var i =0;i<ochild.length;i++)
	{
      if(reg.test(ochild[i].className))
      {
      	 arry.push(ochild[i]);
      }
	}
	return arry;
}

//完美运动
//用json是为了传多个值，可以同时进行多个运动。
//fn回调函数是为了完成一个运动后再继续下一个运动，完成所有运动才停止定时器
function move(obj,json,fn){
   clearInterval(obj.timer);//obj.timer是为了关闭自己的那个timer
   obj.timer=setInterval(function(){
   	var bstop = true;//判断执行完多个json里面的值后再关闭定时器
       for(attr in json)
       {
       	//通过行间距获取对象的初始值
       	 var icur = 0;
       	 if(attr=="opacity")//解决透明度问题，透明度无单位，opcatiy不能直接取整，因为范围为0到1。后再取整是因为除8会有小数，会出现问题。会在1和-1之间跳
       	 {
       	 	icur =parseInt(parseFloat(getStyle(obj,attr))*100);
       	 }
       	 else{
       	 	icur = parseInt(getStyle(obj,attr))
       	 }
       	 var speed = (json[attr]-icur)/8;
       	 speed=speed >0?Math.ceil(speed):Math.floor(speed);//干掉小数
       	 if(icur!=json[attr])
       	 {
       	 	bstop=false;//判断对象中的值是否和（即目标值）与icur初始值是否相同，不相同则定义为false，不关闭定时器。
       	 }
       	 if(attr=="opacity")
       	 {
       	 	obj.style.opacity=(icur+speed)/100;
       	 	obj.style.filter="apha(opacity:"+(icur+speed)+")";//透明度改变问题
       	 }
       	 else{
       	 	obj.style[attr]=icur+speed+"px";
       	 }
       }
       if(bstop)
       {
       	clearInterval(obj.timer);
       	if(fn)
       	{
       		fn();//自调用函数，解决多个属性值运动问题
       	}
       }

   },30)
}
//获取行间距
function getStyle(obj,attr){
if(obj.currentStyle)
{
	return obj.currentStyle[attr];
}
else{
	return getComputedStyle(obj,false)[attr];
}
}

//封装ajax
function ajax(method,url,json,success,error){
	//1、创建一个ajax对象
	var xml = new XMLHttpRequest()||new ActiveXObject("Microsoft","XMLHTTP");


	//判断是否是get请求
	if(method=="get"){
		//数据拼接
		var str = '';
		for(var key in json){
			str+='&'+key+"="+json[key]
		}
		str = str.substr(1);
		//添加到url后面
		url = url+"?"+str;
		//打开与后面连接的数据
		xml.open("get",url,true);
		//发送
		xml.send();
	}else{
		//数据拼接
		var str = '';
		for(var key in json){
			str+='&'+key+"="+json[key]
		}
		str = str.substr(1);

		xml.open("post",url,true);
		//设置post的请求头
		xml.setRequestHeader("content-type","application/x-www-form-urlencoded");
		//发送
		xml.send(str)
	}

	xml.onreadystatechange = function(){
		//ajax请求成功以及服务器请求成功
		if(xml.readyState==4&&xml.status==200){
			var r = xml.responseText;
			if(typeof r!="object"){
				r = JSON.parse(r)
			}

			success&&success(r)

		}else{
			error&&error(xml.status)
		}
	}
}
