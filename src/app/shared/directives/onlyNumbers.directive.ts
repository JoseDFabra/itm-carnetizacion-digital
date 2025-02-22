import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumbers]',
})
export class OnlyNumbersDirective {
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, ''); // Remueve todo excepto números
  }
}
