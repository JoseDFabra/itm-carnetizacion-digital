import { NgModule } from '@angular/core';
import { OnlyNumbersDirective } from './directives/onlyNumbers.directive';
import { ValidatorErrorDirective } from './directives/errorValidator.directive';
@NgModule({
    declarations: [ OnlyNumbersDirective, ValidatorErrorDirective ],
    imports: [],
    exports: [ OnlyNumbersDirective, ValidatorErrorDirective],
    providers: [],
})
export class SharedModule { }
