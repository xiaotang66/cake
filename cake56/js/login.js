   var login ={
   	    username:"",
   	    pwd:"",
   	    btn3:"",
   	    init:function(){
   	    	this.loginbtn();
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
    loginbtn:function(){
    	  this.username=document.getElementById("username");
		  this.pwd=document.getElementById("pwd");
          this.btn3=document.getElementById("lognbtn");
          _this=this;
    	  this.btn3.onclick=function(){
			var userval=_this.username.value;
			var passwval =_this.pwd.value;
			ajax("get","http://datainfo.duapp.com/shopdata/userinfo.php",{"status":"login","userID":userval,"password":passwval},function(data){
		       if(data==0)
					{
						alert("用户名不存在");
					}
					else if(data==2)
					{
						alert("密码错误");
					}
					else if(typeof(data)=="object"){
						alert("登陆成功");
					}
					else{
						alert("登陆错误！")
					}
	})
					
        }
    }

   }
   login.init();




      