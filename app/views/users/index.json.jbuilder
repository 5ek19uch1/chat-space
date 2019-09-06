json.array! @user do |user|
  json.id user.id
  json.name user.name
end




json.text  @tweet.text
json.title @tweet.title
# {"text": "テキスト1", "title": "タイトル1"}

json.array! @tweets do |tweet|
  json.title tweet.title
  json.text  tweet.text
end

# [{"title": "タイトル1", "text": "テキスト1"}, {"title": "タイトル2", "text": "テキスト2"}]

