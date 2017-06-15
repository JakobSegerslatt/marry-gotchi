import { Component, OnInit } from '@angular/core';
import { MdProgressBar } from '@angular/material';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  status: FirebaseObjectObservable<any>;
  happiness: FirebaseObjectObservable<any>;
  passion: FirebaseObjectObservable<any>;
  communication: FirebaseObjectObservable<any>;
  currentHappiness;
  currentPassion;
  currentCommunication;

  constructor(
    public db: AngularFireDatabase,
    public auth: AngularFireAuth,
  ) { }

  get currentStatus(): number {
    const status = (this.currentHappiness + this.currentPassion + this.currentCommunication) / 3;
    if (status > 90) {
      return 5;
    } else if (status > 80) {
      return 4;
    } else if (status > 40) {
      return 3;
    } else if (status > 5) {
      return 2;
    } else {
      return 1;
    }
  }

  ngOnInit() {
    this.status = this.db.object('status');
    this.happiness = this.db.object('happiness');
    this.happiness.subscribe(x => {
      this.currentHappiness = x.value;
    })
    this.passion = this.db.object('passion');
    this.passion.subscribe(x => {
      this.currentPassion = x.value;
    })
    this.communication = this.db.object('communication');
    this.communication.subscribe(x => {
      this.currentCommunication = x.value;
    })
  }

  contactFamily(happBar: MdProgressBar, passionBar: MdProgressBar, commBar: MdProgressBar) {
    const h = happBar.value + 2;
    this.happinessUpdate(h);
    const p = passionBar.value - 1;
    this.passionUpdate(p);
    const c = commBar.value + 1;
    this.communicationUpdate(c)
  }

  showLove(happBar: MdProgressBar, passionBar: MdProgressBar, commBar: MdProgressBar) {
    const newVal = passionBar.value + 2;
    this.passionUpdate(newVal)
    const h = happBar.value + 3;
    this.happinessUpdate(h)
  }


  fight(happBar: MdProgressBar, passionBar: MdProgressBar, commBar: MdProgressBar) {
    const noGood = Math.random() * 100;
    let value = happBar.value;
    if (noGood < 30) {
      value = value - 7;
    } else {
      value = value + 3;
    }
    this.happinessUpdate(value)
    const c = commBar.value;
    this.communicationUpdate(c + 2)
  }

  reset() {
    this.communicationUpdate(10)
    this.happinessUpdate(10)
    this.passionUpdate(10)
    this.statusUpdate(10)
  }

  startCountDown() {
    console.log('starting countdown..')
    const intervalId = setInterval(() => {
      this.happiness.subscribe(x => {
        this.happinessUpdate(x.value - 1)
      });
      this.passion.subscribe(x => {
        this.passionUpdate(x.value - 1)
      });
      this.happiness.subscribe(x => {
        this.happinessUpdate(x.value - 1)
      });
      this.status.subscribe(x => {
        this.statusUpdate(x.value - 1)
      });
    }, 4 * 1000)
  }

  communicationUpdate(value: number) {
    if (value > 100) { value = 100; }
    if (value < 0) { value = 0; }
    this.communication.update({ value: value })
  }
  happinessUpdate(value: number) {
    if (value > 100) { value = 100; }
    if (value < 0) { value = 0; }
    this.happiness.update({ value: value })
  }
  passionUpdate(value: number) {
    if (value > 100) { value = 100; }
    if (value < 0) { value = 0; }
    this.passion.update({ value: value })
  }
  statusUpdate(value: number) {
    if (value > 100) { value = 100; }
    if (value < 0) { value = 0; }
    this.status.update({ value: value })
  }
}
