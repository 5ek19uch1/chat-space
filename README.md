# README

# Chatspace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null:false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups   through: :members

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|text||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: ture|
### Association
- belongs_to :user
- belongs_to :group 

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|member_id|integer|null: false, foreign_key: ture|
|group_id|integer|null: false, foreign_key: ture|
|message_id|integer|null: false, foreign_key: ture|
### Association
- belongs_to :user
- belongs_to :group

## gorupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
|members_id|integer|null: false, foreign_key: true|
|users_id|integer|null: false, foreign_key: true|
### Association
- has_many :users      through: :members
- has_many :messages   through: :members 

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...






