import os
import json

# Đường dẫn tới thư mục hiện tại chứa file Python này
current_directory = os.path.dirname(os.path.abspath(__file__))

# Duyệt qua tất cả các file và thư mục trong thư mục hiện tại
for root, dirs, files in os.walk(current_directory):
    for file_name in files:
        # Chỉ xử lý các file có tên là model0.json
        if file_name == 'model0.json':
            file_path = os.path.join(root, file_name)
            
            # Đọc dữ liệu từ file JSON
            with open(file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)

            # Kiểm tra và thêm trường "Motion" nếu không có
            for hit_area in data.get("HitAreas", []):
                if "Motion" not in hit_area:
                    hit_area["Motion"] = "Tap" + hit_area["Name"]

            # Ghi dữ liệu đã cập nhật trở lại vào file JSON
            with open(file_path, 'w', encoding='utf-8') as file:
                json.dump(data, file, ensure_ascii=False, indent=4)

            print(f"Updated JSON data in {file_path}")
