document.addEventListener('DOMContentLoaded', () => {
    // List of "Industrial Noise" animes from the transcript
    const allNoiseAnimes = [
        "Amagami-san Chi no Enmusubi", "Ao no Miburo", "Ao no Hako (Blue Box)",
        "A-Rank Party wo Ridatsu Shita", "Akuyaku Reijou Tensei Oji-san",
        "Ameku Takao", "Ao no Exorcist: Yosuga-hen", "Arafou Otoko Isekai",
        "Baban Baban Ban Vampire", "Botsuraku Yotei no Kizoku",
        "Cardfight!! Vanguard Divinez", "Class no Daikirai na Joshi",
        "Douse, Koishite Shimaunda", "Farmagia", "Fuguushoku [Kanteishi]",
        "Grisaia: Phantom Trigger", "Guild no Uketsukejou", "Hana wa Saku, Shura",
        "Hazure Skill 'Kinomi Master'", "Honey Lemon Soda", "Izure Saikyou?",
        "Jibaku Shounen Hanako-kun 2", "100-nin no Kanojo 2", "Kinnikuman 2",
        "Kisaki Kyouiku", "Kono Kaisha ni Suki na", "Kuroiwa Medaka",
        "Magic Maker", "Mahoutsukai no Yakusoku", "Mashin Souzou den Wataru",
        "Medalist", "Momentary Lily", "NEET Kunoichi", "Welcome to Japan Elf-san",
        "Okinawa de Suki ni Natta", "S-Rank Monster Behemoth", "Sakamoto Days",
        "Salaryman ga Isekai", "Sentai Red Isekai", "Sorairo Utility",
        "Aquarion", "UniteUp!", "Unnamed Memory Act:2", "My Happy Marriage 2",
        "Zenshuu", "Übel Blatt", "Shangri-La Frontier 2", "Trillion Game",
        "Aharen-san 2", "Aru Majo ga Shinu Made", "Ball Park de Tsukamaete",
        "Bye Bye, Earth 2", "Classic Stars", "Fire Force S3", "Guilty Gear Strive",
        "Haite Kudasai, Takamine-san", "Katainaka no Ossan", "Ninja to Koroshiya",
        "One Punch Man 3", "Shield Hero S4", "Record of Ragnarok 3"
    ];

    // Reveal animations
    const reveals = document.querySelectorAll('.reveal, .fade-in');
    const revealOnScroll = () => {
        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Chart.js - Soul vs Noise
    const ctx = document.getElementById('ratioChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Con Alma (SÍ)', 'Ruido Industrial (NO)'],
            datasets: [{
                data: [25, 202],
                backgroundColor: ['#8a2be2', '#222'],
                borderColor: ['#00f2ff', '#444'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#fff', font: { family: 'Outfit' } } }
            }
        }
    });

    // Modals
    const critiqueModal = document.getElementById('critique-modal');
    const listModal = document.getElementById('full-list-modal');
    const cards = document.querySelectorAll('.anime-poster-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            document.getElementById('modal-title').textContent = card.dataset.title;
            document.getElementById('modal-opinion').textContent = card.dataset.opinion;
            document.getElementById('modal-img').src = card.querySelector('img').src;
            const tag = document.getElementById('modal-tag');
            tag.textContent = card.dataset.type === 'soul' ? 'ESENCIA PURA' : 'PRODUCTOR VACÍO';
            tag.style.background = card.dataset.type === 'soul' ? '#8a2be2' : '#ff4757';
            critiqueModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    document.getElementById('open-full-list').addEventListener('click', () => {
        renderList(allNoiseAnimes);
        listModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            critiqueModal.style.display = 'none';
            listModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Search Logic
    const searchInput = document.getElementById('anime-search');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allNoiseAnimes.filter(a => a.toLowerCase().includes(query));
        renderList(filtered);
    });

    function renderList(list) {
        const container = document.getElementById('full-anime-list');
        container.innerHTML = list.map(a => `<div class="list-anime-item">${a}</div>`).join('');
    }

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            critiqueModal.style.display = 'none';
            listModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
