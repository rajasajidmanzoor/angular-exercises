import { Directive, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  }
})
export class SafeLinkDirective {
  queryParam = input('myapp');

  constructor() { 
    console.log('Safe Link Directive');
  }

  onConfirmLeavePage(event: MouseEvent){
    console.log('CLICKED');
    const confirmLeave = window.confirm("Do you want to leave this app?");

    if(confirmLeave){
      const address = (event.target as HTMLAnchorElement).href;
      (event.target as HTMLAnchorElement).href= address + '?from='+this.queryParam();
      return;
    }

    event.preventDefault();
  }

}
