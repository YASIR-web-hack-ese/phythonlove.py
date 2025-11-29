const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');
const buttonContainer = document.querySelector('.button-container');

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
