import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Schleimi';
  public assetImagePath = "../assets/"

  private allCompliments = [
    {
      id: "gordon",
      text: "Deine Kochkünste beeindrucken sogar Gordon Ramsay!",
      imgSrc: `${this.assetImagePath}/gordon.gif`
    },
    {
      id: "cat",
      text: "Bei der Arbeit bist du ein Tier!",
      imgSrc: `${this.assetImagePath}/cat.gif`
    },
    {
      id: "keanu",
      text: "Hör auf Keanu!",
      imgSrc: `${this.assetImagePath}/breathtaking.gif`
    },
    {
      id: "muscle",
      text: "Oh, du hast wohl trainiert, was?",
      imgSrc: `${this.assetImagePath}/old-spice.gif`
    }
  ];

  public loading:boolean = false;

  public animationLength = 1500

  public currentCompliment:any = null;
  private nextComplimentCandidate:any = null;
  public complimentPlaceholderText = "Hier könnte ihr Kompliment stehen! Nicht so schütern, Schleimi ist auch für dich da! Drück den Knopf!"

  constructor() {

  }

  public requestCompliment() {
    //randomly get one of the compliments
    this.getNextComplimentCandidateByRandom();
    // if the compliment is the same as before, get a new random one and reapeat until there is a new one
    while(this.currentCompliment !== null && this.allCompliments.length > 1 && this.currentCompliment.id === this.nextComplimentCandidate.id) {
      this.getNextComplimentCandidateByRandom();
    }
    this.loading = true;
    setTimeout(() => {
      this.currentCompliment = this.nextComplimentCandidate;
      this.loading = false;
    },this.animationLength)
    
  }

  public getNextComplimentCandidateByRandom() {
    // get a random Compliment out of all compliments
    const nextComplimentIndex:number = Math.ceil(Math.random() * this.allCompliments.length);
    this.nextComplimentCandidate = this.allCompliments[nextComplimentIndex-1];
  }

}
