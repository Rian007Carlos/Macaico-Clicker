import { addNewsletter } from "./newsletter";

export const researches = []

export class BananaResearch {
    constructor(name, duration, onComplete) {
        this.name = name;
        this.timer = 0
        this.onComplete = onComplete
        this.active = false
    }

    start() {
        this.active = true
        this.timer = 0
    }

    tick() {
        if (!this.active) return
        this.timer++
        if (this.timer >= this.duration) {
            this.active = false;
            this.onComplete()
            addNewsletter(`Pesquisa "${this.name}" concluída!`)
        }
    }
}
