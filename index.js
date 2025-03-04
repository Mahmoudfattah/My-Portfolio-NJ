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
        const response = await fetch("https://my-portfolio-nj-production.up.railway.app/contact", { 
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
