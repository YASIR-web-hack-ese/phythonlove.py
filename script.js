const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');
const buttonContainer = document.querySelector('.button-container');
const profilePhoto = document.getElementById('profilePhoto');
const fileInput = document.getElementById('fileInput');
const changePicBtn = document.getElementById('changePicBtn');

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
