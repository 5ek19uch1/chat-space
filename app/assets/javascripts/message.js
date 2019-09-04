$(function(){
  function buildMessage(message){
    var html = `<p class="lower-message__content">
                ${message.contet}
                </p>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var fromdata = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: FormData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildMessage(message);
      $('.messages').append(html)
      $('#new_message').val('')

    })
    .fail(function(){
      alert('処理がうまく行われていません');
    })
  })
});