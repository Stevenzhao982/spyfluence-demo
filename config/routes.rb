Rails.application.routes.draw do

  devise_for :users, controllers: { registrations: "registrations" }

  authenticated :user do
    # root 'dashboards#dashboard', as: :dashboards_dashboard
    root 'scrape#index'
  end

  root 'landing#landing'

  devise_scope :user do
    post '/users/sign_up', to: 'registrations#create'
    get '/users/sign_up/success', to: 'registrations#success'
  end

  post '/charges/new', to: 'charges#new'
  get '/charges/checkoutForm', to: 'charges#checkoutForm'
  get '/charges/failure', to: 'charges#failure'
  get '/scrape', to: 'scrape#index'
  get '/contact', to: 'contacts#new'
  get '/billing', to: 'jobs#index'

  get '/demo', to: 'home#demo'
  get '/pricing', to: 'home#pricing'

  scope '/campaigns' do
    get '/', to: 'jobs#campaigns'

    scope '/competitor/:competitor_id' do
      scope '/profiles' do
        get '/', to: 'profiles#index', as: 'profiles'
        get '/download', to: 'profiles#download', defaults: { format: 'csv' }

        scope '/:profile_id' do
          get '/', to: 'profiles#show', as: 'profile'
        end
      end
    end
  end

  post '/logs', to: 'logs#create'

  match '/500', to: 'errors#internal_server_error', via: :all
  match '/422', to: 'errors#unprocessable_entity', via: :all
  match '/404', to: 'errors#not_found', via: :all

  resources :charges
  resources :contacts, only: [:new, :create]

  # to implement
  get 'pages/contacts', to: 'pages#contacts', as: :pages_contacts

  get 'pages/faq', to: 'pages#faq', as: :pages_faq
  get 'pages/pricing', to: 'pages#pricing', as: :pages_pricing
  
  get 'pages/kanban-board', to: 'pages#kanban_board', as: :pages_kanban_board
  get 'pages/messages-v2/compose', to: 'pages/messages_v2#compose', as: :pages_messages_v2_compose
  get 'pages/messages-v2/item', to: 'pages/messages_v2#item', as: :pages_messages_v2_item
  get 'pages/messages-v2/list', to: 'pages/messages_v2#list', as: :pages_messages_v2_list
end
