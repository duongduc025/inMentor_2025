import psycopg2

# Thông tin kết nối
conn_string = "host='db.jdauzuqcecjknjmgpkwp.supabase.co' dbname='postgres' user='postgres' password='Duongduc025@' port='5432'"

# Thử kết nối
try:
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    print("Kết nối thành công!")
    
    # Thử thực hiện một truy vấn đơn giản
    cursor.execute("SELECT version();")
    version = cursor.fetchone()
    print(f"Phiên bản PostgreSQL: {version[0]}")
    
    cursor.close()
    conn.close()
except Exception as e:
    print(f"Lỗi kết nối: {e}")
