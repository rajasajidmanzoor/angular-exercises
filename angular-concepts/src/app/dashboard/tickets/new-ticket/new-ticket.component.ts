import { Component, ElementRef, output, viewChild, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  // @ViewChild('form') form?:ElementRef<HTMLFormElement>; 

  // Using Signal
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  add = output<{title: string, text: string }>();

  onSubmit(title: HTMLInputElement, ticketText: HTMLTextAreaElement) {

    // console.dir(title.value);
    // console.dir(ticketText.value);
    // title.classList.add('success');

    this.add.emit({title: title.value, text: ticketText.value});
    this.form()?.nativeElement.reset();


  }
}
