class TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user_using_x_auth_token, except: [:new, :edit]
  before_action :load_task, only: %i[show update destroy]

  def index
    @tasks = TaskPolicy::Scope.new(current_user, Task).resolve
    render status: :ok, json: { tasks: @tasks }
  end

  def create
    @task = Task.new(task_params.merge(creator_id: @current_user.id))
    authorize @task
    if @task.save
      render status: :ok, json: { notice: "Task was created successfully" }
    else
      errors = @task.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def show
    authorize @task
    comments = @task.comments.reverse
    render status: :ok, json: { task: @task, assigned_user: @task.user, comments: comments }
  end

  def update
    authorize @task
    if @task.update(task_params)
      render status: :ok, json: { notice: 'Successfully updated task.' }
    else
      render status: :unprocessable_entity, json: { errors: @task.errors.full_messages }
    end
  end

  def destroy
    authorize @task
    if @task.destroy
      render status: :ok, json: { notice: "Successfully deleted the task." }
    else
      render status: :unprocessable_entity, json: { errors: @task.errors.full_messages }
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :user_id)
  end

  def load_task
    @task = Task.find(params[:id])
  rescue ActiveRecord::RecordNotFound => errors
      render json: { errors: errors }
  end
end
