$(function() {
    // 调用getUserInfo函数获取用户信息
getUserInfo()
    var layer = layui.layer
$('#btnLogout').on('click',function() {
    layer.confirm('确定退出登录么?', {icon: 3, title:'提示'}, function(index){
        // 强制清空token
        localStorage.removeItem('token')
        // 强制跳转到登录页面
        location.href = '/login.html'
        layer.close(index)
      })
})
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 获取用户的头像
                renderAvatar(res.data)  
        }
    })
}

function renderAvatar(user) { 
    // 获取用户的名称
    var name = user.nickname || user.username
      // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic).show()
    }else {
        // 渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
