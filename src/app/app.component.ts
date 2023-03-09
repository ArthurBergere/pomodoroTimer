import { Component, OnInit } from '@angular/core';
// Importer l'objet Audio
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  // Importer l'objet Audio
  startSound = new Audio('../assets/bell.wav');
  headingText: string | undefined;
  remainingTime = 25 * 60 * 1000; // 25 minutes in milliseconds
  timerInterval: any;
  numOfWorkSessionsCompleted = 0;
  displayTime: string | undefined;
  isTimerStarted = false;
  isPause = false;
  randomPhrases: string[] = [
    'Focus on your work',
    'Stay productive',
    'Keep your mind sharp',
    'Don\'t give up',
    'Make it happen',
    'Stay motivated',
    'Work smarter, not harder',
  ];


  constructor() { }

  ngOnInit() {
    // Récupérer la valeur stockée précédemment
    const savedNumOfWorkSessionsCompleted = localStorage.getItem('numOfWorkSessionsCompleted');
    // Si la valeur existe, l'initialiser à `numOfWorkSessionsCompleted`
    if (savedNumOfWorkSessionsCompleted) {
      this.numOfWorkSessionsCompleted = parseInt(savedNumOfWorkSessionsCompleted);
    }
    this.displayTime = this.getDisplayTime(this.remainingTime);
    this.headingText = "Pomodoro for study"
  }

  startTimer() {
    this.startSound.play();
    this.isTimerStarted = true;
    this.headingText = "Let's start !"
    this.timerInterval = setInterval(() => {
      this.remainingTime -= 1000;
      this.displayTime = this.getDisplayTime(this.remainingTime);
      if (this.remainingTime === 0) {
        clearInterval(this.timerInterval);
          // If the timer has not been paused, start the 5 minute break
          this.numOfWorkSessionsCompleted += 1;
          localStorage.setItem('numOfWorkSessionsCompleted', this.numOfWorkSessionsCompleted.toString());
          this.remainingTime = 5 * 60 * 1000; // 5 minutes in milliseconds
          this.isPause = true;
          this.headingText = "Take a break!";
          this.timerInterval = setInterval(() => {
            this.remainingTime -= 1000;
            this.displayTime = this.getDisplayTime(this.remainingTime);
            if (this.remainingTime === 0) {
              this.isPause = false;
              clearInterval(this.timerInterval);
              this.remainingTime = 25 * 60 * 1000; // 25 minutes in milliseconds
              this.displayTime = this.getDisplayTime(this.remainingTime);
              this.startTimer();
            }
          }, 1000);

      }
    }, 1000);
  }

  pauseTimer() {
    this.isTimerStarted = false;
      clearInterval(this.timerInterval);
      this.headingText = "You have stop your work 😰 "
    
  }

  getDisplayTime(time: number): string {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  }
  getProgressBarWidth(): string {
    const totalSeconds = 25 * 60; // 25 minutes in seconds
    const elapsedSeconds = Math.floor((totalSeconds - this.remainingTime / 1000) % totalSeconds);
    const progressPercent = (elapsedSeconds / totalSeconds) * 100;
    return `${progressPercent}%`;
  }
  
  setRandomHeadingText() {
    setInterval(() => {
      const element = document.getElementById('heading');
      if (this.isPause) {
        this.headingText = "Take a breath"
      }else {
        this.headingText = this.randomPhrases[Math.floor(Math.random() * this.randomPhrases.length)];
      }
    }, 30000);
  }
}
  

  
