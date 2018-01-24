/**
 * Created by windlysong on 2018/1/23.
 */
// 想禁用进度环：
NProgress.configure({
    showSpinner: false
})

// 所有的ajax启动后就启动进度条
$(document).ajaxStart(function () {
    NProgress.start();
});

// 所有的ajax结束后就停止进度条
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 600);
});

// 页面一加载，就先判断用户是否登录，如果登录不做任何处理，没登录，跳转登录页面；
// 非登录页面才发送ajax请求，不然在登录页面总是跳转登录页面；
if (location.href.indexOf("login.html") === -1) {
    $.ajax({
        type: "get",
        url: "/employee/checkRootLogin",
        success: function (data) {
            console.log(data);
            if (data.error === 400) {
                location.href = "login.html";
            }
        }
    })
}




// 二级菜单分类显示隐藏
// prev(next)  表示找到该元素的上一类(下一类)的元素：
$(".child").prev().on("click", function () {
    $(this).next().slideToggle();
});

// 侧边栏显示隐藏
$(".btn_menu").on("click", function () {
    // $(".lt_aside").toggle(); 显示隐藏；
    $(".lt_aside").toggleClass("current");
    $(".lt_main").toggleClass("current");
})

// 退出功能
$(".btn_logout").on("click", function () {
    // 模态框显示
    $("#showHidden_modal").modal("show");
    // 模态框显示'确定键'事件第一种方法：
    // on注册事件不会覆盖，
    // off()解绑所有事件
    // off("click","***");解绑委托事件；
    // $(".btn_confirm").off().on("click", function () {
    //     console.log("hello");
    // });
})

// 模态框显示'确定键'事件第二种方法：
$(".btn_confirm").on("click", function () {
    // console.log("hello");
    $.ajax({
        type: "get",
        url: "/employee/employeeLogout",
        success: function (data) {
            // console.log(data);
            if (data.success) {
                location.href = "login.html";
            }
        }
    })
});