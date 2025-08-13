Rails.application.config.session_store :cookie_store,
                                       key: '_mahjong_traner_session',
                                       same_site: :none,
                                       secure: false # ※ローカルではfalse、デプロイ時はtrueにする
