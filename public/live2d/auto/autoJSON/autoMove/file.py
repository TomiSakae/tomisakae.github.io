import os
import shutil

# Đường dẫn tới thư mục chứa file Python và các thư mục cần di chuyển
source_directory = os.path.dirname(os.path.abspath(__file__))

# Đường dẫn tới thư mục đích
destination_directory = 'C:/Users/TomiSakae/Documents/tomisakae.github.io/public/live2d/auto/LpkUnpacker/lpkfolder'

# Đường dẫn tới tệp models.txt
models_file_path = os.path.join(source_directory, 'models.txt')

# Đọc danh sách ID từ tệp models.txt
with open(models_file_path, 'r') as file:
    id_list = [line.strip() for line in file]

# Tạo thư mục đích nếu chưa tồn tại
os.makedirs(destination_directory, exist_ok=True)

# Mở tệp models.txt ở chế độ append
with open(models_file_path, 'a') as file:
    # Duyệt qua tất cả các mục trong thư mục nguồn
    for item in os.listdir(source_directory):
        item_path = os.path.join(source_directory, item)
        
        # Kiểm tra nếu mục đó là một thư mục và tên thư mục không nằm trong danh sách ID
        if os.path.isdir(item_path) and item not in id_list:
            # Di chuyển thư mục đến thư mục đích
            shutil.move(item_path, os.path.join(destination_directory, item))
            
            # Ghi tên thư mục đã di chuyển vào tệp models.txt
            file.write(item + '\n')
