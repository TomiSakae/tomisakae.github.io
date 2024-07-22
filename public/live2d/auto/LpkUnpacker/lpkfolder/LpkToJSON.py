import os
import subprocess
import json

# Hàm để làm đẹp lại file JSON
def beautify_json(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4, ensure_ascii=False)
        
        print(f"Đã làm đẹp file JSON: {file_path}")
    except Exception as e:
        print(f"Không thể làm đẹp file JSON {file_path}: {e}")

# Lấy đường dẫn đến thư mục chứa file Python này
base_directory = os.path.dirname(os.path.abspath(__file__))

# Lấy đường dẫn đến thư mục cha của thư mục chứa file Python
parent_directory = os.path.dirname(base_directory)

# Đường dẫn đến thư mục output nằm ngoài thư mục chứa file Python một cấp
output_directory = os.path.join(parent_directory, 'output')

# Tạo thư mục output nếu chưa tồn tại
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# Biến đếm để đặt tên thứ tự cho các thư mục
folder_count = 1

# Lưu trữ thông tin về các thư mục đã đổi tên
renamed_folders = []

# Lặp qua tất cả các thư mục con trong thư mục chứa file Python này
for subdir, _, files in os.walk(base_directory):
    # Bỏ qua thư mục gốc chứa file Python và thư mục output
    if subdir == base_directory or subdir.startswith(output_directory):
        continue
    
    lpk_found = False
    for filename in files:
        if filename.endswith('.lpk'):
            # Đường dẫn đầy đủ đến file hiện tại
            old_path = os.path.join(subdir, filename)
            
            # Đường dẫn đầy đủ đến file mới
            new_path = os.path.join(subdir, 'target.lpk')
            
            # Đổi tên file
            os.rename(old_path, new_path)
            
            print(f"Đã đổi tên '{filename}' trong thư mục '{subdir}' thành 'target.lpk'")
            lpk_found = True
    
    # Nếu tìm thấy file .lpk và đã đổi tên, tiến hành đổi tên thư mục
    if lpk_found:
        new_subdir_name = os.path.join(base_directory, str(folder_count))
        os.rename(subdir, new_subdir_name)
        print(f"Đã đổi tên thư mục '{subdir}' thành '{new_subdir_name}'")
        
        # Tạo thư mục tương ứng trong thư mục output
        output_subdir_name = os.path.join(output_directory, str(folder_count))
        os.makedirs(output_subdir_name)
        print(f"Đã tạo thư mục '{output_subdir_name}' trong thư mục output")
        
        # Lưu lại thông tin thư mục đã đổi tên
        renamed_folders.append((new_subdir_name, str(folder_count)))
        
        folder_count += 1

# Chạy lệnh cmd cho từng thư mục đã đổi tên
for folder, folder_id in renamed_folders:
    config_path = os.path.join(folder, 'config.json')
    lpk_path = os.path.join(folder, 'target.lpk')
    output_path = os.path.join(output_directory, folder_id)
    
    # Lệnh cmd cần chạy
    cmd = f'python LpkUnpacker.py -c "{config_path}" "{lpk_path}" "{output_path}"'
    
    # Thực thi lệnh cmd và chờ đợi hoàn thành
    subprocess.run(cmd, shell=True, cwd=parent_directory, check=True)
    print(f"Đã thực thi lệnh: {cmd}")

    # Đường dẫn đến thư mục chứa file model0.json
    character_directory = os.path.join(output_directory, folder_id, 'character')
    model_json_path = os.path.join(character_directory, 'model0.json')
    
    # Làm đẹp file model0.json
    beautify_json(model_json_path)
