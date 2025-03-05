require('dotenv').config(); // تحميل متغيرات البيئة
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express(); // ✅ تعريف `app` قبل استخدامه
const PORT = process.env.PORT || 3000;

// ✅ تفعيل CORS مع تحديد `origin`
app.use(cors({
  origin: 'https://mahmoudfattah.github.io', // السماح فقط لموقعك
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// ✅ معالجة طلبات Preflight
app.options('*', cors());

// ✅ الاتصال بقاعدة بيانات MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ تم الاتصال بقاعدة البيانات'))
  .catch(err => console.error('❌ فشل الاتصال بقاعدة البيانات:', err));

// ✅ الاستماع لأخطاء الاتصال بقاعدة البيانات
mongoose.connection.on('error', err => {
    console.error("❌ خطأ في الاتصال بقاعدة البيانات:", err);
});
mongoose.connection.once('open', () => {
    console.log("✅ تم الاتصال بقاعدة البيانات بنجاح!");
});

// ✅ إنشاء نموذج Schema للرسائل
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String
});
const Message = mongoose.model('Message', messageSchema);

// ✅ إضافة Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ✅ جعل مجلد `public` متاحًا للسيرفر
app.use(express.static(path.join(__dirname, 'public')));

// ✅ إضافة المسار `/` لإصلاح خطأ `Cannot GET /`
app.get("/", (req, res) => {
    res.send("🚀 السيرفر يعمل بنجاح!");
});

// ✅ استقبال بيانات النموذج وحفظها في قاعدة البيانات
app.post('/contact', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    console.log("✅ تم حفظ الرسالة في قاعدة البيانات:", req.body);
    res.json({ success: true, message: 'تم إرسال الرسالة بنجاح!' });
  } catch (error) {
    console.error("❌ خطأ أثناء حفظ البيانات:", error);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء الإرسال.', error: error.message });
  }
});

// ✅ تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على http://0.0.0.0:${PORT}`);
});

// ✅ طباعة MONGO_URI في بيئة التطوير فقط
if (process.env.NODE_ENV === 'development') {
  console.log("MONGO_URI:", process.env.MONGO_URI);
}
