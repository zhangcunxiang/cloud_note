//显示筆記信息
function loadNote() {
	// 设置选中效果
	$("#note_ul a").removeClass("checked");
	$(this).find("a").addClass("checked");
	// 获取请求参数
	var noteId = $(this).data("noteId");
	//设置cookie
	addCookie("noteId", noteId, 2);

	// 发送ajax请求
	$.ajax({
		url : path + "/note/load.do",
		type : "post",
		data : {
			"noteId" : noteId
		},
		dataType : "json",
		success : function(result) {
			if (result.status == 0) {
				var note = result.data;
				// alert(note.cn_note_title+":"+note.cn_note_body);
				var title = note.cn_note_title;
				var body = note.cn_note_body;
				$("#input_note_title").val(title);
				// $("#myEditor").html(body);
				um.setContent(body);
			}
		},
		error : function() {
			console.log("加载该条笔记失败");
		}
	});
}




// 加载笔记本的笔记
function loadBookNotes() {
	// 设置选中效果
	$("#book_ul a").removeClass("checked"); // 去除所有选中效果
	$(this).find("a").addClass("checked"); // 设置点击后的li效果

	// 获取参数
	var bookId = $(this).data("bookId");
	// alert(bookId);
	// 发送ajax请求
	$.ajax({
		url : path + "/note/loadnotes.do",
		type : "post",
		data : {
			"bookId" : bookId
		},
		dataType : "json",
		success : function(result) {
			if (result.status == 0) {
				// 清空列表
				$("#note_ul").empty();

				var maps = result.data;
				for (var i = 0; i < maps.length; i++) {
					var map = maps[i];
					var noteId = map.cn_note_id;
					var noteTitle = map.cn_note_title;
					createNoteLi(noteId, noteTitle);
				}
			}
		},
		error : function() {
			alert("获取笔记失败");
		}
	});
}





function createNoteLi(noteId, noteTitle) {
	var str = "";

	str += '<li class="online">';
	str += '<a>';
	str += '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>';
	str += noteTitle;
	str += '<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>';
	str += '</a>';
	str += '<div class="note_menu" tabindex="-1">';
	str += '<dl>';
	str += '<dt><button type="button" class="btn btn-default btn-xs btn_move" title="移动至..."><i class="fa fa-random"></i></button></dt>';
	str += '<dt><button type="button" class="btn btn-default btn-xs btn_share" title="分享"><i class="fa fa-sitemap"></i></button></dt>';
	str += '<dt><button type="button" class="btn btn-default btn-xs btn_delete" title="删除"><i class="fa fa-times"></i></button></dt>';
	str += '</dl>';
	str += '</div></li>';

	$li = $(str);

	$li.data("noteId", noteId);

	$("#note_ul").append($li);
}