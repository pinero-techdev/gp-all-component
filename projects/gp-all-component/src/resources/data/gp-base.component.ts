import {HostListener} from '@angular/core';
import {MensajesComponent} from './mensajes.component';

export abstract class GpBaseComponent extends MensajesComponent {
  width: number;
  height: number;
  working = false;
  jobs = 0;
  private offset = 0.95;

  constructor() {
    super();

    this.height = window.innerHeight * this.offset;
    this.width = window.innerWidth * this.offset;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.height = event.target.innerHeight * this.offset;
    this.width = event.target.innerWidth * this.offset;
  }

  pushQueue(jobs: number) {
    this.jobs = this.jobs + jobs;
    this.working = true;
  }

  popQueue() {
    if (this.working === true && this.jobs > 0) {
      this.jobs = this.jobs - 1;
      this.working = this.jobs !== 0;
    }
  }
}
