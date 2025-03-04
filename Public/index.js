let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const formData = new FormData(this); 
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            showToast("✅ Message Send Successfully", "success");
            this.reset(); // إعادة تعيين النموذج
        } else {
            showToast("❌ فشل في إرسال الرسالة!", "error");
        }
    } catch (error) {
        showToast("❌ حدث خطأ في الاتصال!", "error");
    }
});

// دالة لإظهار الإشعارات
function showToast(message, type) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// document.querySelector("a").addEventListener("click", function(event) {
//     window.location.href = "https://github.com/Mahmoudfattah";
// });
// document.querySelector("a").addEventListener("click", function(event) {
//     event.preventDefault(); // Prevents JS from blocking navigation
//     window.open(this.href, "_blank"); // Opens in a new tab
// });


// // تحديد العناصر من الصفحة
// let menuIcon = document.querySelector('#menu-icon'); // زر القائمة
// let navbar = document.querySelector('.navbar'); // شريط التنقل
// let sections = document.querySelectorAll('section'); // جميع الأقسام
// let navLinks = document.querySelectorAll('header nav a'); // روابط شريط التنقل

// // وظيفة تغيير الرابط النشط أثناء التمرير
// window.onscroll = () => {
//     let scrollPosition = window.scrollY; // الحصول على موضع التمرير الحالي

//     sections.forEach(section => {
//         let sectionTop = section.offsetTop - 150; // تعويض بسيط لتحسين الرؤية
//         let sectionHeight = section.offsetHeight;
//         let sectionId = section.getAttribute('id');

//         // التحقق مما إذا كان القسم داخل نطاق العرض
//         if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
//             // إزالة التفعيل من جميع الروابط
//             navLinks.forEach(link => link.classList.remove('active'));

//             // تفعيل الرابط الخاص بالقسم الحالي
//             document.querySelector(`header nav a[href*=${sectionId}]`).classList.add('active');
//         }
//     });
// };

// // وظيفة إظهار وإخفاء شريط التنقل عند الضغط على أيقونة القائمة
// menuIcon.onclick = () => {
//     menuIcon.classList.toggle('bx-x'); // تغيير أيقونة القائمة
//     navbar.classList.toggle('active'); // إظهار أو إخفاء شريط التنقل
// };
