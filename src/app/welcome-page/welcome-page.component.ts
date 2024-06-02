import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PsidService } from '../psid.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private psidService: PsidService
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const psid = params['psid'];
      if (psid) {
        this.psidService.setPsid(psid);
        console.log("PSID received from URL and set in service:", psid);
      }
    });
  }
}
