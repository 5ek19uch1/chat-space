$(function(){
  function buildMessage(message){
    var html = `<p class="lower-message__content">
                  ${message.contet}
                </p>`
                `<div class="upper-message__user-name">
                  ${message.user.name}
                </div> `
                `<div class="upper-message__date">
                  ${message.date}
                </div>`
                `<img class="lower-message__image" src="#{message.image}" alt="User black">`
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
    .done(function(message) {   //通信に成功した場合の処理
      var html = buildMessage(message);     //ayasii buildMessageの結果を反映させる<<こいつがundifined
      $('.messages').append(html)//messagesクラスにhtmlをアペンドする
      $('#new_message').val('')  //formを空にする
    })
    .fail(function(){           //通信に失敗した場合の処理
      alert('エラー');
    })
  })
});