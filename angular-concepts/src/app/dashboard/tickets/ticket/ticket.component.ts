import { Component, input, signal, output } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  data = input.required<Ticket>();
  close = output();
  detailsVisible = signal<boolean>(false);

  onToggleDetails () {
    this.detailsVisible.set(!this.detailsVisible()!);
  }

  onCloseTicket () {
    this.close.emit();
  }

}
