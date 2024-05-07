import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'my-input',
  templateUrl: './my-input.component.html'
})
export class MyInputComponent {
  @Input() costumeFormControl: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() minCharacters: number | undefined;
  @Input({ required: true }) type: 'password' | 'text' = 'text';

  hidePwd = true;
}
