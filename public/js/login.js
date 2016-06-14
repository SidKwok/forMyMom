/**
* @file 登陆的js文件
* @author Sid
*
*/

/**
* 绑定应用
*/
var APP_ID = 'qhkXeU7Q1EA3Nyr27ruDqYdf-gzGzoHsz';
var APP_KEY = 'nAiDCK62B8tA3zaBwE7zJNqM';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

/**
* 页面基本事件
*/
function basicEvent() {
    $('#signup').on('click', function(){
        var new_user = $("#new_user").val();
        var new_email = $("#new_email").val();
        var new_psw = $("#new_psw").val();
        var new_repsw = $("#new_repsw").val();

        var params = {
            user: $("#new_user").val(),
            email: $("#new_email").val(),
            psw: $("#new_psw").val(),
            repsw: $("#new_repsw").val()
        };

        if(params.psw !== params.repsw) {
            $("#n_new_repsw").addClass("has-error");
            $("#signup_info").text("两次输入的密码不一样");
        } else {
            var user = new AV.User();// 新建 AVUser 对象实例
            user.setUsername(params.user);// 设置用户名
            user.setPassword(params.psw);// 设置密码
            user.setEmail(params.email);// 设置邮箱
            user.signUp().then(function (loginedUser) {
                $('#mySignupModal').modal("hide");
                $("#sign_info").text("你已经成功注册");
            }, (function (error) {
                switch (error.code) {
                    case 202:
                        $("#signup_info").text("用户名已经被占用");
                        break;
                    case 203:
                        $("#signup_info").text("邮箱已经被占用");
                        break;
                    case 204:
                        $("#signup_info").text("没有提供邮箱地址");
                        break;
                    case 217:
                        $("#signup_info").text("无效的用户名，不允许空白用户名");
                            break;
                    case 218:
                        $("#signup_info").text("无效的密码，不允许空白密码");
                        break;
                    default:

                }
            }));
        }
    });
}

basicEvent();
