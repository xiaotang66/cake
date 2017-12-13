
var Register={
	register:"",
	username:"",
	email:"",
	code:"",
	code1:"",
	pwd:"",
	repwd:"",
	btn1:"",
	acode:"",
	init:function(){
		this.getMesage();
		this.codeval();
		this.getCode();
		this.insert();
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
    } ,
    getMesage:function(){
    	this.register=document.getElementById('register');
		this.username=document.getElementById('username');
		this.email=document.getElementById('email');
		this.pwd=document.getElementById('pwd');
		this.repwd=document.getElementById('repwd');
		this.code=document.getElementById("code");
		_this=this;
		this.register.onclick=function(e){
			var e=e||event;
			var target=e.target||e.srcElement;
			if(target.tagName=="INPUT")
			{
				target.onblur=function(){
					switch(target.id){
				case 'username':
				if(!/^[\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9]$/.test(target.value)){
					target.nextElementSibling.style.display="block";
					
				}
				else{
					target.nextElementSibling.style.display="none";
				}
				break;
				case 'email':
				if(!/^([0-9a-zA-Z_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})$/.test(target.value)){
					target.nextElementSibling.style.display="block";
				}
				else{
					target.nextElementSibling.style.display="none";
				}
				break;
				case 'code':
				if(target.value!=_this.code1.value){
					target.nextElementSibling.style.display="block";
				}
				else{
					target.nextElementSibling.style.display="none";
				}
				break;
				case 'pwd':
				if(!/^.{6,16}$/.test(target.value)){
					target.nextElementSibling.style.display="block";
				}
				else{
					target.nextElementSibling.style.display="none";
				}
				break;
				case 'repwd':
				if(target.value!=_this.pwd.value){
					target.nextElementSibling.style.display="block";
				}
				else{
					target.nextElementSibling.style.display="none";
				}
				break;
				
				}	
			}
		}
       }
	},
	getCode:function(){
		this.acode=document.getElementById("getcode");
		_this=this;
	    this.acode.onclick=function(){
	      _this.codeval();
	     	  }
	    },
	 codeval:function(){
		this.code1=document.getElementById("code1");
        var str="";
			for(var i=0;i<4;i++)
			{
				var num= parseInt(48+Math.random()*(122-47));
				 while(num>=58&&num<=65||num>=91&&num<=96)
			  {
				  num= parseInt(48+Math.random()*(122-47));
			  }
			  str+=String.fromCharCode(num);
			}
			 this.code1.value=str;
			},

	insert:function(){
		this.btn1=document.getElementById("regestbtn");

		_this=this;
		this.btn1.onclick = function (){
	var userval=_this.username.value;
	var passwval =_this.pwd.value;
	ajax("get","http://datainfo.duapp.com/shopdata/userinfo.php",
		{"status":"register","userID":userval,"password":passwval},
		function(data){
			switch(data)
			{
				case 0:
				alert("用户名重复,请重新输入");
				break;
				case 1:
				alert("注册成功");
				break;
				case 2:
				alert("数据库错误");
				break;
			}
			
		}
	)
}
	}
	
}
Register.init();
