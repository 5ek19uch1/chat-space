$(document).on('turbolinks:load',function() {
  var search_list = $("#user-search-result"); //viewファイルに繋がる
  function appendUser(user) {         //チャットメンバーを追加、のところ
    var html =
    `<div id="user-search-result">
        <div class = "chat-group-user js-group-user clearfix">
        <p class = "chat-group-user__name">${user_name}</p>
        <a class ="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user_id}" data-user-name="${user_name}">追加</a>
      </div>
    </div>`
    search_list.append(html);   //上記varのsearch_listにHTMLをアペンドする
  }

  function appendNoUser(user) {   //検索結果に追加しない
    var html =`<div class = "chat-group-user clearfix">${user}</div>`
    search_list.append(html);
  }

  function addUser(name,user_id) {        //選択されたチャットユーザーのリスト化
    var html =
    `<div class='chat-group-user clearfix js-chat-member' id="chat-group-user-${user_id}">
      <input name="group[user_ids][]" type="hidden" value="${user_id}">
      <p class="chat-group-user__name">${name}</p>
      <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn data-user-id=${user_id} data-user-name=${name}"> 削除</a>
    </div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (input == ""){
      $("#user-search-result").empty();
    }
    else {
    $.ajax({
      type:     'GET',              //HTTPメソッド
      url:      '/users',           //Ajaxリクエストを送信するURLを指定
      data:      { keyword: input },//サーバーへ送信するデータ。キーワードとインプット
      dataType: 'json'              //サーバーから返ってくるデータをjson形式に
    })
    .done(function(data) {          //通信成功の場合
      $("#user-search-result").empty(); //非同期通信の結果をdoneの関数の引数から受取り、ビューに追加する
      if (data.length !== 0) {       //検索ヒット.。データの長さが０じゃなければ＝データがあれば
        data.forEach(function(user){
        appendUser(user);
        });
      }
      else {                        //検索ヒットせず
        appendNoUser("一致するユーザーがいません"); //上で定義されている変数
      }
    })
    .fail(function() {              //通信失敗
      alert('ユーザー検索に失敗しました')
    })
    }
  });
                                          //ユーザーを追加する作業
    $("#user-search-result").on("click", ".chat-group-user__btn--add", function(e){
      var name = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      addUser(name,user_id);
      $(this).parent().remove();
    });                                 //ユーザーを削除する作業
    $("#chat-group-users").on("click", ".js-remove-btn", function(e){
      $(this).parent().remove();
    });
});