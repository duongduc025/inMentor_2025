import psycopg2

# Sửa host: bỏ "https://"
conn_string = "host='jdauzuqcecjknjmgpkwp.supabase.co' dbname='inMentor' user='postgres' password='inMentor@2004' port='5432'"

try:
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    print("Kết nối thành công!")

    cursor.close()
    conn.close()
except Exception as e:
    print(f"Lỗi kết nối: {e}")
