// ---- nav scroll state ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 30); });

// ---- mobile menu ----
const burger = document.getElementById('burger');
const closeBurger = document.getElementById('closeBurger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mobileMenu.classList.add('open'));
closeBurger.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ---- scrollspy ----
const navA = document.querySelectorAll('.nav-links a');
const spySections = ['about', 'topics', 'timeline', 'committee', 'speakers'].map(id => document.getElementById(id));
const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { navA.forEach(a => a.classList.toggle('active', a.dataset.target === e.target.id)); }
    });
}, { rootMargin: '-45% 0px -50% 0px' });
spySections.forEach(s => s && spy.observe(s));

// ---- reveal on scroll ----
const revealer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealer.unobserve(e.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealer.observe(el));

// ---- countdown ----
const target = new Date('2026-10-09T09:00:00+05:30').getTime();
function tick() {
    const now = Date.now();
    let diff = Math.max(0, target - now);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-d').textContent = String(d).padStart(2, '0');
    document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
}
tick(); setInterval(tick, 1000);

// ---- committee tabs ----
document.querySelectorAll('#seg button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#seg button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.cpanel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.panel).classList.add('active');
    });
});

// ---- reviewers data + render + search ----
const reviewers = {
    "International": [
        ["Dr. A. Rajalingam", "University of Technology & Applied Sciences – Shinas, Oman"],
        ["Dr. Hussam Ali", "COMSATS University Islamabad, Pakistan"],
        ["Dr. George Livanos", "Technical University of Crete, Greece"],
        ["Dr. Alberto Cano", "Virginia Commonwealth University, USA"],
        ["Dr. Bhadrachalam Chitturi", "UT Dallas, USA"],
        ["Dr. Thar Baker", "University of Brighton, UK"],
        ["Dr. Tu N. Nguyen", "Kennesaw State University, USA"],
        ["Dr. Dana Petcu", "West University of Timisoara, Romania"],
        ["Dr. Utku Kose", "Suleyman Demirel University, Turkey"],
        ["Dr. Shahab S Band", "National Yunlin University of Science and Technology, Taiwan"],
        ["Dr. Khalid Al-Hussaini", "Univ. of Sultan Zainal Abidin, Malaysia"],
        ["Dr. John Cole", "UT Dallas, USA"],
        ["Dr. Gong Cheng", "Northwestern Polytechnical University, Shenzhen, China"],
        ["Dr. Inês Domingues", "Instituto Politécnico de Coimbra, Portugal"],
        ["Dr. Abiel Aguilar-González", "Polytechnic University of Chiapas, Mexico"],
        ["Dr. Shuai Li", "Swansea University, UK"],
        ["Dr. Mohammed Elmogy", "Mansoura University, Egypt"],
        ["Dr. Yu Xiang", "UT Dallas, USA"],
        ["Dr. Binh P. Nguyen", "Victoria University of Wellington, New Zealand"],
        ["Dr. Karl Andersson", "Luleå University of Technology, Sweden"],
        ["Dr. Azeem Irshad", "International Islamic University, Islamabad, Pakistan"],
        ["Dr. Bestoun S. Ahmed", "Karlstad University, Sweden"],
        ["Dr. Nima Jafari Navimipour", "Islamic Azad University, Tabriz, Iran"],
        ["Dr. Neeraj Mittal", "UT Dallas, USA"],
        ["Dr. Hong Jiang", "University of Texas at Arlington, USA"],
        ["Dr. Md. Shohel Sayeed", "Multimedia University, Malaysia"],
        ["Dr. Joao Manuel R. S. Tavares", "Universidade do Porto, Portugal"],
        ["Dr. Ibrahiem M.M. El Emary", "King Abdulaziz University, Saudi Arabia"],
        ["Dr. A. Paul", "Kyungpook National University, South Korea"],
        ["Dr. Dilip Mali", "Mekelle University, Ethiopia"],
        ["Dr. Kasun De Zoysa", "University of Colombo, Sri Lanka"],
        ["Dr. Mgr. Silvester Czanner", "Liverpool John Moores University, UK"],
        ["Dr. Peter Chapman", "Edinburgh Napier University, UK"],
        ["Dr. Martyn Amos", "Northumbria University, UK"],
        ["Dr. Nicholas Costen", "Manchester Metropolitan University, UK"],
        ["Dr. Kurt Debattista", "University of Warwick, UK"],
        ["Dr. Gheorghita Ghinea", "Brunel University, UK"],
        ["Dr. Celestine Iwendi", "Central South University of Forestry & Technology, China"],
        ["Dr. Lipo Wang", "Nanyang Technological University, Singapore"],
        ["Dr. You-Wing Leung", "Hong Kong Baptist University, Hong Kong"]
    ],
    "National": [
        ["Dr. B. Surendiran", "National Institute of Technology, Puducherry"],
        ["Dr. M. Sivabalakrishnan", "Vellore Institute of Technology, Chennai"],
        ["Dr. S.P. Chokkalingam", "Vel Tech Rangarajan Dr. Sagunthala R&D Institute"],
        ["Dr. S.N. Sangeetha", "Bannari Amman Institute of Technology, Erode"],
        ["Dr. M. Mohamed Iqbal", "Vellore Institute of Technology, Amaravathi"],
        ["Dr. P. Gururama Senthilvel", "Saveetha School of Engineering, Chennai"],
        ["Dr. R. Venkatesan", "Karunya Institute of Science and Technology, Coimbatore"],
        ["Dr. M. Subramaniam", "Chaitanya Bharathi Institute of Technology, Hyderabad"],
        ["Dr. S. Meera", "Vels Institute of Science and Technology, Chennai"],
        ["Dr. S. Saravanan", "Saveetha School of Engineering, Chennai"],
        ["Dr. S. Udayakumar", "Amrita Vishwa Vidyapeetham, Chennai"],
        ["Dr. M. Sangeetha", "SRM Institute of Science & Technology, Chennai"],
        ["Dr. S. Jagadeesan", "Vellore Institute of Technology"],
        ["Dr. R. Saminathan", "Annamalai University, Chidambaram"],
        ["Dr. Kiruthiga Devi M", "Dr. M.G.R. Educational and Research Institute, Chennai"],
        ["Dr. Parthasarathy R", "Vel Tech Rangarajan Dr. Sagunthala R&D Institute, Chennai"],
        ["Dr. Bharathi V C", "Vellore Institute of Technology, Amaravathi"],
        ["Dr. Santhosh R", "Karpagam Academy of Higher Education"],
        ["Dr. S. Nagendra Prabhu", "SRM Institute of Science & Technology, Chennai"],
        ["Dr. S. Chakaravarthy", "Panimalar College of Engineering, Chennai"],
        ["Dr. C. Govindasamy", "Saveetha School of Engineering, Chennai"],
        ["Dr. J. Jayalakshmi", "Amrita Vishwa Vidyapeetham, Chennai"],
        ["Dr. M. Kavitha", "Vel Tech Rangarajan Dr. Sagunthala R&D Institute, Chennai"],
        ["Dr. N. Saravanan", "Misrimal Navajee Munoth Jain Engineering College, Chennai"],
        ["Dr. K. Sudharson", "RMD College of Engineering"],
        ["Dr. Sheela Jayachandran", "Vellore Institute of Technology, Amaravathi"],
        ["Dr. A. Moorthy", "Easwari Engineering College, Ramapuram"],
        ["Dr. P V Gopirajan", "SRM Institute of Science & Technology, Chennai"],
        ["Dr. A. Pandiyaraj", "SRM Institute of Science & Technology, Chennai"],
        ["Dr. R. Thiagarajan", "Prathyusha Engineering College"],
        ["Dr. C. Sivasankar", "Saveetha Institute of Medical and Technical Sciences"],
        ["Dr. T.R. Ganesh Babu", "Muthayammal Engineering College, Namakkal"],
        ["Dr. P. Valarmathie", "RMK College of Engineering and Technology"],
        ["Dr. M. Anbarasan", "Chennai Institute of Technology"],
        ["Dr. M.C. Babu", "Chennai Institute of Technology"],
        ["Dr. G. Nagappan", "Saveetha Engineering College"],
        ["Dr. S. Sasikumar", "Saveetha Engineering College"],
        ["Dr. B. Muthu Senthil", "SRM Valliammai Engineering College"],
        ["Dr. M. Murugan", "SRM Valliammai Engineering College"],
        ["Dr. A. Vijayaraj", "RMK Engineering College"],
        ["Dr. K. Priya", "SRM Institute of Science and Technology, Ramapuram"],
        ["Dr. S. Saravanan", "Builder Engineering College"],
        ["Dr. R. Loganathan", "Paavai Engineering College"],
        ["Dr. J. Nandha Gopal", "Velammal Institute of Technology"],
        ["Dr. A. Anitha Rani", "Excel Engineering College"],
        ["Dr. G. Gnana Priya", "Ramco Institute of Technology"],
        ["Dr. Pankaj Dadheech", "Swami Keshvanand Institute of Technology, Jaipur"],
        ["Dr. R. Gangai Selvi", "Agrl. Engg. College & RI"],
        ["Dr. S. Nalini", "SRM Institute of Science & Technology, Chennai"],
        ["Dr. Mohit Tiwari", "Bharati Vidyapeeth's College of Engineering, Delhi"],
        ["Dr. E Bhuvaneswari", "Chennai Institute of Technology"],
        ["Dr. Prajakta Yawalkar", "Christ University"],
        ["Dr. Ambika", "St. Francis College"],
        ["Dr. S. Russia", "Velalar College of Engineering and Technology, Erode"],
        ["Dr. Payal Bansal", "Poornima College of Engineering, Jaipur"],
        ["Dr. G Revathy", "SASTRA Deemed University"],
        ["Dr. Vaibhav C. Gandhi", "Charotar University of Science & Technology"],
        ["Dr. Sabyasachi Pramanik", "Haldia Institute of Technology"],
        ["Dr. Ameer Rashed Khan", "The New College"],
        ["Dr. Khaja Mannanuddin", "SR University"],
        ["Dr. N. Ananthi", "Easwari Engineering College, Ramapuram"],
        ["Dr. A. Muthulakshmi", "Sathyabama Institute of Science and Technology, Chennai"],
        ["Dr. R. Sivakami", "Vellore Institute of Technology, Chennai"],
        ["Dr. G. Subathra", "Sathyabama Institute of Science and Technology, Chennai"],
        ["Dr. K. Kalaivani", "Vels Institute of Science and Technology, Chennai"],
        ["Dr. Rupali Atul Mahajan", "Vishwakarma Institute of Information Technology, Pune"],
        ["Dr. Ashutosh Gaur", "Mangalmay Institute of Management and Technology"],
        ["Dr. T. Gunasekar", "Vel Tech Rangarajan Dr. Sagunthala R&D Institute, Chennai"],
        ["Dr. J. Raja", "Adhiparasakthi Engineering College, Chennai"],
        ["Dr. R. Pitchai", "B V Raju Institute of Technology, Telangana"],
        ["Dr. M. Malathi", "Adhiparasakthi Engineering College, Chennai"],
        ["Dr. Prashant Kumar Shukla", "KL University, Andhra Pradesh"],
        ["Dr. G. Gangadevi", "SRM Institute of Science & Technology, Chennai"],
        ["Dr. P. Chinnasamy", "MLR Institute of Technology, Hyderabad"]
    ]
};
const revList = document.getElementById('revList');
Object.entries(reviewers).forEach(([group, items]) => {
    const h = document.createElement('div');
    h.className = 'rev-subtitle';
    h.textContent = group;
    revList.appendChild(h);
    items.forEach(([name, org]) => {
        const div = document.createElement('div');
        div.className = 'rev-item';
        div.innerHTML = `<b>${name}</b><span>— ${org}</span>`;
        div.dataset.search = (name + ' ' + org).toLowerCase();
        revList.appendChild(div);
    });
});
document.getElementById('revSearch').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.rev-item').forEach(it => {
        it.classList.toggle('hide', q && !it.dataset.search.includes(q));
    });
});

// ---- speakers ----
const speakers = [
    ["Prof. Dr. George Ghinea", "Brunel University London", "Professor of Mulsemedia Computing, Director of Research", "London, United Kingdom"],
    ["Dr. Jey Veerasamy", "University of Texas at Dallas", "Director, Center for CS Education & Outreach", "United States"],
    ["Dr. Sumendra Yogarayan", "Multimedia University", "Assistant Professor, Certified Trainer", "Malacca, Malaysia"],
    ["Padma Deepika N.", "Apple", "Senior Software Engineer, Product Integrity Hardware", "Austin, USA"],
    ["Vinod Balachandran", "Microsoft", "Software Engineer", "Greater Seattle Area"],
    ["Farha Haider", "Nokia", "AI/ML Developer", "Canada"],
    ["Dr. Sathishkumar V E", "Sunway University", "Senior Lecturer, Data Science & AI", "Selangor, Malaysia"],
    ["Sriram Subramanian", "Oracle", "Senior Member of Technical Staff, OCI", "Washington, USA"],
    ["Arthi Nagarajan", "Microsoft", "Senior Software Engineer", "Austin, USA"],
    ["Chandrika Kadirvel Mani", "Google", "AI Principal Architect, APAC", "Singapore"],
    ["Divyanshi Kothari", "Apple", "Software Engineer, AI & Data Platforms", "San Francisco Bay Area"],
    ["Ashwini Rajaram", "TD", "Applied AI Research, LLMs & Agentic AI", "Montreal, Canada"],
    ["Pavithra Gunasekaran", "Savancys Inc", "Data Analysis & Financial Operations", "Chennai, India"],
    ["Nandakumar Kuthalaraja", "Northern Trust", "Senior Principal Architect", "United States"]
];
const gradients = [
    "linear-gradient(135deg,#012e55,#024a82)",
    "linear-gradient(135deg,#ff5f19,#ff8c52)"
];
const figGrid = document.getElementById('figGrid');
speakers.forEach((s, i) => {
    const initials = s[0].replace(/^(Prof\.|Dr\.)\s*/, '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
    const card = document.createElement('div');
    card.className = 'fig-card';
    card.innerHTML = `
      <div class="fig-photo" style="background:${gradients[i % 2]};">
        <span>${initials}</span>
        <div class="fig-overlay">
          <p class="role">${s[2]}</p>
          <span class="loc"><i class="fa-solid fa-location-dot"></i>${s[3]}</span>
        </div>
      </div>
      <div class="fig-cap"><h4>${s[0]}</h4><div class="org">${s[1]}</div></div>`;
    figGrid.appendChild(card);
});