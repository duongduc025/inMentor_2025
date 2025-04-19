import gradio as gr
from supabase import create_client, Client
from typing import Union
# Thông tin Supabase của bạn
SUPABASE_URL = "https://pylebcixrgfsitjtxlbu.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5bGViY2l4cmdmc2l0anR4bGJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Mzc5MDMsImV4cCI6MjA2MDExMzkwM30.IAtO3L9tqP2zteUEdVrghqRMDogVnWPp6J5mC1hGbIY"

# Thay bằng API Key của bạn
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class CreateUserRequest:
    def __init__(self, email: str, password: str, full_name: str):
        self.email = email
        self.password = password
        self.full_name = full_name

def sign_up_with_email(create_user_req: CreateUserRequest) -> Union[str, dict]:
    try:
        # Đăng ký người dùng vào Supabase Auth
       response = supabase.auth.sign_up({
            "email": "kkkkkksskssk@example.com",
            "password": "password123",
             "options": {
                "data": {  # Metadata should be inside "options"
    
                    "display_name": "Anhhhhh Nguyen",
                }
            }
        })
        # if response.user:
        # #     return response.user  # Trả về người dùng nếu thành công
        # else:
        #     return "Unknown error occurred"  # Trả về thông báo lỗi nếu không có người dùng
    except Exception as e:
        return str(e)  # Trả về lỗi nếu có

# Ví dụ sử dụng
create_user_req = CreateUserRequest(
    email="exampleeee@example.com",
    password="password123",
    full_name="John Doe"
)

result = sign_up_with_email(create_user_req)
print(result)
