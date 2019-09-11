$(document).on('turbolinks:load', function() {
  var search_list = $("#user-search-result"); //viewファイルに繋がる
  function appendUser(user) {         //チャットメンバーを追加、のところ。つまり検索結果表示。
    var html =
    `<div id="user-search-result">
        <div class = "chat-group-user js-group-user clearfix">
          <p class = "chat-group-user__name">${user.name}
          </p>
          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
            追加
          </a>
        </div>
    </div>`
    search_list.append(html);   //上記varのsearch_listにHTMLをアペンドする
    console.log(user.name, user.id, html);
  }

  function appendNoUser(user) {   //検索結果に追加しない
    var html =`<div class = "chat-group-user clearfix">${user}</div>`
    search_list.append(html);
  }

  function addUser(user_id, user_name) {//追加するメンバーを一覧表示の部分テンプレート的な部分。
    var html = `<div class='chat-group-user clearfix' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-user__name'>${user_name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $('.chat-group-users').append(html);
  }


  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    if(input !==""){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
// ユーザー検索に成功
    .done(function(users) {//ここまで成功
      $('#user-search-result').empty();
// jbuilderから送られてきた配列の情報によって場合分け、関数呼び出し
      if(users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }else {
        appendNoUser('一致るするユーザーはありません');
      }
    })
// ユーザー検索失敗
    .fail(function() {
      alert('ユーザーの検索に失敗しました');
    })
  }
  });
//ユーザーを追加する作業
      $('#user-search-result').on('click','.chat-group-user__btn--add',function(e){
        var user_id = $(this).data('user-id');
        var user_name = $(this).data('user-name');//ユーザーIDとユーザー名を抜き出す
        addUser(user_id, user_name);              //上記addUser(メンバー一覧）に渡す
        $(this).parent().remove();                //ユーザー検索結果表示から消す。
        console.log(user_id, user_name);
      });
//ユーザーを削除する作業
		$('.chat-group-users').on('click','.chat-group-user__btn--remove',function(e){
			$(this).parent().remove();
		});
});