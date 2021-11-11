$(function() {

    // 防抖
    // 1、定义定时器的id
    var timer = null;
    // 定义缓存对象
    var cachObj = {};

    // 2、定义防抖函数
    function debounceSearch(kw) {
        timer = setTimeout(function() {
            getSuggertList(kw);
        }, 500)
    }

    $("#ipt").on('keyup', function() {
        // 清空timer
        clearTimeout(timer);
        // 获取输入框 trim是除去空格
        var keywords = $(this).val().trim();
        // 判断是否为空
        if (keywords.length <= 0) {
            return $("#suggest-list").empty().hide();
        }

        // 先判断缓存中是否有数据
        if (cachObj[keywords]) {
            return renderSuggestList(cachObj[keywords]);
        }

        // TODO：获取搜索建议列表
        // getSuggertList(keywords);
        debounceSearch(keywords);
    })

    // 搜索建议接口
    function getSuggertList(kw) {
        $.ajax({
            // 指定url接口
            url: 'https://suggest.taobao.com/sug?q=' + kw,
            dataType: 'jsonp',
            success: function(res) {
                // console.log(res);
                renderSuggestList(res);
            }
        })
    }

    // 渲染UI结构
    function renderSuggestList(res) {
        if (res.result.length <= 0) {
            return $("#suggest-list").empty().hide();
        }
        var htmlStr = template("tpl-suggestList", res);
        $("#suggest-list").html(htmlStr).show();

        // 1、获取到用户输入的内容，当做键
        var k = $("#ipt").val().trim();
        // 2、需要将数据作为值，进行缓存
        cachObj[k] = res;
    }


})