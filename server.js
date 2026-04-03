/**
 * ============================================================
 *  CHITRA JOBS — Backend Server
 *  Node.js + Express + Telegram Bot Integration
 *  Sends job applications and contact forms to Telegram Bot
 * ============================================================
 *  SETUP:
 *    1. npm install
 *    2. Copy .env.example to .env and fill in your values
 *    3. node server.js   (or: npm start)
 * ============================================================
 */

require('dotenv').config();
const express     = require('express');
const cors        = require('cors');
const path        = require('path');
const axios       = require('axios');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Middleware ──────────────────────────────────────────── */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend (index.html + assets) from parent directory
app.use(express.static(path.join(__dirname, '..')));

/* ── Telegram Config ─────────────────────────────────────── */
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;   // From @BotFather
const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;     // Your admin Telegram chat ID

/**
 * Send a message to the Telegram bot
 * @param {string} message - Formatted message text (supports HTML)
 */
async function sendTelegram(message) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('⚠️  Telegram credentials not set. Skipping Telegram notification.');
    return false;
  }
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const res = await axios.post(url, {
      chat_id:    CHAT_ID,
      text:       message,
      parse_mode: 'HTML',
    });
    return res.data.ok;
  } catch (err) {
    console.error('Telegram send error:', err?.response?.data || err.message);
    return false;
  }
}

/* ── Format helpers ──────────────────────────────────────── */
function nowIST() {
  return new Date().toLocaleString('en-IN', {
    timeZone:  'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function fVal(v) {
  return v && v.trim() ? v.trim() : '—';
}

/* ── API ROUTES ──────────────────────────────────────────── */

/**
 * POST /api/apply
 * Receives a job application and forwards it to Telegram.
 */
app.post('/api/apply', async (req, res) => {
  const {
    jobTitle, jobCategory, salary,
    name, phone, email,
    age, gender, location,
    experience, qualification, message,
  } = req.body;

  // Basic validation
  if (!name || !phone || !location) {
    return res.status(400).json({ success: false, error: 'Name, phone, and location are required.' });
  }

  const msg = `
🆕 <b>New Job Application — Chitra Jobs</b>

💼 <b>Job:</b> ${fVal(jobTitle)}
📂 <b>Category:</b> ${fVal(jobCategory)}
💰 <b>Salary Range:</b> ${fVal(salary)}

👤 <b>Applicant Details</b>
━━━━━━━━━━━━━━━━
👤 <b>Name:</b> ${fVal(name)}
📱 <b>Phone:</b> ${fVal(phone)}
📧 <b>Email:</b> ${fVal(email)}
🎂 <b>Age:</b> ${fVal(age)}
🚻 <b>Gender:</b> ${fVal(gender)}
📍 <b>Location:</b> ${fVal(location)}
💼 <b>Experience:</b> ${fVal(experience)}
🎓 <b>Qualification:</b> ${fVal(qualification)}

📝 <b>Message:</b>
${fVal(message)}

⏰ <b>Applied At:</b> ${nowIST()}
━━━━━━━━━━━━━━━━
<i>Reply to this message to contact the applicant.</i>
  `.trim();

  const sent = await sendTelegram(msg);

  // Log to console as well
  console.log('\n📥 APPLICATION RECEIVED');
  console.log(`   Job:    ${jobTitle}`);
  console.log(`   Name:   ${name}`);
  console.log(`   Phone:  ${phone}`);
  console.log(`   Loc:    ${location}`);
  console.log(`   Telegram notified: ${sent}`);
  console.log(`   Time:   ${nowIST()}\n`);

  return res.json({ success: true, telegramSent: sent });
});

/**
 * POST /api/contact
 * Receives a general contact form submission.
 */
app.post('/api/contact', async (req, res) => {
  const { name, phone, email, type, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, error: 'Name and phone are required.' });
  }

  const msg = `
📬 <b>New Contact Form — Chitra Jobs</b>

👤 <b>Name:</b> ${fVal(name)}
📱 <b>Phone:</b> ${fVal(phone)}
📧 <b>Email:</b> ${fVal(email)}
🏷 <b>Inquiry Type:</b> ${fVal(type)}

💬 <b>Message:</b>
${fVal(message)}

⏰ <b>Received At:</b> ${nowIST()}
  `.trim();

  const sent = await sendTelegram(msg);

  console.log('\n📬 CONTACT FORM RECEIVED');
  console.log(`   Name:   ${name}`);
  console.log(`   Phone:  ${phone}`);
  console.log(`   Type:   ${type}`);
  console.log(`   Telegram notified: ${sent}\n`);

  return res.json({ success: true, telegramSent: sent });
});

/**
 * GET /api/health
 * Health-check endpoint.
 */
app.get('/api/health', (_req, res) => {
  res.json({
    status:    'ok',
    service:   'Chitra Jobs Backend',
    time:      nowIST(),
    telegram:  BOT_TOKEN ? 'configured' : 'not configured',
  });
});

/* ── Fallback: serve index.html for all other GET requests ── */
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

/* ── Start server ────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║         CHITRA JOBS BACKEND              ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log(`║  Server running at http://localhost:${PORT}  ║`);
  console.log(`║  Telegram: ${BOT_TOKEN ? '✅ configured' : '❌ NOT configured (add .env)'}         ║`);
  console.log('╚══════════════════════════════════════════╝');
});
