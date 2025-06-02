"""Pyramid bootstrap environment. """
from alembic import context
from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config

# 1. Impor Base dari model Anda.
# PENTING: Agar Alembic dapat mendeteksi tabel User dan Review Anda,
# kelas User (dari user.py) dan Review (dari mymodel.py) HARUS SUDAH DIIMPOR
# (biasanya melalui mykulinerdb/models/__init__.py) SEBELUM baris ini dieksekusi.
# Ini memastikan bahwa User dan Review telah terdaftar dengan metadata dari 'Base'.
from mykulinerdb.models.meta import Base

# Ini adalah objek Config Alembic, bukan settings aplikasi Anda.
config = context.config

# Setup logging menggunakan nama file konfigurasi dari Alembic.
# Pastikan Anda menjalankan perintah alembic dengan path yang benar ke file .ini Anda.
if config.config_file_name:
    setup_logging(config.config_file_name)
else:
    print("Warning: Alembic config.config_file_name is not set. Logging may not be configured.")

# 2. Dapatkan settings aplikasi dari file .ini Anda (misalnya, development.ini).
# 'get_appsettings' akan mem-parse file .ini.
# Pastikan nama section benar (defaultnya 'main' jika tidak ada nama aplikasi di .ini).
# Jika nama aplikasi Anda adalah 'mykulinerdb' di .ini, gunakan:
# settings = get_appsettings(config.config_file_name, name='mykulinerdb')
try:
    settings = get_appsettings(config.config_file_name)
except Exception as e:
    print(f"Error loading application settings from {config.config_file_name}: {e}")
    print("Ensure the INI file path is correct and the file is valid.")
    # Anda mungkin ingin keluar atau menangani ini secara berbeda jika settings tidak bisa dimuat.
    settings = {} # Fallback ke dictionary kosong agar tidak error di bawah, tapi migrasi mungkin gagal.


# 3. Tetapkan target_metadata.
# Ini adalah metadata yang akan dibandingkan Alembic dengan database.
# Jika User dan Review tidak terdaftar di Base.metadata, Alembic tidak akan melihatnya.
target_metadata = Base.metadata


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    # Dapatkan URL database dari settings aplikasi.
    url = settings.get('sqlalchemy.url')
    if not url:
        # Jika 'sqlalchemy.url' tidak ditemukan di settings, coba ambil langsung dari config Alembic
        # Ini berguna jika Anda mendefinisikan sqlalchemy.url langsung di alembic.ini
        # atau melalui -x pada command line alembic.
        url = config.get_main_option("sqlalchemy.url")
    
    if not url:
        raise ValueError(
            "Database URL not found. Ensure 'sqlalchemy.url' is set in your "
            "application's .ini file (e.g., development.ini) or directly in alembic.ini."
        )

    context.configure(
        url=url,
        target_metadata=target_metadata, # Pastikan target_metadata diteruskan di sini
        literal_binds=True, # Berguna untuk menghasilkan skrip SQL
        dialect_opts={"paramstyle": "named"}, # Pengaturan umum untuk beberapa dialek
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    # Buat engine dari settings aplikasi.
    # 'prefix="sqlalchemy."' memberi tahu engine_from_config untuk mencari kunci
    # seperti 'sqlalchemy.url', 'sqlalchemy.pool_size', dll.
    connectable = engine_from_config(
        settings, # Gunakan settings yang sudah diambil dari get_appsettings
        prefix="sqlalchemy.",
        # poolclass=pool.NullPool, # Opsional: gunakan NullPool jika Anda tidak ingin koneksi pooling di sini
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
            # Anda dapat menambahkan opsi lain di sini jika diperlukan, misalnya:
            # compare_type=True, # Untuk diff autogenerate yang lebih detail
            # include_schemas=True, # Jika Anda menggunakan beberapa skema database
        )

        try:
            with context.begin_transaction():
                context.run_migrations()
        finally:
            connection.close()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()