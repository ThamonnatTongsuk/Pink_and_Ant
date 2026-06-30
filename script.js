// เปลี่ยนจากหน้า 1 ไปหน้า 2
function goToPage2(e) {
    e.preventDefault(); // ป้องกันฟอร์มรีเฟรชหน้า
    window.location.href = 'page2.html';
}

// สร้างคำถาม 10 ข้อ (ทำงานเฉพาะในหน้า page2.html)
function renderQuestions() {
    const qContainer = document.getElementById('questions-container');
    if (!qContainer) return; // ถ้าไม่ได้อยู่หน้า 2 ให้หยุดทำงาน

    const questions = [
        ["ชอบภูเขา", "ชอบทะเล"], ["ชอบชาบู", "ชอบหมูกระทะ"], ["ชอบแมว", "ชอบหมา"],
        ["ชอบดูหนัง", "ชอบฟังเพลง"], ["ชอบกลางวัน", "ชอบกลางคืน"], ["ชอบหวาน", "ชอบเปรี้ยว"],
        ["ฤดูหนาว", "ฤดูฝน"], ["โทรคุย", "พิมพ์แชท"], ["ชาเขียว", "กาแฟ"], ["เที่ยวคาเฟ่", "นอนอยู่บ้าน"]
    ];

    let html = '';
    questions.forEach((q, index) => {
        html += `
            <div class="bg-pink-50 p-4 rounded-lg">
                <p class="mb-2 text-sm font-medium text-gray-700">ข้อ ${index + 1}</p>
                <div class="flex space-x-2">
                    <label class="flex-1 text-center bg-white border border-pink-200 p-2 rounded cursor-pointer hover:bg-pink-100 transition">
                        <input type="radio" name="q${index}" class="hidden"> ${q[0]}
                    </label>
                    <label class="flex-1 text-center bg-white border border-pink-200 p-2 rounded cursor-pointer hover:bg-pink-100 transition">
                        <input type="radio" name="q${index}" class="hidden"> ${q[1]}
                    </label>
                </div>
            </div>
        `;
    });
    qContainer.innerHTML = html;
}

// เปลี่ยนจากหน้า 2 ไปหน้า 3
function goToPage3() {
    window.location.href = 'page3.html';
}

// หลอดโหลด 6 วินาที (ทำงานเฉพาะในหน้า page3.html)
function startLoading() {
    const bar = document.getElementById('loading-bar');
    if (!bar) return;

    setTimeout(() => {
        bar.style.width = '100%';
    }, 100);

    setTimeout(() => {
        window.location.href = 'page4.html';
    }, 6000);
}

// กดผิด -> ปุ่มหาย (หน้า 4 และ 5)
function wrongAnswer(btn) {
    btn.style.visibility = 'hidden';
    btn.style.opacity = '0';
    btn.style.transition = 'visibility 0s 0.2s, opacity 0.2s linear';
}

// คำถาม 1 ถูก -> ไปหน้า 5
function correctAnswer1() {
    window.location.href = 'page5.html';
}

// คำถาม 2 ถูก -> ไปหน้า 6
function correctAnswer2() {
    window.location.href = 'page6.html';
}

// ปุ่ม "ไม่กด" หายไปทันที (หน้า 6)
function hideMe(btn) {
    btn.style.display = 'none';
}

// ปุ่ม "กด" ลีลา 6 รอบ (หน้า 6)
let teaseCount = 0;
function teaseButton() {
    const btn = document.getElementById('btn-yes');
    if (!btn) return;
    
    if (teaseCount < 6) {
        let moveX = (teaseCount % 2 === 0) ? -60 : 60; 
        let moveY = Math.floor(Math.random() * 20) - 10;
        btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        teaseCount++;
    } else {
        btn.style.transform = `translate(0px, 0px)`;
        window.location.href = 'page7.html'; // ไปหน้า End Credit
    }
}

// เล่นเพลงและโชว์ End Credit (หน้า 7)
function startCredits() {
    document.getElementById('start-btn-container').style.display = 'none';
    document.getElementById('credits-container').style.display = 'block';

    const audio = document.getElementById('bgm-audio');
    if(audio) {
        audio.play().catch(error => {
            console.log("Audio play error:", error);
        });
    }
}

// ทำงานอัตโนมัติเมื่อเปิดหน้าเว็บ (เพื่อเช็คว่าต้องรันฟังก์ชันของหน้าไหน)
window.onload = function() {
    renderQuestions();
    startLoading();
};

// ฟังก์ชันหัวใจระเบิด
function triggerHeartExplosion() {
    confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        shapes: ['heart'],
        colors: ['#ac9da5', '#ff1493', '#db7093']
    });
}

// ผูกอีเวนต์คลิกให้ระเบิดทุกครั้งที่กดหน้าจอ
document.addEventListener('click', triggerHeartExplosion);

// ปรับปรุงฟังก์ชัน goToPage2 ให้มีการระเบิดก่อนเปลี่ยนหน้า
function goToPage2(e) {
    e.preventDefault();
    triggerHeartExplosion(); // ระเบิดก่อน
    setTimeout(() => { 
        window.location.href = 'page2.html'; 
    }, 500); // รอแป๊บหนึ่งให้หัวใจโชว์
}

// (สำหรับหน้าอื่นๆ ให้เรียกใช้ triggerHeartExplosion() ในปุ่มต่างๆ ได้เลยครับ)