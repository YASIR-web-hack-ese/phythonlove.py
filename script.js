const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');
const buttonContainer = document.querySelector('.button-container');
const profilePhoto = document.getElementById('profilePhoto');
const fileInput = document.getElementById('fileInput');
const changePicBtn = document.getElementById('changePicBtn');
const removePicBtn = document.getElementById('removePicBtn');
const downloadPicBtn = document.getElementById('downloadPicBtn');
const editBioBtn = document.getElementById('editBioBtn');
const editSocialsBtn = document.getElementById('editSocialsBtn');
const bioEl = document.getElementById('bio');
const socialsEl = document.getElementById('socials');
const newHobbyInput = document.getElementById('newHobbyInput');
const addHobbyBtn = document.getElementById('addHobbyBtn');
const hobbyListEl = document.getElementById('hobbyList');
const themeToggle = document.getElementById('themeToggle');

let hobbies = [];

// Yes button - shows success message
yesBtn.addEventListener('click', function() {
    buttonContainer.style.display = 'none';
    successMessage.classList.remove('hidden');
});

// No button - runs away
noBtn.addEventListener('mouseover', function() {
    const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
});

// Mobile touch support for No button
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
});

// Load saved profile picture from localStorage (data URL)
document.addEventListener('DOMContentLoaded', function() {
    try {
        const saved = localStorage.getItem('profileImage');
        if (saved && profilePhoto) {
            profilePhoto.src = saved;
            profilePhoto.style.display = '';
        }
        // load bio and socials
        const savedBio = localStorage.getItem('bio');
        if (savedBio && bioEl) bioEl.textContent = savedBio;
        const savedSocials = localStorage.getItem('socials');
        if (savedSocials && socialsEl) socialsEl.textContent = savedSocials;
        // load hobbies
        const savedHobbies = localStorage.getItem('hobbies');
        if (savedHobbies) {
            try { hobbies = JSON.parse(savedHobbies) || []; } catch(_) { hobbies = [] }
        } else {
            hobbies = ['Coding','Football','Cricket','Poetry','Music'];
        }
        renderHobbies();
        // load theme
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') document.documentElement.classList.add('dark');
    } catch (err) {
        console.warn('Could not load saved profile image', err);
    }
});

// When change photo button clicked, open file selector
if (changePicBtn && fileInput) {
    changePicBtn.addEventListener('click', function() {
        fileInput.click();
    });

    // when a file is selected, read and preview it, and save to localStorage
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
            const dataUrl = ev.target.result;
            if (profilePhoto) {
                profilePhoto.src = dataUrl;
                profilePhoto.style.display = '';
            }
            try {
                localStorage.setItem('profileImage', dataUrl);
            } catch (err) {
                console.warn('Could not save image to localStorage', err);
            }
        };
        reader.readAsDataURL(file);
    });
}

// remove photo
if (removePicBtn) {
    removePicBtn.addEventListener('click', function() {
        try {
            localStorage.removeItem('profileImage');
            profilePhoto.style.display = 'none';
            profilePhoto.src = '';
        } catch (err) { console.warn(err) }
    });
}

// download/export photo
if (downloadPicBtn) {
    downloadPicBtn.addEventListener('click', function() {
        const src = profilePhoto && profilePhoto.src;
        if (!src) return alert('No profile image to download');
        const a = document.createElement('a');
        a.href = src;
        a.download = 'profile.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
    });
}

// bio and socials edit/save
if (editBioBtn && bioEl) {
    editBioBtn.addEventListener('click', function() {
        const editing = bioEl.getAttribute('contenteditable') === 'true';
        if (editing) {
            bioEl.setAttribute('contenteditable','false');
            editBioBtn.textContent = 'Edit bio';
            localStorage.setItem('bio', bioEl.textContent);
        } else {
            bioEl.setAttribute('contenteditable','true');
            bioEl.focus();
            editBioBtn.textContent = 'Save';
        }
    });
}

if (editSocialsBtn && socialsEl) {
    editSocialsBtn.addEventListener('click', function() {
        const editing = socialsEl.getAttribute('contenteditable') === 'true';
        if (editing) {
            socialsEl.setAttribute('contenteditable','false');
            editSocialsBtn.textContent = 'Edit socials';
            localStorage.setItem('socials', socialsEl.textContent);
        } else {
            socialsEl.setAttribute('contenteditable','true');
            socialsEl.focus();
            editSocialsBtn.textContent = 'Save';
        }
    });
}

// Hobbies management
function renderHobbies() {
    if (!hobbyListEl) return;
    hobbyListEl.innerHTML = '';
    hobbies.forEach((h, idx) => {
        const div = document.createElement('div');
        div.className = 'hobby';
        div.draggable = true;
        div.dataset.index = idx;
        div.innerHTML = `<span class="label">${h}</span>`;
        const rem = document.createElement('button');
        rem.className = 'remove-hobby';
        rem.title = 'Remove';
        rem.textContent = '✕';
        rem.addEventListener('click', () => { removeHobby(idx) });
        div.appendChild(rem);
        // drag handlers
        div.addEventListener('dragstart', (e) => { div.classList.add('dragging'); e.dataTransfer.setData('text/plain', idx); });
        div.addEventListener('dragend', () => { div.classList.remove('dragging'); });
        hobbyListEl.appendChild(div);
    });
    localStorage.setItem('hobbies', JSON.stringify(hobbies));
}

function addHobby(text) {
    if (!text) return;
    hobbies.push(text);
    renderHobbies();
}

function removeHobby(idx) {
    hobbies.splice(idx,1);
    renderHobbies();
}

if (addHobbyBtn && newHobbyInput) {
    addHobbyBtn.addEventListener('click', function() {
        const v = newHobbyInput.value.trim();
        if (!v) return;
        addHobby(v);
        newHobbyInput.value = '';
    });
    newHobbyInput.addEventListener('keydown', function(e){ if (e.key === 'Enter') addHobbyBtn.click(); });
}

// drag-and-drop reordering on the list container
if (hobbyListEl) {
    hobbyListEl.addEventListener('dragover', function(e){
        e.preventDefault();
        hobbyListEl.classList.add('drag-over');
    });
    hobbyListEl.addEventListener('dragleave', function(e){ hobbyListEl.classList.remove('drag-over'); });
    hobbyListEl.addEventListener('drop', function(e){
        e.preventDefault();
        hobbyListEl.classList.remove('drag-over');
        const fromIdx = Number(e.dataTransfer.getData('text/plain'));
        // find drop target index by event position
        let children = Array.from(hobbyListEl.querySelectorAll('.hobby'));
        if (!children.length) return;
        let toIdx = children.length - 1;
        for (let i=0;i<children.length;i++){
            const rect = children[i].getBoundingClientRect();
            if (e.clientX < rect.left + rect.width/2) { toIdx = i; break; }
        }
        const item = hobbies.splice(fromIdx,1)[0];
        hobbies.splice(toIdx,0,item);
        renderHobbies();
    });
}

// theme toggle
if (themeToggle) {
    themeToggle.addEventListener('click', function(){
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    });
}
