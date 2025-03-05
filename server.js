require('dotenv').config(); // تحميل متغيرات البيئة
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // استيراد CORS

const app = express();
const PORT = process.env.PORT || 3000;

// السماح بالطلبات من أي نطاق (CORS)
app.use(cors());

// الاتصال بقاعدة بيانات MongoDB Atlas باستخدام متغيرات البيئة
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// التحقق من نجاح أو فشل الاتصال بقاعدة البيانات
mongoose.connection.on('error', err => {
    console.error("❌ خطأ في الاتصال بقاعدة البيانات:", err);
});
mongoose.connection.once('open', () => {
    console.log("✅ تم الاتصال بقاعدة البيانات بنجاح!");
});

// إنشاء نموذج (Schema) للرسائل
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String
});

const Message = mongoose.model('Message', messageSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// جعل مجلد "public" متاحًا للسيرفر
app.use(express.static(path.join(__dirname, 'public')));

// ✅ **إضافة المسار `/` لإصلاح خطأ `Cannot GET /`**
app.get("/", (req, res) => {
    res.send("🚀 السيرفر يعمل بنجاح!");
});

// استقبال بيانات النموذج وحفظها في قاعدة البيانات
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

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على http://0.0.0.0:${PORT}`);
});

// طباعة متغير MONGO_URI للتحقق منه
console.log("MONGO_URI:", process.env.MONGO_URI);
