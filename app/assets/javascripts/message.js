$(document).on('turbolinks:load', function(){
    function buildMessage(message){
      var image = message.image ? `<img src= ${message.image}>` : "";
      var html = `<div class="message"  data-massage-id="${message.id}>
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                          ${message.date}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                        <div class="lower-message__image">
                          ${image}
                        </div>
                      </div>
                  </div>`
    return html;
  }

  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast')
  }
//メッセージの送信、メッセージの表示
$('#new_message').on('submit', function(e) {
    e.preventDefault();          // form側のPOSTをキャンセルしている(???)
    var formdata = new FormData(this);
    var url = $(this).attr('action');

      $.ajax({                   //サーバに送信するリクエストの設定
        url:         url,        //Ajaxリクエストを送信するURLを指定
        type:        "POST",     //リクエストのタイプを指定
        data:        formdata,   //サーバーへ送信するデータ
        dataType:    'json',     //サーバーから返ってくるデータ型の指定
        processData: false,      //
        contentType: false       //
      })
      .done(function(message) {   //通信に成功した場合の処理
        var html = buildMessage(message);  //buildMessageの結果を反映させる
        $('.messages').append(html);//messagesクラスにhtmlをアペンドする
        $('form')[0].reset();
        scroll();

      })
        .fail(function(){      //通信に失敗した場合の処理
          alert('エラー');
      })
        .always(() => {       //連続送信できるようにする
          $('.form__submit').removeAttr("disabled");
      });
  })

//自動更新------------------------

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      //今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
      var last_message_id = $('.message:last').data("message-id");
      //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
        $.ajax({
          url:      'api/messages',
          type:     "GET",
          dataType: 'json',
          data:     {id: last_message_id}
        })
        .done(function(messages) {
          console.log(messages);
          var insertHTML = '';//--------------------追加するHTMLの入れ物
          messages.forEach(function (message) {//---messages配列の中身を取り出す
            insertHTML = buildMessage(message); //--メッセージが入ったHTMLを取得
            $('.messages').append(insertHTML);//----メッセージをアペンド
          })
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          //最新のメッセージが一番下に表示されようにスクロールする。
        })
        .fail(function () {
          alert('自動更新に失敗しました');
        });
      }
    };
      setInterval(reloadMessages, 5000);
    });