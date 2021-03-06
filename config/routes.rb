Rails.application.routes.draw do
  get 'home/show'
  get 'auth/:provider/callback', to: 'sessions#create', as: 'signin'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  resources :sessions, only: [:create, :destroy]
  resource :home, only: [:show]
  delete 'stocks/:id', to: 'stocks#destroy', as: 'stocks'
  get 'stock/:id', to: 'stocks#show'
  get 'bitcoin', to: 'stocks#bitcoin'
  get 'historical/:id', to: 'stocks#history'
  get 'stocks/:query', to: 'stocks#index'
  get 'stocks/:id/add', to: 'stocks#create', as: 'add'
  get 'users/stocktwits', to: 'users#refreshst'
  get 'users/portfolio', to:'users#show_portfolio', as: 'show_portfolio'
  get 'users/edit_portfolio', to:'users#edit_portfolio', as: 'edit_portfolio'
  root to: "home#show"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
