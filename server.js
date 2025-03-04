require('dotenv').config(); // تحميل متغيرات البيئة
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// الاتصال بقاعدة بيانات MongoDB Atlas باستخدام متغيرات البيئة
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ تم الاتصال بقاعدة البيانات'))
  .catch(err => console.error('❌ فشل الاتصال بقاعدة البيانات:', err));

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

// استقبال بيانات النموذج وحفظها في قاعدة البيانات
app.post('/contact', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    console.log("✅ تم حفظ الرسالة في قاعدة البيانات:", req.body);
    res.json({ success: true, message: 'تم إرسال الرسالة بنجاح!' });
  } catch (error) {
    console.error("❌ خطأ أثناء حفظ البيانات:", error);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء الإرسال.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على http://localhost:${PORT}`);
});
console.log("MONGO_URI:", process.env.MONGO_URI);
