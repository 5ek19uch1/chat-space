class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  # def create
  #   @message = @group.messages.new(message_params)
  #   if @message.save
  #       respond_to do |format|
  #         format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信サレマシタ' } # この中はHTMLリクエストの場合に呼ばれる
  #         format.json { } # この中はJSONリクエストの場合に呼ばれる
  #       end
  #     else
  #       @messages = @group.messages.includes(:user)
  #       flash.now[:alert] = 'メッセージを入力してください。'
  #       render :index
  #   end
  # end


# ----------------------------------------------
  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group) }
        format.json { render json: @message}
      #拡張子やヘッダー情報を利用して、条件分岐してくれます。

      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
