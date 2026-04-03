# 🍊 Chitra Jobs — Complete Website

**Tamil Nadu's Trusted Job Placement Agency**
📍 Door No. 17, GH Road, Singampunari, Tamil Nadu – 630502

---

## 📁 File Structure

```
chitra-jobs/
│
├── index.html              ← Main website (frontend)
│
└── backend/
    ├── server.js           ← Node.js + Express backend
    ├── package.json        ← Dependencies
    ├── .env.example        ← Environment variables template
    └── .env                ← Your secrets (create this from .env.example)
```

---

## 🚀 How to Run

### Step 1 – Install Node.js
Download from: https://nodejs.org (LTS version)

### Step 2 – Install backend dependencies
```bash
cd backend
npm install
```

### Step 3 – Set up environment variables
```bash
cp .env.example .env
```
Open `.env` and fill in your Telegram details (see below).

### Step 4 – Start the server
```bash
npm start
```
Visit: http://localhost:3000

---

## 📲 Telegram Bot Setup (Receive Applications)

When someone applies for a job on your website, the details are sent to your Telegram bot automatically.

### Get Your Bot Token:
1. Open Telegram → search **@BotFather**
2. Send `/newbot`
3. Give it a name: `Chitra Jobs`
4. Give it a username: `Chitra_jobs_bot` (already exists — ask BotFather to link)
5. Copy the **Token** (looks like: `123456789:ABCdefGHI...`)
6. Paste it in `.env` as `TELEGRAM_BOT_TOKEN`

### Get Your Chat ID:
1. Send `/start` to your bot (@Chitra_jobs_bot)
2. Open this URL in browser (replace YOUR_TOKEN):
   ```
   https://api.telegram.org/botYOUR_TOKEN/getUpdates
   ```
3. Look for `"chat":{"id": 123456789}` — that number is your Chat ID
4. Paste it in `.env` as `TELEGRAM_CHAT_ID`

---

## 🌐 Deploy to Internet (Go Live)

### Option A – Free (Render.com)
1. Push code to GitHub
2. Go to https://render.com → New Web Service
3. Connect your GitHub repo
4. Set start command: `cd backend && npm install && npm start`
5. Add environment variables (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)
6. Deploy! Get a free `.onrender.com` URL

### Option B – VPS (Hostinger / DigitalOcean)
```bash
# On your server:
git clone YOUR_REPO
cd chitra-jobs/backend
npm install
# Install PM2 to keep server running:
npm install -g pm2
pm2 start server.js --name "chitra-jobs"
pm2 save
```

### Option C – Shared Hosting (cPanel)
- Upload `index.html` to `public_html/`
- For backend, use a VPS or Render.com (shared hosting doesn't support Node.js well)

---

## 🌐 Domain Recommendation

| Domain | Cost/Year | Recommended? |
|--------|-----------|--------------|
| `chitrajobs.com` | ₹800–₹1,200 | ⭐ Best |
| `chitrajobs.in` | ₹500–₹700 | Good |
| `chitrajobs.co.in` | ₹400–₹600 | Budget |

**Where to buy:** Hostinger India, GoDaddy, Namecheap

---

## 📞 Contact Details Configured
- **Phone:** +91 93858 52049
- **Email:** chithrajobs000@gmail.com
- **Address:** Door No. 17, GH Road, Singampunari, TN – 630502
- **WhatsApp:** https://wa.me/qr/544VUG3VQK5RL1
- **Telegram Bot:** https://t.me/Chitra_jobs_bot

---

## 🛠 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/apply` | Submit a job application (sends to Telegram) |
| `POST` | `/api/contact` | Submit contact form (sends to Telegram) |
| `GET` | `/api/health` | Check if server is running |

---

*Made for Chitra Jobs, Singampunari, Tamil Nadu.*
