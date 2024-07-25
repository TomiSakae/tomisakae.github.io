import os
import json

def process_motions(data):
    if 'FileReferences' in data and 'Motions' in data['FileReferences']:
        motions = data['FileReferences']['Motions']
        animation_data = []

        # Lấy tất cả dữ liệu từ các mục của 'Motions'
        for key, value in motions.items():
            if isinstance(value, list):
                animation_data.extend(value)

        # Tạo key 'Animation' trong 'Motions' với dữ liệu đã tổng hợp
        data['FileReferences']['Motions']['Animation'] = animation_data
        
        # Tạo các key mới trong 'Motions' từ 'Animation'
        if 'Animation' in data['FileReferences']['Motions']:
            animation_items = data['FileReferences']['Motions']['Animation']
            
            # Thêm các key mới vào 'Motions' từ 'Animation'
            for index, item in enumerate(animation_items):
                new_key = f"Animation_{index+1}"
                if new_key not in motions:
                    motions[new_key] = [item]

    return data

def process_files_in_directory(base_directory):
    for item in os.listdir(base_directory):
        item_path = os.path.join(base_directory, item)
        if os.path.isdir(item_path):
            if item == 'character':
                model0_path = os.path.join(item_path, 'model0.json')
                if os.path.isfile(model0_path):
                    try:
                        # Đọc dữ liệu từ tệp model0.json
                        with open(model0_path, 'r', encoding='utf-8') as file:
                            data = json.load(file)
                        
                        # Xử lý dữ liệu
                        data = process_motions(data)
                        
                        # Ghi dữ liệu đã xử lý vào tệp model0.json
                        with open(model0_path, 'w', encoding='utf-8') as file:
                            json.dump(data, file, ensure_ascii=False, indent=4)
                        
                        print(f"Đã xử lý và lưu tệp {model0_path} thành công.")
                    except Exception as e:
                        print(f"Đã xảy ra lỗi khi xử lý tệp {model0_path}: {e}")
                else:
                    print(f"Tệp {model0_path} không tồn tại.")
            else:
                process_files_in_directory(item_path)

# Thư mục gốc chứa script Python
base_directory = os.path.dirname(os.path.abspath(__file__))

# Xử lý các tệp trong thư mục gốc
process_files_in_directory(base_directory)
