import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'gp-redirect',
  template: 'Redirecting...',
})
export class RedirectComponent implements OnInit {
  private url: string;
  private new: boolean;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.url = params.url;
      this.new = params.new;
      if (this.new) {
        window.open('http://' + this.url);
      } else {
        this.changeLocation('http://' + this.url);
      }
    });
  }

  changeLocation(location: string) {
    window.location.href = location;
  }
}
