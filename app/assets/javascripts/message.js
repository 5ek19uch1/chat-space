$(function(){
  function buildMessage(message){
    var image = ""
    message.image ? image = `<img src="${message.image}">` : image = ""


    var html = `<div class="messages">
                  <div class="message">
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
                      <img src="${message.image}">
                    </div>
                </div>`
  return html;
}

$('#new_message').on('submit', function(e) {
  e.preventDefault();         // form側のPOSTをキャンセルしている(???)
  var formdata = new FormData(this);
  var url = $(this).attr('action');
    $.ajax({                   //サーバに送信するリクエストの設定
      url: url,                 //Ajaxリクエストを送信するURLを指定
      type: "POST",             //リクエストのタイプを指定
      data: formdata,           //サーバーへ送信するデータ
      dataType: 'json',         //サーバーから返ってくるデータ型の指定
      processData: false,       //
      contentType: false        //
    })
    .done(function(data) {   //通信に成功した場合の処理
      var html = buildMessage(data);  //buildMessageの結果を反映させる
      $('.messages').append(html);//messagesクラスにhtmlをアペンドする
      $('#new_message').val('');
      $('#new_message').removeAttr('disabled');
      //データ受け取り後画面最下部までスクロール
      $('#new_message').animate({ scrollTop: $('#new_message')[0].scrollHeight});
      return false

    })
      .fail(function(){      //通信に失敗した場合の処理
        alert('エラー');
    })
      .always(() => {       //連続送信できるようにする
        $('.form__submit').removeAttr("disabled");
    })
  })
});