$(document).on('turbolinks:load', function(){
    function buildMessage(message){
      var image = message.image ? `<img src= ${message.image}>` : "";
      //以下、"messages"から始めると、変な反応が起きる。
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
    e.preventDefault();         // form側のPOSTをキャンセルしている(???)
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
      })
  })
//自動更新
  var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {

        var last_message_id = $('.message:last').data("message-id");
        if (!last_message_id) {
          last_message_id = 0
        }

        $.ajax({
          url:      "api/messages",
          type:     'get',
          dataType: 'json',
          data:     {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildPost(message);

              $('.messages').append(insertHTML);
            })
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
          .fail(function(messages) {
            alert('ERROR');
          })
          .always(function(data){
            $('.submit-btn').prop('disabled', false);
          })
        }
      };
      setInterval(reloadMessages, 5000);
    });