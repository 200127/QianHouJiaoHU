function getComment() {
    $.ajax({
        method: 'get',
        url: 'http://www.liulongbin.top:3006/api/cmtlist',
        data: {},
        success: function(e) {
            if (e.status !== 200) {
                return alert("获取失败！")
            }
            var rows = [];
            $.each(e.data, function(i, item) {
                var str = '<li class="list-group-item">' + item.content + '<span class="badge" style="background:#f0ad4e">评论时间:' + item.time + '</span><span class="badge" style="background: #5bc0de;">评论人:' + item.username + '</span></li>'
                rows.push(str);
            })
            $("#cmt-list").empty().append(rows.join(""));
        }
    })
}
getComment();
$(function() {
    $("#formAddCmt").submit(function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.post('http://www.liulongbin.top:3006/api/addcmt', data, function(e) {
            if (e.status !== 201) return alert("评论失败");
            return alert("评论成功");
        })
        getComment();
        $(this)[0].reset();
    })
})