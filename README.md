# Brainified: Heatmap of Road Traffic

Проект для **Decentrathon 4.0, Кейс 2**.  
Веб-приложение отображает **тепловую карту на основе обезличенных геотреков поездок**, чтобы визуализировать загруженные участки дорог.  
Создано с помощью **React + Python + TailwindCSS**.

---

## Getting Started

### 1. Клонирование проекта

```bash
git clone https://github.com/TimurMukushev/brainified.git
cd brainified
```

### 2. Установка зависимостей фронтенда

```bash
npm install
```

### 3. Настройка Google Maps API

Проект использует Google Maps API (Free trial). Для работы необходимо:

1. Получить API ключ на [Google Cloud Console](https://console.cloud.google.com/).
2. Создать файл `.env` в корне проекта и добавить:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
```

> **Важно:** `.env` не загружается в Git и остаётся локально.

### 4. Backend (Python)

```bash
cd backend
python -m venv venv            # создать виртуальное окружение
# Активировать виртуальное окружение:
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python app.py                  # запустить сервер
```

Сервер будет доступен на `http://localhost:5000/api/heatmap`.

### 5. Запуск фронтенда

```bash
npm start
```

* Откроется [http://localhost:3000](http://localhost:3000).
* Страница перезагружается при изменениях кода.
* Любые ошибки lint будут отображаться в консоли.

```
```
