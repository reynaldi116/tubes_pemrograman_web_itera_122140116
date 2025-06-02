from sqlalchemy import (
    Column,
    Integer,
    Text,
    String # Bisa juga menggunakan Text untuk semua field teks jika diinginkan
)

# Asumsikan Anda memiliki file meta.py atau sejenisnya untuk Base
# from .meta import Base
# Jika tidak, Anda bisa mendefinisikan Base di sini:
from sqlalchemy.ext.declarative import declarative_base
from .meta import Base

class User(Base):
    """ Model dasar untuk tabel pengguna (user) """
    __tablename__ = 'users' # Nama tabel

    id = Column(Integer, primary_key=True)
    nama_lengkap = Column(String(100), nullable=False) # Sesuai dengan 'name' di RegisterForm
    email = Column(String(120), unique=True, nullable=False)
    # Password disimpan sebagai teks biasa dalam versi dasar ini
    # Dalam implementasi nyata, ini HARUS di-hash
    password = Column(String(256), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'nama_lengkap': self.nama_lengkap,
            'email': self.email,
            # Password sebaiknya tidak pernah dimasukkan ke dalam to_dict()
            # bahkan dalam versi dasar, untuk membiasakan praktik yang aman.
            # 'password': self.password, # Hindari ini
        }

    def __repr__(self):
        return f'<User {self.nama_lengkap}>'


class Review(Base):
    """ Model dasar untuk tabel review kuliner """
    __tablename__ = 'reviews' # Nama tabel

    id = Column(Integer, primary_key=True)
    kuliner_name = Column(String(200), nullable=False) # Nama spesifik kuliner
    restaurant_name = Column(String(200), nullable=False) # Nama restoran
    address = Column(Text, nullable=False) # Alamat restoran
    description = Column(Text, nullable=False) # Deskripsi review
    image_url = Column(String(500), nullable=True) # URL ke foto kuliner (opsional)
    rating = Column(Integer, nullable=False) # Rating (misal 1-5)

    # user_id sebagai foreign key placeholder (belum ada relasi formal)
    # Ini akan merujuk ke 'id' dari tabel 'users' nantinya
    user_id = Column(Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'kuliner_name': self.kuliner_name,
            'restaurant_name': self.restaurant_name,
            'address': self.address,
            'description': self.description,
            'image_url': self.image_url,
            'rating': self.rating,
            'user_id': self.user_id,
        }

    def __repr__(self):
        return f'<Review {self.kuliner_name} at {self.restaurant_name}>'