# 取得するメッセージが複数ある可能性がある為、配列形式でjsonをレスポンスできる様にする
json.array! @messages do |message|
  json.content      message.content
  json.image        message.image
  json.created_at   message.created_at
  json.user_name    message.user.name
  json.id           message.id
end