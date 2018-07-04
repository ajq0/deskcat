

let mX = 0, mY = 0

require('electron').ipcRenderer.on('mousePosition', (event, pos) => {
    mX = pos.x
    mY = pos.y
})

let floor

class Vector {
    constructor({ x, y }) {
        this.x = x || 0, this.y = y || 0
    }
    mul(scalar) {
        return new Vector({ x: this.x * scalar, y: this.t * scalar })
    }
    add(vec) {
        return new Vector({ x: this.x + vec.x, y: this.t + vec.y })
    }
}

class Cat {

    constructor() {
        this.pos = new Vector({ x: 0, y: 0 })
        this.vel = new Vector({ x: 0, y: 0 })
        this.dim = new Vector({ x: 100, y: 100 })
    }

    update() {
        ///
        this.vel = this.vel.add({ x: 0, y: 10 })
        this.vel = this.vel.mul(0.9)//
        this.pos = this.pos.add(this.vel)
    }

    draw() {

        fill(255, 0, 0)
        rect(this.pos.x, this.pos.y, 100, 100)

    }
}

let cat = new Cat();


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(60)
    floor = height
}

function draw() {
    cat.update()

    clear()
    push()
    noFill()
    ellipse(mX, mY, 80, 80);
    console.log(cat)
    cat.draw()
    pop()
}