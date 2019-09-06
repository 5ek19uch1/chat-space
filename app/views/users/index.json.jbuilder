json.array! @user do |user|
  json.id user.id
  json.name user.name
end

# [{"title": "タイトル1", "text": "テキスト1"}, {"title": "タイトル2", "text": "テキスト2"}]



json.text  @tweet.text
json.title @tweet.title

# {"text": "テキスト1", "title": "タイトル1"}