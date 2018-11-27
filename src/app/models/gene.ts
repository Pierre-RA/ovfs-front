export class Gene {
  name: string;
  height: number;
  weight: number;
  strength: number;
  agility: number;
  intelligence: number;
  health: number;
  currentHealth: number;
  bmi: number;
  strengthModifier: number;
  agilityModifier: number;
  attacks: number;

  static getGauss(mu: number, sigma: number) {
    let tmp = 0;
    for (let i = 0; i < 6; i++) {
      tmp += Math.random();
    }
    const res = sigma * (tmp - 3) / 3 + mu;
    return res;
  }

  static getRandInt(start: number, end: number): number {
    return Math.floor(start + Math.random() * (end - start + 1));
  }

  constructor() {
    this.name = this.generateName();
    this.height = Gene.getGauss(175, 40);
    this.weight = this.generateWeight(12000, 3000);
    this.strengthModifier = Gene.getRandInt(45, 79);
    this.agilityModifier = Gene.getRandInt(45, 99);
    this.intelligence = Gene.getGauss(105, 40);
    this.bmi = this.weight / Math.pow(this.height / 100, 2);

    this.health = this.weight / Math.pow(this.height / 100, 2);
    this.currentHealth = this.health;
    this.agility = (1 / this.weight) * 10 * this.agilityModifier;
    const bmiModifier = this.bmi < 20 ? (this.bmi - 10) / 10 : 1;
    this.strength = (this.height / 10) * this.strengthModifier * bmiModifier / 100;
    this.attacks = (this.intelligence / 20) - 3;
  }

  private generateName() {
    return Math.floor(Math.random() * 100000000000).toString(36);
  }

  private generateWeight(a: number, b: number): number {
    const weightModifier = Gene.getGauss(a, b) / 10000;
    return weightModifier * this.height - 126.19;
  }

  getTouch(): number {
    return Math.round(this.strength + Gene.getRandInt(0, 10));
  }

  getDefense(): number {
    return Math.round(this.agility + Gene.getRandInt(0, 10));
  }

  getDamages(def: Gene) {
    const res = this.getTouch() - def.getDefense();
    return res > 0 ? res : 0;
  }

  takeDamage(damages: number) {
    this.currentHealth -= damages;
    if (this.currentHealth < 0) {
      this.currentHealth = 0;
    }
  }

  solve(att: Gene) {
    this.takeDamage(att.getDamages(this));
  }

  resetHealth() {
    this.currentHealth = this.health;
  }
}
