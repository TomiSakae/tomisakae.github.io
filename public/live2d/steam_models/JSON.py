import json

# Tên file JSON trong thư mục hiện tại
file_name = '66/character/model0.json'

# Đọc dữ liệu từ file JSON với mã hóa UTF-8
with open(file_name, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Kiểm tra và thêm trường "Motion" nếu không có
for hit_area in data.get("HitAreas", []):
    if "Motion" not in hit_area:
        hit_area["Motion"] = "Tap" + hit_area["Name"]

# Ghi dữ liệu đã cập nhật trở lại vào file JSON với mã hóa UTF-8
with open(file_name, 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

print("Updated JSON data:")