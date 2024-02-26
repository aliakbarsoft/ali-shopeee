import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[aliSplicNumberComma]'
})
export class SplicNumberCommaDirective {

  constructor(private el: ElementRef) { }

  // @HostListener('input', ['$event']) onInput(event: Event) {
  //   const input = this.el.nativeElement as HTMLInputElement;
  //   let value = input.value.replace(/,/g, ''); // Remove existing commas
  //   value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
  //   input.value = value;
  // }
  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Remove any commas from the current value
    const newValue = value.replace(/,/g, '');
    // Format the value with commas
    const formattedValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // Update the input value
    this.el.nativeElement.value = formattedValue;
  }
}
