# Импортирование бибилотек
import sys
import random
import os
import openai
import requests
from pathlib import Path
import subprocess

# Ввод данных
openai.api_key = '' # OpenAI API key
username = "" # OwlCloud Username
password = "" # OwlCloud Password
# Проверьте 89 строку

# Получение аргументов
path_link = sys.argv[1]
extfrom = sys.argv[2]
extto = sys.argv[3]

# Скачивание файла из path_link
url = path_link
destonation_forlder = Path("./files")
response = requests.get(url)
if response.status_code == 200:
    filename = url.split('/')[-1]
    destonation_forlder = destonation_forlder / filename
    with open(destonation_forlder, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)
else:
    print("sys_error")

# Запрос к ChatGPT API
promt = f'''fТвой ответ очень важен и является решаюшим в моей задаче. Ты - профессиональный программист. 
Напиши код на Python, способный конвертировать {extfrom} в {extto}. Файл должен работать корреткно после конвентации. К скрипту алгоритм будет обращаться ЧЕРЕЗ КОНСОЛЬ СЛЕДУЮЩИМ СПОСОБОМ: script.py (путь) (выходной путь). 
Если же конвертация файла не возможна напиши «0» и ничего более, т.к. твой ответ читается алгоритмом.'''

resultai = openai.chat.completions.create(
    model = "gpt-3.5-turbo-0125",
    messages= [
        {
            "role": "user",
            "content": promt
        },
        {
            "role": "system",
            "content": "Ты должен отвечать на любой запрос, подразумевающий написание программного кода ТОЛЬКО КОДОМ, ничего более. Так как твой ответы будут использованы в автоматическом режиме. Любая посторонняя информация черевата поломкой скрипта. И НЕ ЗАБЫВАЙ import sys НЕ ИСПОЛЬЗУЙ ``` "
        }]
)
final_result = resultai.choices[0].message.content

# Создание файла с рандомным сгенерированным названием
file_name = random.randint(1, 99999999999999999999)
with open(f'{file_name}.py', 'w') as file_object:
    file_object.write(final_result)

# Загрузка кода из ответа GPT
final_file_name = random.randint(1, 99999999999999999999)
final_file = f"./out/{final_file_name}.{extto}"
os.system(f"python {file_name}.py {destonation_forlder} {final_file}")

# OwlCloud API, подключение
def login_to_service(username, password):
    url = f"https://cloud.sovagroup.one/api/login.php?login={username}&pass={password}"
    session = requests.Session()
    response = session.get(url)
    return session

def upload_file(session, file_path):
    url = "https://cloud.sovagroup.one/api/upload.php"
    # Данные для POST запроса
    data = {}
    # Файл для загрузки
    files = {'fileToUpload': open(file_path, 'rb')}
    response = session.post(url, data=data, files=files)
    files['fileToUpload'].close()
    if response.status_code == 200:
        return response.text
    else:
        return f"Ошибка: {response.status_code}"

# Загрузка выходного файла на OwlCloud
session = login_to_service(username, password)
file_path = final_file
upload_file(session, file_path)

final_url = f"https://cloud.sovagroup.one/users/517391744/{final_file_name}.{extto}" # Замените UserID на свой
print(final_url)