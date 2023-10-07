

const toggleButton = document.getElementById('toggle');
const settings = document.getElementById('settings');
const iconDirection = document.getElementById('direction-icon');
const coin = document.getElementById('coin');
const exclusionButton = document.getElementById('exclusion-add');
const exclusionInput = document.getElementById('exclusion-input');
const badgeArea = document.getElementById('badge-area');
const randomNumber = document.getElementById('random-number');
const startLimit = document.getElementById('start');
const endLimit = document.getElementById('end');


coin.style.animation = 'rotate 4s ease-out infinite '
let spinning = false;
let exclusionList = [];
let content = "";

const list = localStorage.getItem('exclusion');
exclusionList = list === null ? [] : JSON.parse(list);
loadExclusion();

function loadExclusion() {
    content = "";
    localStorage.setItem('exclusion', JSON.stringify(exclusionList));
    exclusionList.forEach((e) => content+=`<span class='badge'> <b> ${e} </b> <button onclick="removeExclusion(${e})"> x </button> </span> `);
    badgeArea.innerHTML = content;
}

toggleButton.addEventListener('click' , () => {
    settings.classList.toggle('settings-open');
    iconDirection.classList.toggle('rotate-full');
})

exclusionButton.addEventListener('click', () => {
    const val = exclusionInput.valueAsNumber;
    if(exclusionList.find((e) => e==val))
        return
    exclusionList.push(val);
    loadExclusion();
})

coin.addEventListener('click', () => {

    if(spinning)
        return;
    spinning = true;
    randomNumber.innerText = "";
    randomNumber.style.opacity = "0";
    coin.style.animation = 'rotate 300ms ease-out infinite ';
    setTimeout(() => {
        coin.style.animation = 'spinland 4s ease-out forwards ';
        const start = startLimit.valueAsNumber;
        const end = endLimit.valueAsNumber;

        const r = getRandomNumberWithExclusions(start, end, exclusionList);
        console.log(r);

        randomNumber.innerText = r;
        randomNumber.style.opacity = "1";
        setTimeout(() => {
            spinning = false;
        }, 4000)

    }, 3000)
})

function getRandomNumberWithExclusions(start, end, exclusions) {
    const validNumbers = [];
    
    for (let i = start; i <= end; i++) {
      if (!exclusions.includes(i)) {
        validNumbers.push(i);
      }
    }
  
    if (validNumbers.length === 0) {
      return null;
    }
  
    const randomIndex = Math.floor(Math.random() * validNumbers.length);
    return validNumbers[randomIndex];
  }

  function removeExclusion(x) {

    exclusionList = exclusionList.filter(e => e !== x);
    loadExclusion();
  }