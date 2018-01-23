/**
 * Created by windlysong on 2018/1/23.
 */
$(function () {

    // 登录表单效验：1.用户名不能为空；2.密码不能为空；3.密码的长度是6-20位；

    // 获取表单：
    var $form = $('form');
    // console.log($form);

    // 调用bootstrapValidator
    $form.bootstrapValidator({

        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback: {
                        message: '用户名有误',
                    }
                }
            },
            // 效验密码，
            password: {
                validators: {
                    // 不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    callback: {
                        message: '密码有误',
                    }
                }
            },
            //长度校验
            stringLength: {
                min: 6,
                max: 30,
                message: '用户名长度必须在6到30之间'
            },
            //正则校验
            regexp: {
                regexp: /^[a-zA-Z0-9_\.]+$/,
                message: '用户名由数字字母下划线和.组成'
            }
        }
    });

    // 给表单注册一个效验成功事件 success.form.bv
    $form.on("success.form.bv", function (e) {
        // 阻止浏览器默认行为；兼容IE浏览器（window.event.returnValue = false）
        // 如果window.event是IE浏览器，那么选择的是window.event.returnValue = false；
        //  如果window.event不是IE浏览器，那么选择的是e.preventDefault();
        // window.event ? window.event.returnValue = false : e.preventDefault();
        e.preventDefault();

        // 使用ajax发送请求；
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $form.serialize(),
            // dataType:"text/html"字符串   默认的是"json",json类型；
            success: function (data) {
                // console.log(data);
                if (data.success) {
                    location.href = "index.html"
                }
                if (data.error===1000) {
                    // 使用updateStatus方法，主动把username这个字段变成效验失败；
                    // 第一个参数：字段名，表单中的name属性；
                    // 第二个参数:INVALID:效验失败；
                    // 第三个参数：配置提示消息；
                    $form.data("bootstrapValidator").updateStatus("username","INVALID","callback")
                }
                if (data.error===1001) {
                    // 使用updateStatus方法，主动把password这个字段变成效验失败；
                    // 第一个参数：字段名，表单中的name属性；
                    // 第二个参数:INVALID:效验失败；
                    // 第三个参数：配置提示消息；
                    $form.data("bootstrapValidator").updateStatus("password","INVALID","callback")
                }
            }

        })

    });

    // 表单重置功能
    $("[type='reset']").on("click", function () {
        // console.log('呵呵');
        //获取表单校验实例,调用resetForm方法；
        $form.data('bootstrapValidator').resetForm();
    });

})