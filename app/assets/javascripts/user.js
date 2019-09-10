$(document).on('turbolinks:load', function() {
  var search_list = $("#user-search-result"); //viewファイルに繋がる
  function appendUser(user) {         //チャットメンバーを追加、のところ
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
    console.log(html);
  }

  function appendNoUser(user) {   //検索結果に追加しない
    var html =`<div class = "chat-group-user clearfix">${user}</div>`
    search_list.append(html);
  }

  function addUser(name,id) {        //選択されたチャットユーザーのリスト化
    var html =
    `<div class='chat-group-user clearfix js-chat-member' id="chat-group-user-${id}">
      <input name="group[user_ids][]" type="hidden" value="${id}">
      <p class="chat-group-user__name">
        ${name}
      </p>
      <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn data-user-id=${id} data-user-name=${name}">
        削除
      </a>
    </div>`

    $("#chat-group-users").append(html);
  }

  $('#user-search-field').on('keyup', function(e){
    var input = $('#user-search-field').val();
    if(input !==""){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
  // ユーザー検索に成功
    .done(function(users) {
      console.log(users);
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
      $('#user-search-result').on('click','.chat-group-user__btn--add',function(){
        var user_id = $(this).data('user-id');
        var user_name = $(this).data('user-name');
        addUser(user_id, user_name);
        $(this).parent().remove();
    });                                 //ユーザーを削除する作業
		$('#chat-group-users').on('click','.chat-group-user__btn--remove',function(){
			$(this).parent().remove();
		});
});