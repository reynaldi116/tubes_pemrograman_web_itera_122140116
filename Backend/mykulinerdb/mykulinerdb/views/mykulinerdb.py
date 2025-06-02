# File: mykulinerdb.py

# import datetime # Mungkin tidak terlalu dibutuhkan jika tidak ada parsing tanggal khusus
from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPFound,
    HTTPNotFound,
    HTTPBadRequest,
)
# Pastikan path import ini sesuai dengan struktur proyek Anda
# Jika models.py berada di direktori yang sama dengan mykulinerdb.py:
# from . import models
# Jika models.py berada di direktori induk:
from ..models import Review, User # Mengimpor User dan Review dari models.py

# --- User Views ---

@view_config(route_name='user_list', renderer='json', request_method='GET')
def user_list(request):
    """View untuk menampilkan daftar pengguna"""
    dbsession = request.dbsession
    users = dbsession.query(User).all()
    return {'users': [u.to_dict() for u in users]}

@view_config(route_name='user_detail', renderer='json', request_method='GET')
def user_detail(request):
    """View untuk melihat detail satu pengguna"""
    dbsession = request.dbsession
    user_id = request.matchdict['id']
    user = dbsession.query(User).filter_by(id=user_id).first()
    
    if user is None:
        return HTTPNotFound(json_body={'error': 'User tidak ditemukan'})
    
    return {'user': user.to_dict()}

@view_config(route_name='user_add', request_method='POST', renderer='json')
def user_add(request):
    """View untuk menambahkan pengguna baru"""
    try:
        json_data = request.json_body
        
        required_fields = ['nama_lengkap', 'email', 'password']
        for field in required_fields:
            if field not in json_data or not json_data[field]:
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi'})
        
        existing_user = request.dbsession.query(User).filter_by(email=json_data['email']).first()
        if existing_user:
            return HTTPBadRequest(json_body={'error': f'Email {json_data["email"]} sudah terdaftar'})

        # CATATAN: Password disimpan sebagai plain text. Perlu di-hash di aplikasi nyata.
        user = User(
            nama_lengkap=json_data['nama_lengkap'],
            email=json_data['email'],
            password=json_data['password'] 
        )
        
        dbsession = request.dbsession
        dbsession.add(user)
        dbsession.flush() 
        
        return {'success': True, 'user': user.to_dict()}
            
    except Exception as e:
        # Sebaiknya log error di sini, misalnya menggunakan request.log.error
        # request.log.error(f"Error adding user: {str(e)}")
        return HTTPBadRequest(json_body={'error': 'Terjadi kesalahan saat menambahkan user.', 'details': str(e)})

@view_config(route_name='user_update', request_method='PUT', renderer='json')
def user_update(request):
    """View untuk mengupdate data pengguna"""
    dbsession = request.dbsession
    user_id = request.matchdict['id']
    
    user = dbsession.query(User).filter_by(id=user_id).first()
    if user is None:
        return HTTPNotFound(json_body={'error': 'User tidak ditemukan'})
    
    try:
        json_data = request.json_body
        
        if 'nama_lengkap' in json_data:
            user.nama_lengkap = json_data['nama_lengkap']
        if 'email' in json_data:
            if user.email != json_data['email']:
                existing_user = dbsession.query(User).filter(User.email == json_data['email'], User.id != user_id).first()
                if existing_user:
                    return HTTPBadRequest(json_body={'error': f'Email {json_data["email"]} sudah digunakan user lain'})
            user.email = json_data['email']
        if 'password' in json_data and json_data['password']:
            # CATATAN: Ini akan mengupdate plain text password.
            user.password = json_data['password']
            
        dbsession.flush()
        return {'success': True, 'user': user.to_dict()}
        
    except Exception as e:
        # request.log.error(f"Error updating user {user_id}: {str(e)}")
        return HTTPBadRequest(json_body={'error': 'Terjadi kesalahan saat mengupdate user.', 'details': str(e)})

@view_config(route_name='user_delete', request_method='DELETE', renderer='json')
def user_delete(request):
    """View untuk menghapus data pengguna"""
    dbsession = request.dbsession
    user_id = request.matchdict['id']
    
    user = dbsession.query(User).filter_by(id=user_id).first()
    if user is None:
        return HTTPNotFound(json_body={'error': 'User tidak ditemukan'})
    
    dbsession.delete(user)
    dbsession.flush()
    
    return {'success': True, 'message': f'User dengan id {user_id} berhasil dihapus'}

# --- Review Views ---

@view_config(route_name='review_list', renderer='json', request_method='GET')
def review_list(request):
    """View untuk menampilkan daftar review"""
    dbsession = request.dbsession
    reviews = dbsession.query(Review).all()
    return {'reviews': [r.to_dict() for r in reviews]}

@view_config(route_name='review_detail', renderer='json', request_method='GET')
def review_detail(request):
    """View untuk melihat detail satu review"""
    dbsession = request.dbsession
    review_id = request.matchdict['id']
    review = dbsession.query(Review).filter_by(id=review_id).first()
    
    if review is None:
        return HTTPNotFound(json_body={'error': 'Review tidak ditemukan'})
    
    return {'review': review.to_dict()}

@view_config(route_name='review_add', request_method='POST', renderer='json')
def review_add(request):
    """View untuk menambahkan review baru"""
    try:
        json_data = request.json_body
        
        required_fields = ['kuliner_name', 'restaurant_name', 'address', 'description', 'rating', 'user_id']
        for field in required_fields:
            if field not in json_data:
                if field == 'rating' and (json_data.get(field) == '' or json_data.get(field) is None):
                     return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi dan tidak boleh kosong'})
                elif json_data.get(field) is None: 
                    return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi'})

        user_exists = request.dbsession.query(User).filter_by(id=json_data['user_id']).first()
        if not user_exists:
            return HTTPBadRequest(json_body={'error': f'User dengan id {json_data["user_id"]} tidak ditemukan'})

        try:
            rating = int(json_data['rating'])
            if not (1 <= rating <= 5):
                raise ValueError("Rating harus antara 1 dan 5")
        except (ValueError, TypeError): # Tambahkan TypeError untuk handle jika rating bukan angka
             return HTTPBadRequest(json_body={'error': 'Rating harus berupa angka antara 1 dan 5'})

        review = Review(
            kuliner_name=json_data['kuliner_name'],
            restaurant_name=json_data['restaurant_name'],
            address=json_data['address'],
            description=json_data['description'],
            image_url=json_data.get('image_url'), 
            rating=rating,
            user_id=json_data['user_id']
        )
        
        dbsession = request.dbsession
        dbsession.add(review)
        dbsession.flush()
        
        return {'success': True, 'review': review.to_dict()}
            
    except Exception as e:
        # request.log.error(f"Error adding review: {str(e)}")
        return HTTPBadRequest(json_body={'error': 'Terjadi kesalahan saat menambahkan review.', 'details': str(e)})

@view_config(route_name='review_update', request_method='PUT', renderer='json')
def review_update(request):
    """View untuk mengupdate data review"""
    dbsession = request.dbsession
    review_id = request.matchdict['id']
    
    review = dbsession.query(Review).filter_by(id=review_id).first()
    if review is None:
        return HTTPNotFound(json_body={'error': 'Review tidak ditemukan'})
    
    try:
        json_data = request.json_body
        
        if 'kuliner_name' in json_data:
            review.kuliner_name = json_data['kuliner_name']
        if 'restaurant_name' in json_data:
            review.restaurant_name = json_data['restaurant_name']
        if 'address' in json_data:
            review.address = json_data['address']
        if 'description' in json_data:
            review.description = json_data['description']
        if 'image_url' in json_data: 
            review.image_url = json_data['image_url']
        if 'rating' in json_data:
            try:
                rating = int(json_data['rating'])
                if not (1 <= rating <= 5):
                    raise ValueError("Rating harus antara 1 dan 5")
                review.rating = rating
            except (ValueError, TypeError): # Tambahkan TypeError
                return HTTPBadRequest(json_body={'error': 'Rating harus berupa angka antara 1 dan 5'})
            
        dbsession.flush()
        return {'success': True, 'review': review.to_dict()}
        
    except Exception as e:
        # request.log.error(f"Error updating review {review_id}: {str(e)}")
        return HTTPBadRequest(json_body={'error': 'Terjadi kesalahan saat mengupdate review.', 'details': str(e)})

@view_config(route_name='review_delete', request_method='DELETE', renderer='json')
def review_delete(request):
    """View untuk menghapus data review"""
    dbsession = request.dbsession
    review_id = request.matchdict['id']
    
    review = dbsession.query(Review).filter_by(id=review_id).first()
    if review is None:
        return HTTPNotFound(json_body={'error': 'Review tidak ditemukan'})
        
    dbsession.delete(review)
    dbsession.flush()
    
    return {'success': True, 'message': f'Review dengan id {review_id} berhasil dihapus'}