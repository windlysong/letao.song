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
})