import { Component } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent {
  dummyTrafficData = [
    {
      id: 'd1',
      value: 433,
    },
    {
      id: 'd2',
      value: 260,
    },
    {
      id: 'd3',
      value: 290,
    },
    {
      id: 'd4',
      value: 410,
    },
    {
      id: 'd5',
      value: 397,
    },
    {
      id: 'd6',
      value: 488,
    },
    {
      id: 'd47',
      value: 589,
    },
  ];
  maxTraffic = Math.max(...this.dummyTrafficData.map((data) => data.value));
  currentStatus:'online'|'offline'|'unknown' = 'offline';

  constructor() {
    setInterval( ()=>{
      const rnd = Math.random();
      if(rnd<0.5) {
        this.currentStatus = 'online';
      }
      else if(rnd<0.9) {
        this.currentStatus = 'offline';
      }
      else {
        this.currentStatus = 'unknown';
      }
    }, 5000);
  }

}
