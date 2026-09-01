// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const isActive = faqItem.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isActive) {
            faqItem.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = navbar.offsetHeight + 20;
            const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: position, behavior: 'smooth' });
        }
    });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Apply reveal class to sections
document.querySelectorAll('.feature-card, .perf-card, .pricing-card, .testimonial-card, .contact-card, .history-section, .faq-item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 0.1}s`;
    revealObserver.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateValue(el, start, end, suffix, duration) {
    let startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * eased;
        el.textContent = (Number.isInteger(end) ? Math.floor(current) : current.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.getAttribute('data-value') || el.textContent;
            if (text.includes('327')) animateValue(el, 0, 327, '%', 2000);
            else if (text.includes('3.85')) animateValue(el, 0, 3.85, '', 2000);
            else if (text.includes('8.2')) animateValue(el, 0, 8.2, '%', 2000);
            else if (text.includes('10K')) animateValue(el, 0, 10, 'K+', 2000);
            else if (text === '84%' || text.includes('84')) animateValue(el, 0, 84, '%', 2000);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number, .perf-value').forEach(el => {
    el.setAttribute('data-value', el.textContent);
    counterObserver.observe(el);
});

// ===== PARALLAX PARTICLES =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.particle').forEach((p, i) => {
        const speed = 0.3 + (i * 0.1);
        p.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== TYPEWRITER EFFECT =====
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.style.opacity = '1';
}

// ===== DYNAMIC GRADIENT CURSOR GLOW =====
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,71,87),0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transition: transform 0.15s ease;
    transform: translate(-50%, -50%);
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== SECTION HEADERS SCROLL REVEAL =====
document.querySelectorAll('.section-header').forEach(header => {
    header.classList.add('reveal');
    revealObserver.observe(header);
});

// ===== TABLE ROW STAGGER =====
document.querySelectorAll('.history-table tbody tr').forEach((row, i) => {
    row.style.opacity = '0';
    row.style.transform = 'translateX(-20px)';
    row.style.transition = `all 0.4s ease ${i * 0.1}s`;
});

const tableObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('tbody tr').forEach(row => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.history-table').forEach(table => {
    tableObserver.observe(table);
});

// ===== RIPPLE EFFECT ON BUTTONS =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${e.clientX - rect.left - size / 2}px;
            top: ${e.clientY - rect.top - size / 2}px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Ripple keyframe
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to { transform: scale(2.5); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

// ===== ANIMATED HERO CHART BACKGROUND =====
(function () {
    const canvas = document.getElementById('heroChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    let time = 0;

    function resize() {
        w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    resize();
    window.addEventListener('resize', resize);

    // Candlestick data generator
    const candles = [];
    const candleCount = 60;
    let basePrice = 2350;

    for (let i = 0; i < candleCount; i++) {
        const change = (Math.random() - 0.45) * 30;
        const open = basePrice;
        const close = basePrice + change;
        const high = Math.max(open, close) + Math.random() * 15;
        const low = Math.min(open, close) - Math.random() * 15;
        candles.push({ open, close, high, low });
        basePrice = close;
    }

    // Line chart data
    const linePoints = [];
    let lineY = 0.5;
    for (let i = 0; i < 200; i++) {
        lineY += (Math.random() - 0.48) * 0.02;
        lineY = Math.max(0.15, Math.min(0.85, lineY));
        linePoints.push(lineY);
    }

    function drawGrid() {
        const cw = canvas.offsetWidth;
        const ch = canvas.offsetHeight;
        ctx.strokeStyle = 'rgba(255, 71, 87, 0.05)';
        ctx.lineWidth = 1;

        const cols = 20;
        const rows = 10;
        for (let i = 0; i <= cols; i++) {
            const x = (cw / cols) * i;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, ch);
            ctx.stroke();
        }
        for (let i = 0; i <= rows; i++) {
            const y = (ch / rows) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(cw, y);
            ctx.stroke();
        }
    }

    function drawCandlesticks(t) {
        const cw = canvas.offsetWidth;
        const ch = canvas.offsetHeight;
        const candleW = cw / candleCount;
        const margin = candleW * 0.3;

        candles.forEach((c, i) => {
            const x = i * candleW;
            const isGreen = c.close >= c.open;

            // Price range
            const allPrices = candles.flatMap(c => [c.high, c.low]);
            const minP = Math.min(...allPrices);
            const maxP = Math.max(...allPrices);
            const range = maxP - minP || 1;

            const mapY = (p) => ch * 0.2 + ((maxP - p) / range) * ch * 0.6;

            const openY = mapY(c.open);
            const closeY = mapY(c.close);
            const highY = mapY(c.high);
            const lowY = mapY(c.low);

            // Animated reveal
            const reveal = Math.min(1, (t - i * 0.02));
            if (reveal <= 0) return;

            ctx.globalAlpha = reveal * 0.6;

            // Wick
            ctx.strokeStyle = isGreen ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 71, 87, 0.5)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x + candleW / 2, highY);
            ctx.lineTo(x + candleW / 2, lowY);
            ctx.stroke();

            // Body
            ctx.fillStyle = isGreen ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 71, 87, 0.3)';
            const bodyTop = Math.min(openY, closeY);
            const bodyH = Math.max(Math.abs(closeY - openY), 2);
            ctx.fillRect(x + margin, bodyTop, candleW - margin * 2, bodyH);

            // Border
            ctx.strokeStyle = isGreen ? 'rgba(0, 255, 136, 0.7)' : 'rgba(255, 71, 87, 0.7)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x + margin, bodyTop, candleW - margin * 2, bodyH);

            ctx.globalAlpha = 1;
        });
    }

    function drawLineChart(t) {
        const cw = canvas.offsetWidth;
        const ch = canvas.offsetHeight;
        const step = cw / (linePoints.length - 1);
        const scrollOffset = (t * 15) % cw;

        // Line
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 71, 87, 0.6)';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';

        for (let i = 0; i < linePoints.length; i++) {
            const x = i * step - scrollOffset;
            const y = linePoints[i] * ch;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Duplicate for seamless loop
        ctx.beginPath();
        for (let i = 0; i < linePoints.length; i++) {
            const x = i * step - scrollOffset + cw;
            const y = linePoints[i] * ch;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Glow fill
        const gradient = ctx.createLinearGradient(0, 0, 0, ch);
        gradient.addColorStop(0, 'rgba(255, 71, 87, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 71, 87, 0)');

        ctx.lineTo(cw + cw, ch);
        ctx.lineTo(-scrollOffset + cw, ch);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    function drawMovingAverages(t) {
        const cw = canvas.offsetWidth;
        const ch = canvas.offsetHeight;
        const step = cw / (linePoints.length - 1);
        const scrollOffset = (t * 15) % cw;

        // MA20 - yellow
        const periods = [20, 50];
        const colors = ['rgba(255, 191, 0, 0.35)', 'rgba(168, 85, 247, 0.35)'];

        periods.forEach((period, pi) => {
            ctx.beginPath();
            ctx.strokeStyle = colors[pi];
            ctx.lineWidth = 1.5;
            ctx.setLineDash([5, 5]);

            for (let i = period; i < linePoints.length; i++) {
                let sum = 0;
                for (let j = i - period; j < i; j++) sum += linePoints[j];
                const avg = sum / period;
                const x = i * step - scrollOffset;
                const y = avg * ch;
                if (i === period) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.setLineDash([]);
        });
    }

    function drawPriceLabels(t) {
        const cw = canvas.offsetWidth;
        const ch = canvas.offsetHeight;
        ctx.font = '11px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255, 71, 87, 0.4)';
        ctx.textAlign = 'right';

        const basePrice = 2350 + Math.sin(t * 0.5) * 20;
        for (let i = 0; i < 5; i++) {
            const price = (basePrice + i * 15).toFixed(0);
            const y = ch * 0.15 + (ch * 0.7 / 4) * i;
            ctx.fillText('$' + price, cw - 10, y);
        }

        // Current price line
        const priceY = ch * 0.3 + Math.sin(t) * ch * 0.15;
        ctx.strokeStyle = 'rgba(255, 71, 87, 0.2)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, priceY);
        ctx.lineTo(cw, priceY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Price tag
        const currentPrice = (2420 + Math.sin(t * 0.8) * 30).toFixed(2);
        ctx.fillStyle = 'rgba(255, 71, 87, 0.7)';
        ctx.fillRect(cw - 80, priceY - 10, 72, 20);
        ctx.fillStyle = '#0a0e17';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(currentPrice, cw - 44, priceY + 4);
    }

    function drawVolumeBars(t) {
        const cw = canvas.offsetWidth;
        const ch = canvas.offsetHeight;
        const candleW = cw / candleCount;

        candles.forEach((c, i) => {
            const reveal = Math.min(1, (t - i * 0.02));
            if (reveal <= 0) return;

            const vol = Math.random() * ch * 0.08 + ch * 0.02;
            const x = i * candleW + candleW * 0.25;
            const isGreen = c.close >= c.open;

            ctx.globalAlpha = reveal * 0.2;
            ctx.fillStyle = isGreen ? '#00ff88' : '#ff4757';
            ctx.fillRect(x, ch - vol, candleW * 0.5, vol);
            ctx.globalAlpha = 1;
        });
    }

    function animate() {
        const cw = canvas.offsetWidth;
        const ch = canvas.offsetHeight;
        ctx.clearRect(0, 0, cw, ch);

        time += 0.016;

        drawGrid();
        drawVolumeBars(time);
        drawCandlesticks(time);
        drawLineChart(time);
        drawMovingAverages(time);
        drawPriceLabels(time);

        requestAnimationFrame(animate);
    }

    // Only run when hero is visible
    const heroSection = document.getElementById('home');
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animate();
        }
    }, { threshold: 0.1 });

    heroObserver.observe(heroSection);
    animate();
})();

// ===== AUTO-GENERATED TESTIMONIALS =====
(function () {
    const grid = document.querySelector('.testimonials-grid');
    if (!grid) return;

    const reviews = [
        "Profit konsisten setiap minggu, sangat recommended untuk trader sibuk.",
        "Mulanya ragu, tapi setelah coba paket 1 minggu langsung lanjut sewa bulanan.",
        "Sistemnya otomatis dan aman. Drawdown kecil, hasilnya nyata.",
        "Terima beres banget, tinggal lihat profit jalan sendiri.",
        "Sudah 3 bulan pakai, hasilnya stabil dan support sangat responsif.",
        "Risk management-nya bagus, modal aman meski market tidak menentu.",
        "Cocok untuk pemula yang tidak punya waktu pantau chart.",
        "Set up cepat, langsung jalan. Hasil minggu pertama sudah memuaskan.",
        "Monitoring tim bikin tenang, saya tidak perlu pusing mikir entry.",
        "EA terbaik yang pernah saya coba. Win rate tinggi dan drawdown rendah.",
        "Sewa 1 bulan paling worth it, profitnya jauh melebihi biaya sewa.",
        "Proses sewa mudah, aktivasi instan. Terima kasih timnya!",
        "Sudah pakai beberapa EA, ini yang paling bisa diandalkan.",
        "Profitable dan transparan. Saya bisa pantau performa secara real time.",
        "Dimulai dari paket 2 minggu, sekarang saya yakin lanjut bulanan.",
        "Robot jalan sendiri 24 jam. Saya tetap bisa kerja sambil pantau sesekali.",
        "Manajemen risiko ketat bikin hati tenang meski ada fluktuasi.",
        "Easy setup, support ramah, hasilnya memuaskan sejak minggu pertama.",
        "Sudah balik modal dalam sebulan. Recommended banget!",
        "Win rate 84% itu terbukti, bukan cuma janji. Hasilnya konsisten.",
        "Panen profit kecil tapi stabil setiap hari, luar biasa.",
        "Saya rekomendasikan ke teman-teman, hasilnya memuaskan semua.",
        "Trading jadi simpel, tinggal sewa dan terima beres.",
        "Drawdown terkontrol, modal tidak pernah jebol. Aman.",
        "Paling cocok buat yang sibuk tapi pengen cuan dari trading.",
        "Support cepat jawab semua pertanyaan. Pengalaman sewa menyenangkan.",
        "Hasil bulan ini lebih dari cukup buat bayar sewa dan dapet profit.",
        "Sudah 2 bulan konsisten profit, tidak ada drama loss besar.",
        "Instalasi dibantu penuh, langsung aktif tanpa ribet.",
        "EA jalan stabil meski berita besar, stop loss-nya ketat.",
        "Akun cent pun tetap profit. Bagus untuk mulai kecil.",
        "Sewa singkat dulu buat tes, hasilnya meyakinkan untuk terus lanjut.",
        "Benar-benar passive income. Robot bekerja, saya santai.",
        "Round trip support dari awal sampai akhir, sangat membantu.",
        "Profit factor tinggi, loss kecil. Kombinasi terbaik.",
        "Sudah dari 3 EA berbeda, akhirnya berhenti di EA ONE SHOT.",
        "Transparan dan jujur. Hasil yang ditampilkan sesuai realita.",
        "Robot pintar, bisa adaptasi ke kondisi market yang berubah.",
        "Cukup modal kecil, sudah bisa mulai dan lihat perkembangan.",
        "Tidak perlu ilmu trading pun bisa profit, terima beres.",
        "Win rate-nya nyata tinggi, saya pantau sendiri di akun.",
        "Setiap bulan ada profit, kadang lebih, kadang stabil, selalu plus.",
        "Rekomendasi dari teman, ternyata benar-benar works.",
        "User terima beres sesuai janji. Bangga pakai EA ini.",
        "Saya freelance, jadwal tak tentu, tapi profit tetap jalan.",
        "Monitoring rutin dari tim menambah rasa aman saya.",
        "Sudah perpanjang berkali-kali, kualitas selalu konsisten.",
        "Hasil kecil tapi konsisten lebih baik dari grafik naik turun ekstrem.",
        "Dari pemula yang takut loss, sekarang nyaman berkat manajemen risikonya.",
        "Cukup sewa, biar mesin yang kerja. Hasilnya memuaskan.",
    ];

    const names = [
        "Aditya P.", "Bunga S.", "Candra W.", "Dian K.", "Eko B.",
        "Fitri Y.", "Galih R.", "Hendra T.", "Indah M.", "Joko S.",
        "Kiki L.", "Lukman N.", "Maya R.", "Naufal F.", "Oscar D.",
        "Putri D.", "Rahmat H.", "Sari W.", "Taufik A.", "Umar H.",
        "Vina L.", "Wahyu N.", "Yoga P.", "Zaki R.", "Agus W.",
        "Bella R.", "Citra S.", "Dendi K.", "Eka P.", "Fajar R.",
        "Gita M.", "Haris B.", "Intan S.", "Jefri T.", "Kartika L.",
        "Lia N.", "Miko P.", "Nadia R.", "Oki W.", "Paula S.",
        "Rina D.", "Sandi B.", "Tri W.", "Uli K.", "Vega H.",
        "Wulan P.", "Yunus S.", "Zahra R.", "Bagus P.", "Cici M.",
    ];

    const cities = [
        "Jakarta", "Surabaya", "Bandung", "Medan", "Semarang",
        "Makassar", "Palembang", "Denpasar", "Bogor", "Malang",
        "Tangerang", "Depok", "Bekasi", "Yogyakarta", "Solo",
        "Batam", "Pekanbaru", "Banjarmasin", "Balikpapan", "Pontianak",
        "Manado", "Padang", "Samarinda", "Tasikmalaya", "Cirebon",
        "Jember", "Kediri", "Sukabumi", "Cilacap", "Purwokerto",
    ];

    function initials(name) {
        return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    }

    function randomStars() {
        const r = Math.random();
        let count;
        if (r < 0.6) count = 5;
        else if (r < 0.85) count = 4;
        else count = 3;
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < count) {
                stars += '<i class="fas fa-star" style="color:#fbbf24"></i>';
            } else {
                stars += '<i class="fas fa-star" style="color:#ffffff;opacity:0.3"></i>';
            }
        }
        return `<div class="stars">${stars}</div>`;
    }

    function cardHTML(review, i) {
        const name = names[i % names.length];
        const city = cities[i % cities.length];
        return `
            <div class="testimonial-card reveal">
                ${randomStars()}
                <p>"${review}"</p>
                <div class="testimonial-author">
                    <div class="avatar">${initials(name)}</div>
                    <div>
                        <strong>${name}</strong>
                        <span>${city}</span>
                    </div>
                </div>
            </div>`;
    }

    const injectAt = grid.querySelector('.testimonial-card:nth-child(6)');
    reviews.forEach((review, i) => {
        if (injectAt) {
            injectAt.insertAdjacentHTML('afterend', cardHTML(review, i));
        } else {
            grid.insertAdjacentHTML('beforeend', cardHTML(review, i));
        }
    });

    grid.querySelectorAll('.testimonial-card.reveal').forEach(card => {
        if (!card.classList.contains('active')) {
            revealObserver.observe(card);
        }
    });
})();
