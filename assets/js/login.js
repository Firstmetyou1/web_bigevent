$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
      $('.login-box').hide()
      $('.reg-box').show()
    })
  
    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
      $('.login-box').show()
      $('.reg-box').hide()
    })
    // 从layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个pwd密码规则
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        // 自定义校验两次密码是否一致的规则
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post("/api/reguser", data,
            function (res) {
                if(res.status !==0) {
                    return layer.msg('注册失败!')
                }
                layer.msg('注册成功请登录!')
                console.log(res.message)
                $('#link_login').click()
            }
            
        )
    })
    // 监听登录的提交事件
    $('#form_login').on('submit',function(e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.post("/api/login", data,
            function (res) {
                if(res.status !== 0) {
                    return layer.msg('登陆失败!')
                }
                layer.msg('登陆成功!')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        )
    })
  })
