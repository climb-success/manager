import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VIP 考研';
  showOneByOne: boolean = false;
  showOther: boolean = false;
}
