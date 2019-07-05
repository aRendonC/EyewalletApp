import { Component, OnInit,Input} from '@angular/core';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss'],
})
export class SlidersComponent implements OnInit {
  @Input() name: any;
  nameSlider:string;
  constructor() { 
    
  }

  ngOnInit() {
    this.nameSlider = this.name;
  }

}
