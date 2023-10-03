

const toggleButton = document.getElementById('toggle');
const settings = document.getElementById('settings');
const iconDirection = document.getElementById('direction-icon');
const coin = document.getElementById('coin');
coin.style.animation = 'rotate 4s ease-out infinite '
let spinning = false;


toggleButton.addEventListener('click' , () => {
    settings.classList.toggle('settings-open');
    iconDirection.classList.toggle('rotate-full');
})

coin.addEventListener('click', () => {

    if(spinning)
        return;
    spinning = true;
    coin.style.animation = 'rotate 300ms ease-out infinite ';
    setTimeout(() => {
        coin.style.animation = 'spinland 4s ease-out forwards ';
        setTimeout(() => {
            coin.style.animation = '';
            coin.style.rotate = '0deg';
            spinning = false;
        }, 2000)

    }, 1000)
})