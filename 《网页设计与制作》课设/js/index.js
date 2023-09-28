$(document).ready(function ()  {
// 使用事件委托形式，编辑鼠标悬停的动态效果。
$("ul").on("mouseover", "a", function () {  //鼠标移入事件。
  $(this).css("color", "pink"); //当鼠标移入导航条上的链接时，链接文字的颜色变为粉色
});
$("ul").on("mouseout", "a", function () { //鼠标移出事件
  $(this).css("color", "white"); //当鼠标移出链接时，链接文字的颜色又变回白色。
});


//---------------座右铭打字机效果----------------
function showOne(obj, speed) { //定义了一个 `showOne` 函数，这个函数传入了两个参数
  var texts = obj.html().split("");
  //字符串数组中单个字符用于显示的时间  (2/3个speed) / 字符个数
  var s = (speed * 2) / 3 / texts.length;
  obj.html("").show();
  for (var i = 0; i < texts.length; i++) {
    (function (index) {
      setTimeout(function () {
        obj.append(texts[index]);
        //如果字符全部显示完成 就隐藏
        if (index == texts.length - 1) {
          //字符串数组中所有字符用于隐藏的时间  1/3个speed
          obj.fadeOut(speed / 3);
        }
      }, s * index); //字符依次显示
    })(i);
  }
}
function showAll(obj, speed) {
  //所有字循环打印
  obj.each(function (index, element) {
    setTimeout(function () {
      showOne($(element), speed);
    }, speed * index);
  });
}
function setTimer(obj, speed) {
  //定时器
  showAll(obj, speed);
  return setInterval(function () {
    showAll(obj, speed);
  }, speed * obj.length);
}
var word = $(".lead");
var speed = 3000;
setTimer(word, speed);

  // ------------博文单击事件,滑动效果-------------
  $(".list-group").on("click", ".list-group-item", function () {//使用了jQuery的类选择器来绑定一个鼠标单击事件到文章列表上
    var next = $(this).next();//获取被点击元素的下一个兄弟元素
    next.slideToggle("slow");//使列表在展开和收缩之间进行切换,过渡效果的速度为慢。
    $(".panel-body").not(next).slideUp();//实现一个平滑展开的过渡效果
  });

  // ------------- 评论区Ajax请求 ----------------
  $("#submit").on("click", function () { //使用jquery的id选择器选择了submit元素，设置其 `click` 事件来监听评论提交行为
    //提取textarea文本框中的评论内容
    var text = $("textarea").val();
    console.log(text);
    //构造 POST 请求
    //发送 Ajax 请求到后端
    $.ajax({
      url: "http://localhost:8080/post",
      data: {
        text: text,
      },
      type: "post",
      success: function (data) { //请求完毕后通过success处理器来完成评论的提交。
        console.log(123);
      },
      error: function (error) {
        console.log("发表失败");
      },
    });
  });
  // 评论列表展示功能
  // 当用户评论成功，可以动态添加一个带删除按钮的li到评论列表
  $("#submit").on("click", function () {//通过选择submit元素并设置其click事件
    var li = $("<li></li>"); //鼠标点击发表评论后获取textarea中的文本内容
    li.html($("textarea").val() + "<a href='javascript:;'> 删除</a>");//通过$.html设置为刚刚添加的li的 HTML 内容
    $("ul[id=comment-list]").prepend(li);
    li.slideDown();
    $("textarea").val("");
  });
  // 评论删除功能
  // 当用户点击删除按钮时，可以动态移除被删除的评论li
  $("ul[id=comment-list]").on("click", "a", function () { //使用jQuery过滤选择器，选择评论列表ul元素，设置其on方法监听评论删除行为
    $(this)
      .parent("li")//监听到行为之后获取当前的评论li
      .slideUp(function () {//实现一个缓慢的移除特效
        // 当前this指的是li
        $(this).remove();//从 DOM 树中永久删除li元素
      });
  });
});
