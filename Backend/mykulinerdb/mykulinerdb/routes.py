def includeme(config):
    """Add routes to the config."""
    config.add_static_view('static', 'static', cache_max_age=3600)
    
    # Default route (sesuaikan jika diperlukan)
    config.add_route('home', '/') 

    # --- User Routes ---
    # Setiap operasi memiliki route_name unik, dibedakan oleh path dan request_method
    config.add_route('user_list',   '/api/users',       request_method='GET')
    config.add_route('user_add',    '/api/users',       request_method='POST')
    config.add_route('user_detail', '/api/users/{id:\d+}', request_method='GET')
    config.add_route('user_update', '/api/users/{id:\d+}', request_method='PUT')
    config.add_route('user_delete', '/api/users/{id:\d+}', request_method='DELETE')

    # --- Review Routes ---
    # Mengikuti pola yang sama seperti User dan Matakuliah
    config.add_route('review_list',   '/api/reviews',       request_method='GET')
    config.add_route('review_add',    '/api/reviews',       request_method='POST')
    config.add_route('review_detail', '/api/reviews/{id:\d+}', request_method='GET')
    config.add_route('review_update', '/api/reviews/{id:\d+}', request_method='PUT')
    config.add_route('review_delete', '/api/reviews/{id:\d+}', request_method='DELETE')