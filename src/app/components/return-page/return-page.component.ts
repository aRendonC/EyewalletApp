
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-page',
  templateUrl: './return-page.component.html',
  styleUrls: ['./return-page.component.scss'],
})

export class ReturnPageComponent implements OnInit {
  @Input() path;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  public async returnPage() {
    await this.router.navigate([this.path]);
  }
}
