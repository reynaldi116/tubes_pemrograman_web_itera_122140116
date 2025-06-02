import transaction
from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config

from ..models import get_tm_session, get_session_factory
from ..models.mykulinerdb import User, Review

def main():
    config_uri = 'development.ini'
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, 'sqlalchemy.')

    session_factory = get_session_factory(engine)

    with transaction.manager:
        dbsession = get_tm_session(session_factory, transaction.manager)

        # Tambahkan user jika belum ada
        user_data = [
            {"nama_lengkap": "Budi Santoso", "email": "budi.santoso@example.com", "password": "passwordbudi"},
            {"nama_lengkap": "Citra Lestari", "email": "citra.lestari@example.com", "password": "passwordcitra"},
            {"nama_lengkap": "Agus Setiawan", "email": "agus.setiawan@example.com", "password": "passwordagus"}
        ]

        users = []
        for data in user_data:
            existing = dbsession.query(User).filter_by(email=data["email"]).first()
            if not existing:
                new_user = User(**data)
                dbsession.add(new_user)
                users.append(new_user)
            else:
                users.append(existing)

        dbsession.flush()  # Mendapatkan ID user

        # Tambahkan review jika belum ada
        review_data = [
            {
                "kuliner_name": "Nasi Goreng Seafood",
                "restaurant_name": "Warung Makan Bahari",
                "address": "Jl. Pantai Indah No. 1, Bandar Lampung",
                "description": "Nasi goreng dengan udang, cumi, dan kerang segar. Porsi mantap!",
                "image_url": "https://i.ibb.co/Jp7xNn8/nasi-goreng-seafood.jpg",
                "rating": 5,
                "user_id": users[0].id
            },
            {
                "kuliner_name": "Sate Padang Maknyus",
                "restaurant_name": "RM Padang Jaya",
                "address": "Jl. Kartini No. 25, Bandar Lampung",
                "description": "Sate daging sapi dengan kuah kuning kental khas Padang. Disajikan dengan ketupat.",
                "image_url": "https://i.ibb.co/GWBqHwN/sate-padang.jpg",
                "rating": 4,
                "user_id": users[1].id
            },
            {
                "kuliner_name": "Pempek Kapal Selam Asli",
                "restaurant_name": "Pempek Cek Ayu",
                "address": "Jl. Teuku Umar No. 88, Bandar Lampung",
                "description": "Pempek kapal selam besar dengan isian telur utuh, cuko kental pedas manis.",
                "image_url": None,
                "rating": 5,
                "user_id": users[0].id
            },
            {
                "kuliner_name": "Ayam Bakar Taliwang",
                "restaurant_name": "Lesehan Taliwang Bersaudara",
                "address": "Jl. Pagar Alam (Gang PU) No. 12, Bandar Lampung",
                "description": "Ayam kampung muda dibakar dengan bumbu taliwang super pedas. Meresap sampai tulang!",
                "image_url": "https://i.ibb.co/k1f8zCv/ayam-bakar-taliwang.jpg",
                "rating": 4,
                "user_id": users[2].id
            },
        ]

        for data in review_data:
            existing = dbsession.query(Review).filter_by(kuliner_name=data["kuliner_name"]).first()
            if not existing:
                dbsession.add(Review(**data))

        
if __name__ == '__main__':
    main()
