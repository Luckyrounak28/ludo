let activePlayers = [1, 2, 3, 4];
let playerNames = {1: 'Red', 2: 'Green', 3: 'Yellow', 4: 'Blue'};
let playerScores = {1: 0, 2: 0, 3: 0, 4: 0};
let colors = {1: 'red', 2: 'green', 3: 'yellow', 4: 'blue'};

const MOVE_DELAY = 300; // Faster movement

class Dice {
    type = 1;
    count = 0;
    didKill = false;
    r = new Red();
    g = new Green();
    y = new Yellow();
    b = new Blue();
    roll() {
        const diceButtons = {
            1: document.getElementById("die-red"),
            2: document.getElementById("die-green"),
            3: document.getElementById("die-yellow"),
            4: document.getElementById("die-blue")
        };
        const messageDivs = {
            1: document.getElementById("message-red"),
            2: document.getElementById("message-green"),
            3: document.getElementById("message-yellow"),
            4: document.getElementById("message-blue")
        };

        // Roll dice
        this.count = Math.floor(Math.random() * 6 + 1);
        diceButtons[this.type].style.backgroundImage = `url("src/${this.count}.png")`;

        // Update message with rolled value
        messageDivs[this.type].innerHTML = `${playerNames[this.type]} rolled ${this.count}`;

        // Determine player
        let player;
        if (this.type == 1) player = this.r;
        if (this.type == 2) player = this.g;
        if (this.type == 3) player = this.y;
        if (this.type == 4) player = this.b;

        // Check if move is possible
        if (player.isMovePossible(this.count)) {
            diceButtons[this.type].disabled = true;
        } else {
            this.nextTurn();
        }
        console.log(`Player ${playerNames[this.type]} rolled ${this.count}`);
    }
    showContainers() {
        const containers = {
            1: document.getElementById("red-dice"),
            2: document.getElementById("green-dice"),
            3: document.getElementById("yellow-dice"),
            4: document.getElementById("blue-dice")
        };
        const messageDivs = {
            1: document.getElementById("message-red"),
            2: document.getElementById("message-green"),
            3: document.getElementById("message-yellow"),
            4: document.getElementById("message-blue")
        };
        for (let i = 1; i <= 4; i++) {
            if (activePlayers.includes(i)) {
                containers[i].style.display = (i === this.type) ? 'block' : 'none';
                if (i === this.type) {
                    messageDivs[i].innerHTML = `${playerNames[i]}'s Turn`;
                    messageDivs[i].style.color = getColor(i);
                } else {
                    messageDivs[i].innerHTML = '';
                }
            }
        }
    }
    nextTurn() {
        const index = activePlayers.indexOf(this.type);
        this.type = activePlayers[(index + 1) % activePlayers.length];
        this.showContainers();
    }
}

function getColor(type) {
    if (type == 1) return "red";
    if (type == 2) return "green";
    if (type == 3) return "rgb(255, 200, 0)";
    if (type == 4) return "blue";
}

class Red_g {
    j = 0;
    move = 0;
    home = true;
    constructor(G_NO) {
        this.G_NO = G_NO;
    }
}

class Green_g {
    j = 0;
    move = 0;
    home = true;
    constructor(G_NO) {
        this.G_NO = G_NO;
    }
}

class Yellow_g {
    j = 0;
    move = 0;
    home = true;
    constructor(G_NO) {
        this.G_NO = G_NO;
    }
}

class Blue_g {
    j = 0;
    move = 0;
    home = true;
    constructor(G_NO) {
        this.G_NO = G_NO;
    }
}

var R1 = new Red_g(document.getElementById('r1'));
var R2 = new Red_g(document.getElementById('r2'));
var R3 = new Red_g(document.getElementById('r3'));
var R4 = new Red_g(document.getElementById('r4'));

class Red {
    constructor() {
        this.type = 1;
    }
    y = null;
    a = 0;
    x = null;
    mover(RN, count, callback) {
        this.y = RN.G_NO;
        console.log("Check: " + (RN.move + count));
        let steps = 0;
        if (RN.move + count < 57) {
            if (RN.j != 0 && RN.home == false) {
                let start = RN.j;
                count = count + RN.j;
                steps = count - start + 1;
                for (let i = start; i <= count; i++) {
                    this.a++;
                    setTimeout(() => this.movefunc(i, RN.move), MOVE_DELAY * this.a);
                    RN.move++;
                }
                RN.move--;
                RN.j = count;
                this.killcheck(count);
                this.a = 0;
            } else if (count == 6) {
                this.x = document.getElementById(1);
                this.x.appendChild(this.y);
                RN.j = 1;
                RN.home = false;
                steps = 0;
            } else {
                return false;
            }
            setTimeout(callback, steps * MOVE_DELAY + 100);
            return true;
        }
        return false;
    }
    movefunc(i, move) {
        if (move >= 51) {
            if (i == 57) {
                this.x = document.getElementById("out");
                playerScores[this.type]++;
                updateScore(this.type);
            } else {
                var jn = "rf" + i;
                this.x = document.getElementById(jn);
            }
        } else {
            this.x = document.getElementById(i);
        }
        this.x.appendChild(this.y);
    }
    choose(i) {
        const wasSix = (roll.count === 6);
        const diceId = "die-red";
        roll.didKill = false;
        const callback = () => {
            document.getElementById(diceId).disabled = false;
            roll.count = 0;
            if (!wasSix && !roll.didKill) {
                roll.nextTurn();
            }
        };
        let ck;
        if (i == 1) {
            ck = this.mover(R1, roll.count, callback);
        } else if (i == 2) {
            ck = this.mover(R2, roll.count, callback);
        } else if (i == 3) {
            ck = this.mover(R3, roll.count, callback);
        } else if (i == 4) {
            ck = this.mover(R4, roll.count, callback);
        }
        console.log("Moved: " + ck);
    }
    isMovePossible(count) {
        const allHome = R1.home && R2.home && R3.home && R4.home;
        return !(allHome && count !== 6);
    }
    killcheck(j) {
        let killed = false;
        if (j != 22 && j != 27 && j != 14 && j != 9 && j != 40 && j != 35 && j != 48 && j != 1) {
            if (j == G1.j) {
                G1.j = 0;
                G1.home = true;
                G1.move = 0;
                document.getElementById('g_g1').appendChild(G1.G_NO);
                killed = true;
            }
            if (j == G2.j) {
                G2.j = 0;
                G2.home = true;
                G2.move = 0;
                document.getElementById('g_g2').appendChild(G2.G_NO);
                killed = true;
            }
            if (j == G3.j) {
                G3.j = 0;
                G3.home = true;
                G3.move = 0;
                document.getElementById('g_g3').appendChild(G3.G_NO);
                killed = true;
            }
            if (j == G4.j) {
                G4.j = 0;
                G4.home = true;
                G4.move = 0;
                document.getElementById('g_g4').appendChild(G4.G_NO);
                killed = true;
            }
            if (j == Y1.j) {
                Y1.j = 0;
                Y1.home = true;
                Y1.move = 0;
                document.getElementById('g_y1').appendChild(Y1.G_NO);
                killed = true;
            }
            if (j == Y2.j) {
                Y2.j = 0;
                Y2.home = true;
                Y2.move = 0;
                document.getElementById('g_y2').appendChild(Y2.G_NO);
                killed = true;
            }
            if (j == Y3.j) {
                Y3.j = 0;
                Y3.home = true;
                Y3.move = 0;
                document.getElementById('g_y3').appendChild(Y3.G_NO);
                killed = true;
            }
            if (j == Y4.j) {
                Y4.j = 0;
                Y4.home = true;
                Y4.move = 0;
                document.getElementById('g_y4').appendChild(Y4.G_NO);
                killed = true;
            }
            if (j == B1.j) {
                B1.j = 0;
                B1.home = true;
                B1.move = 0;
                document.getElementById('g_b1').appendChild(B1.G_NO);
                killed = true;
            }
            if (j == B2.j) {
                B2.j = 0;
                B2.home = true;
                B2.move = 0;
                document.getElementById('g_b2').appendChild(B2.G_NO);
                killed = true;
            }
            if (j == B3.j) {
                B3.j = 0;
                B3.home = true;
                B3.move = 0;
                document.getElementById('g_b3').appendChild(B3.G_NO);
                killed = true;
            }
            if (j == B4.j) {
                B4.j = 0;
                B4.home = true;
                B4.move = 0;
                document.getElementById('g_b4').appendChild(B4.G_NO);
                killed = true;
            }
            if (killed) {
                roll.didKill = true;
            }
        }
    }
}

var B1 = new Blue_g(document.getElementById('b1'));
var B2 = new Blue_g(document.getElementById('b2'));
var B3 = new Blue_g(document.getElementById('b3'));
var B4 = new Blue_g(document.getElementById('b4'));

class Blue {
    constructor() {
        this.type = 4;
    }
    y = null;
    a = 0;
    x = null;
    mover(RN, count, callback) {
        this.y = RN.G_NO;
        let steps = 0;
        console.log("Check: " + (RN.move + count));
        if (RN.move + count < 57) {
            if (RN.j != 0 && RN.home == false) {
                let start = RN.j;
                count = count + RN.j;
                steps = count - start + 1;
                for (let i = RN.j; i <= count; i++) {
                    if (i == 53) {
                        count = count - i + 1;
                        RN.j = 1;
                        i = 1;
                    }
                    this.a++;
                    setTimeout(() => this.movefunc(i, RN.move), MOVE_DELAY * this.a);
                    RN.move++;
                }
                RN.move--;
                RN.j = count;
                this.killcheck(count);
                this.a = 0;
            } else if (count == 6) {
                this.x = document.getElementById(40);
                this.x.appendChild(this.y);
                RN.j = 40;
                RN.home = false;
                steps = 0;
            } else {
                return false;
            }
            setTimeout(callback, steps * MOVE_DELAY + 100);
            return true;
        }
        return false;
    }
    movefunc(i, move) {
        if (move >= 51) {
            if (i == 44) {
                this.x = document.getElementById("out");
                playerScores[this.type]++;
                updateScore(this.type);
            } else {
                var jn = "bf" + i;
                this.x = document.getElementById(jn);
            }
        } else {
            this.x = document.getElementById(i);
        }
        this.x.appendChild(this.y);
    }
    choose(i) {
        const wasSix = (roll.count === 6);
        const diceId = "die-blue";
        roll.didKill = false;
        const callback = () => {
            document.getElementById(diceId).disabled = false;
            roll.count = 0;
            if (!wasSix && !roll.didKill) {
                roll.nextTurn();
            }
        };
        let ck;
        if (i == 1) {
            ck = this.mover(B1, roll.count, callback);
        } else if (i == 2) {
            ck = this.mover(B2, roll.count, callback);
        } else if (i == 3) {
            ck = this.mover(B3, roll.count, callback);
        } else if (i == 4) {
            ck = this.mover(B4, roll.count, callback);
        }
        console.log("Moved: " + ck);
    }
    isMovePossible(count) {
        const allHome = B1.home && B2.home && B3.home && B4.home;
        return !(allHome && count !== 6);
    }
    killcheck(j) {
        let killed = false;
        if (j != 22 && j != 27 && j != 14 && j != 9 && j != 40 && j != 35 && j != 48 && j != 1) {
            if (j == G1.j) {
                G1.j = 0;
                G1.home = true;
                G1.move = 0;
                document.getElementById('g_g1').appendChild(G1.G_NO);
                killed = true;
            }
            if (j == G2.j) {
                G2.j = 0;
                G2.home = true;
                G2.move = 0;
                document.getElementById('g_g2').appendChild(G2.G_NO);
                killed = true;
            }
            if (j == G3.j) {
                G3.j = 0;
                G3.home = true;
                G3.move = 0;
                document.getElementById('g_g3').appendChild(G3.G_NO);
                killed = true;
            }
            if (j == G4.j) {
                G4.j = 0;
                G4.home = true;
                G4.move = 0;
                document.getElementById('g_g4').appendChild(G4.G_NO);
                killed = true;
            }
            if (j == Y1.j) {
                Y1.j = 0;
                Y1.home = true;
                Y1.move = 0;
                document.getElementById('g_y1').appendChild(Y1.G_NO);
                killed = true;
            }
            if (j == Y2.j) {
                Y2.j = 0;
                Y2.home = true;
                Y2.move = 0;
                document.getElementById('g_y2').appendChild(Y2.G_NO);
                killed = true;
            }
            if (j == Y3.j) {
                Y3.j = 0;
                Y3.home = true;
                Y3.move = 0;
                document.getElementById('g_y3').appendChild(Y3.G_NO);
                killed = true;
            }
            if (j == Y4.j) {
                Y4.j = 0;
                Y4.home = true;
                Y4.move = 0;
                document.getElementById('g_y4').appendChild(Y4.G_NO);
                killed = true;
            }
            if (j == R1.j) {
                R1.j = 0;
                R1.home = true;
                R1.move = 0;
                document.getElementById('g_r1').appendChild(R1.G_NO);
                killed = true;
            }
            if (j == R2.j) {
                R2.j = 0;
                R2.home = true;
                R2.move = 0;
                document.getElementById('g_r2').appendChild(R2.G_NO);
                killed = true;
            }
            if (j == R3.j) {
                R3.j = 0;
                R3.home = true;
                R3.move = 0;
                document.getElementById('g_r3').appendChild(R3.G_NO);
                killed = true;
            }
            if (j == R4.j) {
                R4.j = 0;
                R4.home = true;
                R4.move = 0;
                document.getElementById('g_r4').appendChild(R4.G_NO);
                killed = true;
            }
            if (killed) {
                roll.didKill = true;
            }
        }
    }
}

var G1 = new Green_g(document.getElementById('g1'));
var G2 = new Green_g(document.getElementById('g2'));
var G3 = new Green_g(document.getElementById('g3'));
var G4 = new Green_g(document.getElementById('g4'));

class Green {
    constructor() {
        this.type = 2;
    }
    y = null;
    a = 0;
    x = null;
    mover(RN, count, callback) {
        this.y = RN.G_NO;
        let steps = 0;
        console.log("Check: " + (RN.move + count));
        if (RN.move + count < 57) {
            if (RN.j != 0 && RN.home == false) {
                let start = RN.j;
                count = count + RN.j;
                steps = count - start + 1;
                for (let i = RN.j; i <= count; i++) {
                    if (i == 53) {
                        count = count - i + 1;
                        RN.j = 1;
                        i = 1;
                    }
                    this.a++;
                    setTimeout(() => this.movefunc(i, RN.move), MOVE_DELAY * this.a);
                    RN.move++;
                }
                RN.move--;
                RN.j = count;
                this.killcheck(count);
                this.a = 0;
            } else if (count == 6) {
                this.x = document.getElementById(14);
                this.x.appendChild(this.y);
                RN.j = 14;
                RN.home = false;
                steps = 0;
            } else {
                return false;
            }
            setTimeout(callback, steps * MOVE_DELAY + 100);
            return true;
        }
        return false;
    }
    movefunc(i, move) {
        if (move >= 51) {
            if (i == 18) {
                this.x = document.getElementById("out");
                playerScores[this.type]++;
                updateScore(this.type);
            } else {
                var jn = "gf" + i;
                this.x = document.getElementById(jn);
            }
        } else {
            this.x = document.getElementById(i);
        }
        this.x.appendChild(this.y);
    }
    choose(i) {
        const wasSix = (roll.count === 6);
        const diceId = "die-green";
        roll.didKill = false;
        const callback = () => {
            document.getElementById(diceId).disabled = false;
            roll.count = 0;
            if (!wasSix && !roll.didKill) {
                roll.nextTurn();
            }
        };
        let ck;
        if (i == 1) {
            ck = this.mover(G1, roll.count, callback);
        } else if (i == 2) {
            ck = this.mover(G2, roll.count, callback);
        } else if (i == 3) {
            ck = this.mover(G3, roll.count, callback);
        } else if (i == 4) {
            ck = this.mover(G4, roll.count, callback);
        }
        console.log("Moved: " + ck);
    }
    isMovePossible(count) {
        const allHome = G1.home && G2.home && G3.home && G4.home;
        return !(allHome && count !== 6);
    }
    killcheck(j) {
        let killed = false;
        if (j != 22 && j != 27 && j != 14 && j != 9 && j != 40 && j != 35 && j != 48 && j != 1) {
            if (j == R1.j) {
                R1.j = 0;
                R1.home = true;
                R1.move = 0;
                document.getElementById('g_r1').appendChild(R1.G_NO);
                killed = true;
            }
            if (j == R2.j) {
                R2.j = 0;
                R2.home = true;
                R2.move = 0;
                document.getElementById('g_r2').appendChild(R2.G_NO);
                killed = true;
            }
            if (j == R3.j) {
                R3.j = 0;
                R3.home = true;
                R3.move = 0;
                document.getElementById('g_r3').appendChild(R3.G_NO);
                killed = true;
            }
            if (j == R4.j) {
                R4.j = 0;
                R4.home = true;
                R4.move = 0;
                document.getElementById('g_r4').appendChild(R4.G_NO);
                killed = true;
            }
            if (j == Y1.j) {
                Y1.j = 0;
                Y1.home = true;
                Y1.move = 0;
                document.getElementById('g_y1').appendChild(Y1.G_NO);
                killed = true;
            }
            if (j == Y2.j) {
                Y2.j = 0;
                Y2.home = true;
                Y2.move = 0;
                document.getElementById('g_y2').appendChild(Y2.G_NO);
                killed = true;
            }
            if (j == Y3.j) {
                Y3.j = 0;
                Y3.home = true;
                Y3.move = 0;
                document.getElementById('g_y3').appendChild(Y3.G_NO);
                killed = true;
            }
            if (j == Y4.j) {
                Y4.j = 0;
                Y4.home = true;
                Y4.move = 0;
                document.getElementById('g_y4').appendChild(Y4.G_NO);
                killed = true;
            }
            if (j == B1.j) {
                B1.j = 0;
                B1.home = true;
                B1.move = 0;
                document.getElementById('g_b1').appendChild(B1.G_NO);
                killed = true;
            }
            if (j == B2.j) {
                B2.j = 0;
                B2.home = true;
                B2.move = 0;
                document.getElementById('g_b2').appendChild(B2.G_NO);
                killed = true;
            }
            if (j == B3.j) {
                B3.j = 0;
                B3.home = true;
                B3.move = 0;
                document.getElementById('g_b3').appendChild(B3.G_NO);
                killed = true;
            }
            if (j == B4.j) {
                B4.j = 0;
                B4.home = true;
                B4.move = 0;
                document.getElementById('g_b4').appendChild(B4.G_NO);
                killed = true;
            }
            if (killed) {
                roll.didKill = true;
            }
        }
    }
}

var Y1 = new Yellow_g(document.getElementById('y1'));
var Y2 = new Yellow_g(document.getElementById('y2'));
var Y3 = new Yellow_g(document.getElementById('y3'));
var Y4 = new Yellow_g(document.getElementById('y4'));

class Yellow {
    constructor() {
        this.type = 3;
    }
    y = null;
    a = 0;
    x = null;
    mover(RN, count, callback) {
        this.y = RN.G_NO;
        let steps = 0;
        console.log("Check: " + (RN.move + count));
        if (RN.move + count < 57) {
            if (RN.j != 0 && RN.home == false) {
                let start = RN.j;
                count = count + RN.j;
                steps = count - start + 1;
                for (let i = RN.j; i <= count; i++) {
                    if (i == 53) {
                        count = count - i + 1;
                        RN.j = 1;
                        i = 1;
                    }
                    this.a++;
                    setTimeout(() => this.movefunc(i, RN.move), MOVE_DELAY * this.a);
                    RN.move++;
                }
                RN.move--;
                RN.j = count;
                this.killcheck(count);
                this.a = 0;
            } else if (count == 6) {
                this.x = document.getElementById(27);
                this.x.appendChild(this.y);
                RN.j = 27;
                RN.home = false;
                steps = 0;
            } else {
                return false;
            }
            setTimeout(callback, steps * MOVE_DELAY + 100);
            return true;
        }
        return false;
    }
    movefunc(i, move) {
        if (move >= 51) {
            if (i == 31) {
                this.x = document.getElementById("out");
                playerScores[this.type]++;
                updateScore(this.type);
            } else {
                var jn = "yf" + i;
                this.x = document.getElementById(jn);
            }
        } else {
            this.x = document.getElementById(i);
        }
        this.x.appendChild(this.y);
    }
    choose(i) {
        const wasSix = (roll.count === 6);
        const diceId = "die-yellow";
        roll.didKill = false;
        const callback = () => {
            document.getElementById(diceId).disabled = false;
            roll.count = 0;
            if (!wasSix && !roll.didKill) {
                roll.nextTurn();
            }
        };
        let ck;
        if (i == 1) {
            ck = this.mover(Y1, roll.count, callback);
        } else if (i == 2) {
            ck = this.mover(Y2, roll.count, callback);
        } else if (i == 3) {
            ck = this.mover(Y3, roll.count, callback);
        } else if (i == 4) {
            ck = this.mover(Y4, roll.count, callback);
        }
        console.log("Moved: " + ck);
    }
    isMovePossible(count) {
        const allHome = Y1.home && Y2.home && Y3.home && Y4.home;
        return !(allHome && count !== 6);
    }
    killcheck(j) {
        let killed = false;
        if (j != 22 && j != 27 && j != 14 && j != 9 && j != 40 && j != 35 && j != 48 && j != 1) {
            if (j == G1.j) {
                G1.j = 0;
                G1.home = true;
                G1.move = 0;
                document.getElementById('g_g1').appendChild(G1.G_NO);
                killed = true;
            }
            if (j == G2.j) {
                G2.j = 0;
                G2.home = true;
                G2.move = 0;
                document.getElementById('g_g2').appendChild(G2.G_NO);
                killed = true;
            }
            if (j == G3.j) {
                G3.j = 0;
                G3.home = true;
                G3.move = 0;
                document.getElementById('g_g3').appendChild(G3.G_NO);
                killed = true;
            }
            if (j == G4.j) {
                G4.j = 0;
                G4.home = true;
                G4.move = 0;
                document.getElementById('g_g4').appendChild(G4.G_NO);
                killed = true;
            }
            if (j == R1.j) {
                R1.j = 0;
                R1.home = true;
                R1.move = 0;
                document.getElementById('g_r1').appendChild(R1.G_NO);
                killed = true;
            }
            if (j == R2.j) {
                R2.j = 0;
                R2.home = true;
                R2.move = 0;
                document.getElementById('g_r2').appendChild(R2.G_NO);
                killed = true;
            }
            if (j == R3.j) {
                R3.j = 0;
                R3.home = true;
                R3.move = 0;
                document.getElementById('g_r3').appendChild(R3.G_NO);
                killed = true;
            }
            if (j == R4.j) {
                R4.j = 0;
                R4.home = true;
                R4.move = 0;
                document.getElementById('g_r4').appendChild(R4.G_NO);
                killed = true;
            }
            if (j == B1.j) {
                B1.j = 0;
                B1.home = true;
                B1.move = 0;
                document.getElementById('g_b1').appendChild(B1.G_NO);
                killed = true;
            }
            if (j == B2.j) {
                B2.j = 0;
                B2.home = true;
                B2.move = 0;
                document.getElementById('g_b2').appendChild(B2.G_NO);
                killed = true;
            }
            if (j == B3.j) {
                B3.j = 0;
                B3.home = true;
                B3.move = 0;
                document.getElementById('g_b3').appendChild(B3.G_NO);
                killed = true;
            }
            if (j == B4.j) {
                B4.j = 0;
                B4.home = true;
                B4.move = 0;
                document.getElementById('g_b4').appendChild(B4.G_NO);
                killed = true;
            }
            if (killed) {
                roll.didKill = true;
            }
        }
    }
}

var roll = new Dice();
var red = roll.r;
var green = roll.g;
var yellow = roll.y;
var blue = roll.b;

function updateScore(type) {
    const col = colors[type];
    document.getElementById(`score-${col}`).innerText = `Score: ${playerScores[type]}`;
    if (playerScores[type] === 4) {
        alert(`${playerNames[type]} wins!`);
    }
}

// Setup logic
window.onload = function () {
    console.log("Window loaded, initializing setup");
    document.getElementById('setup').style.display = 'block';
    document.getElementById('main').style.display = 'none';

    const numSelect = document.getElementById('num-players');
    const namesDiv = document.getElementById('player-names');
    const updateNames = () => {
        const num = parseInt(numSelect.value);
        console.log(`Number of players selected: ${num}`);
        namesDiv.innerHTML = '';
        for (let i = 1; i <= num; i++) {
            namesDiv.innerHTML += `<br><label for="player-name-${i}">Player ${i} Name:</label> <input id="player-name-${i}" type="text" placeholder="Player ${i}">`;
        }
    };
    numSelect.addEventListener('change', updateNames);
    updateNames(); // Initialize with default number of players

    const startButton = document.getElementById('start-game');
    startButton.addEventListener('click', () => {
        console.log("Start game button clicked");
        const num = parseInt(numSelect.value);
        activePlayers = [];
        for (let i = 1; i <= num; i++) {
            activePlayers.push(i);
            const nameInput = document.getElementById(`player-name-${i}`);
            const name = nameInput ? (nameInput.value.trim() || `Player ${i}`) : `Player ${i}`;
            playerNames[i] = name;
            const col = colors[i];
            console.log(`Setting name for ${col}: ${name}`);
            document.getElementById(`label-${col}`).innerHTML = `${name}'s Home`;
        }
        // Hide unused pieces, dice, and labels, gray out homes
        for (let i = num + 1; i <= 4; i++) {
            const col = colors[i];
            const prefix = col.charAt(0);
            ['1', '2', '3', '4'].forEach(num => {
                const piece = document.getElementById(`${prefix}${num}`);
                if (piece) {
                    piece.style.display = 'none';
                    piece.onclick = null;
                }
            });
            document.getElementById(`${col}-dice`).style.display = 'none';
            document.getElementById(`label-${col}`).innerHTML = '';
            document.getElementById(col).style.opacity = 0.5;
        }
        console.log("Hiding setup, showing main game");
        document.getElementById('setup').style.display = 'none';
        document.getElementById('main').style.display = 'flex';
        roll.type = activePlayers[0];
        console.log(`Starting with player ${playerNames[roll.type]} (type ${roll.type})`);
        roll.showContainers();
        // Update initial scores
        Object.keys(playerScores).forEach(t => updateScore(parseInt(t)));
    });
};