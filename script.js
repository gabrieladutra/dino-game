const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let isJumping = false;
function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump()
        }
    }
}

function jump() {
    isJumping = true;
    let position = 0;
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
    let buildingPosition = 1000
    let randomTime = Math.random() * 6000
    building.classList.add('building')
    building.style.left = 1000 + 'px'
    background.appendChild(building)

    let leftInterval = setInterval(() => {

        if (buildingPosition <= 60) {
            clearInterval(leftInterval);
            background.removeChild(building);
        } else {
            buildingPosition -= 10
            building.style.left = buildingPosition + 'px'
        }
    }, 20)
    setTimeout(createBuilding, randomTime);
}

createBuilding()
document.addEventListener('keyup', handleKeyUp)