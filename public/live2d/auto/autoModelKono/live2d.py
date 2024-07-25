import json
import glob
import os
import shutil

def build_motions_dict(motions_dir):
    motions = {}
    idle_files = []
    idle_keys = {}

    motion_files = glob.glob(os.path.join(motions_dir, '*.motion3.json'))
    
    for motion_file in motion_files:
        file_name = os.path.basename(motion_file)
        motion_name = file_name.replace('.motion3.json', '')
        motion_name_cap = motion_name.capitalize()
        file_path = os.path.join("motions", file_name).replace("\\", "/")
        
        if motion_name.lower().startswith('idle'):
            idle_files.append({"File": file_path})
            if len(motion_name) > 4 and motion_name[4:].isdigit():
                specific_idle_key = f"Idle{motion_name[4:]}"
            else:
                specific_idle_key = "Idle0"
            
            if specific_idle_key not in idle_keys:
                idle_keys[specific_idle_key] = []
            idle_keys[specific_idle_key].append({"File": file_path})
        else:
            if motion_name_cap not in motions:
                motions[motion_name_cap] = []
            motions[motion_name_cap].append({"File": file_path})
    
    if len(idle_files) == 1:
        motions["Idle"] = idle_files
    else:
        motions["Idle"] = idle_files
        for key, files in idle_keys.items():
            motions[key] = files

    animation_files = set()
    motions["Animation"] = []
    for key, files in motions.items():
        if key != "Idle" and not key.startswith('Idle'):
            for file in files:
                file_path = file["File"]
                if file_path not in animation_files:
                    animation_files.add(file_path)
                    motions["Animation"].append({"File": file_path})

    return motions

def update_model_files(model_file_path, motions):
    try:
        with open(model_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)

        if "FileReferences" in data and "Motions" in data["FileReferences"]:
            data["FileReferences"]["Motions"] = motions

        with open(model_file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=2)

        print(f'Updated {model_file_path}')

    except Exception as e:
        print(f'Error updating {model_file_path}: {e}')

def rename_model_file_if_needed(model_file_path):
    directory, file_name = os.path.split(model_file_path)
    if file_name != "Character.model3.json":
        new_file_path = os.path.join(directory, "Character.model3.json")
        os.rename(model_file_path, new_file_path)
        print(f'Renamed {file_name} to Character.model3.json')
        return new_file_path
    return model_file_path

def get_next_id(target_dir):
    subdirectories = [d for d in os.listdir(target_dir) if os.path.isdir(os.path.join(target_dir, d))]
    max_id = 0
    for subdirectory in subdirectories:
        try:
            dir_id = int(subdirectory)
            if dir_id > max_id:
                max_id = dir_id
        except ValueError:
            continue
    return max_id + 1

def process_directory(base_dir):
    model_id = 1
    subdirectories = [d for d in glob.glob(os.path.join(base_dir, '*')) if os.path.isdir(d)]
    models_random_dir = os.path.abspath(os.path.join(base_dir, "../../models_random"))
    os.makedirs(models_random_dir, exist_ok=True)
    
    for subdirectory in subdirectories:
        motions_dir = os.path.join(subdirectory, 'motions')
        
        if os.path.exists(motions_dir):
            motions = build_motions_dict(motions_dir)
            
            model_files = glob.glob(os.path.join(subdirectory, '*.model3.json'))
            
            for model_file_path in model_files:
                update_model_files(model_file_path, motions)
                model_file_path = rename_model_file_if_needed(model_file_path)
                
            # Đổi tên và di chuyển thư mục
            new_id = get_next_id(models_random_dir)
            new_path = os.path.join(models_random_dir, str(new_id))
            shutil.move(subdirectory, new_path)
            print(f'Moved {subdirectory} to {new_path}')
    
    print(f'Completed moving and renaming folders.')

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    process_directory(base_dir)

if __name__ == '__main__':
    main()
