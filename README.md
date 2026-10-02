# سازوکار جهان — How It Works

یک وب‌سایت آموزشی فارسی و راست‌چین با Flask. نسخه‌ی تعاملی شامل طراحی تیره، کره‌ی برداری موضوعات، فیلتر موضوع‌ها، ده صفحه‌ی آموزشی با تب‌های تعاملی، یک مقاله‌ی کامل، انیمیشن‌های ورود و صفحه‌ی خطای اختصاصی است.

## امکانات

- رابط فارسی، راست‌چین و واکنش‌گرا
- کره‌ی تعاملی با ده موضوع آموزشی
- کارت‌ها و تب‌های اطلاعاتی قابل کلیک
- انیمیشن‌های ورود، بارگذاری و حرکت اجزای گرافیکی
- مقاله‌ی آموزشی و صفحه‌ی خطای اختصاصی

## پیش‌نیاز

- Python 3.10 یا جدیدتر

هنگام نصب Python در ویندوز، گزینه‌ی **Add Python to PATH** را فعال کنید.

## اجرای پروژه در ویندوز (PowerShell)

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
py -m pip install -r requirements.txt
py app.py
```

اگر دستور `py` در سیستم شما وجود نداشت، همان دستورها را با `python` اجرا کنید:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

سپس نشانی زیر را در مرورگر باز کنید:

`http://127.0.0.1:5000`

برای متوقف کردن سرور، در پنجره‌ی PowerShell کلیدهای `Ctrl + C` را بزنید.

## اجرای تست‌ها

بعد از فعال‌کردن محیط مجازی و نصب وابستگی‌ها:

```powershell
py -m unittest discover -s tests -v
```

این تست‌ها صفحه‌ی اصلی، مقاله‌ی اول و صفحه‌ی خطای ۴۰۴ را بررسی می‌کنند.

## ساختار پروژه

```text
app.py                 مسیرها و داده‌های نسخه‌ی اول
templates/             قالب‌های HTML
  base.html
  index.html
  article.html
  404.html
static/
  css/style.css        طراحی واکنش‌گرا و راست‌چین
  js/main.js           منوی موبایل و فهرست هوشمند مقاله
tests/test_app.py       تست مسیرهای اصلی سایت
requirements.txt       وابستگی‌های پایتون
```

## انتشار روی Render

پس از قرار گرفتن پروژه در یک مخزن GitHub، در Render یک **Web Service** جدید بسازید و مخزن را انتخاب کنید. فایل `render.yaml` تنظیمات لازم را در خود دارد. اگر تنظیمات را دستی وارد می‌کنید:

```text
Build Command: pip install -r requirements.txt
Start Command: gunicorn app:app
```

پس از پایان ساخت، Render یک نشانی عمومی با دامنه‌ی `onrender.com` نمایش می‌دهد. هر تغییر جدیدی که به شاخه‌ی اصلی GitHub فرستاده شود، به‌صورت خودکار منتشر خواهد شد.

## مشارکت

پیشنهادها و اصلاحات از طریق Issue و Pull Request خوش‌آمد هستند. پیش از ارسال تغییر، تست‌ها را اجرا کنید.

## مجوز

این پروژه تحت مجوز [MIT](LICENSE) منتشر شده است.

