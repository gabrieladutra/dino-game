const dino = document.querySelector('.dino')
const background = document.querySelector('.background')

let isJumping = false
let isGameOver = false
let position = 0

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump()
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            // going down
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // going up
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createBuilding() {
    const building = document.createElement('div')
    let buildingPosition = 2000
    let randomTime = Math.random() * 6000

    if(isGameOver) return 

    building.classList.add('building')
    background.appendChild(building)
    building.style.left = buildingPosition + 'px'


    let leftTimer = setInterval(() => {

        if (buildingPosition < -60) {
            clearInterval(leftTimer);
            background.removeChild(building);
        } else if (buildingPosition > 0 && buildingPosition < 60 && position < 60) {
            clearInterval(leftTimer)
            isGameOver = true
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'
        }
        else {
            buildingPosition -= 10
            building.style.left = buildingPosition + 'px'
        }
    }, 20)
    setTimeout(createBuilding, randomTime);
}

createBuilding()
document.addEventListener('keyup', handleKeyUp)