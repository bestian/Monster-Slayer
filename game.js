// Monster Salyer Game

const Game = new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns.unshift({
                isSys: true,
                isPlayer: false,
                isMonster: false,
                text: "New game started."
            });
        },
        attack() {
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isSys: false,
                isPlayer: true,
                isMonster: false,
                text: "Player hits Monster for " + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        specialAttack() {
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isSys: false,
                isPlayer: true,
                isMonster: false,
                text: "Player hits Monster for " + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        heal() {
            if (this.playerHealth <= 80) {
                this.playerHealth += 20;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isSys: false,
                isPlayer: true,
                isMonster: false,
                text: "Players heals for 20"
            });
            this.monsterAttacks();
        },
        giveUp() {
            if (confirm("Are you sure to give up?")) {
                this.turns.unshift({
                    isSys: true,
                    isPlayer: false,
                    isMonster: false,
                    text: "Player gives up"
                })
                this.gameIsRunning = false
            }
        },
        calculateDamage(min, max) {
            return Math.max(Math.floor((Math.random() + 1) * max), min);
        },
        monsterAttacks() {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isSys: false,
                isPlayer: false,
                isMonster: true,
                text: "Monster hits Player for " + damage
            });
            if (this.checkWin()) {
                return;
            }
        },
        checkWin() {
            if (this.monsterHealth <= 0) {
                // this.monsterHealth = 0;
                // this.playerHealth = 0;
                // alert("You Won");
                // this.gameIsRunning = false;
                if (confirm("You won! New game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                // this.monsterHealth = 0;
                // this.playerHealth = 0
                // alert("You Died");
                // this.gameIsRunning = false;
                if (confirm("You lost! New game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});