import { Component, OnInit } from '@angular/core';
import * as platformModule from 'tns-core-modules/platform';
import { DataService } from '~/app/data.service';
import { HttpService } from '~/app/shared/http.service';
import { RouterExtensions } from 'nativescript-angular/router'
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-allQueries',
  templateUrl: './allQueries.component.html',
  styleUrls: ['./allQueries.component.css']
})
export class AllQueriesComponent implements OnInit {
  queries;
  loader = false;
  pageSide: number;
  iconSize: number;

  constructor(private httpService: HttpService,
    private routerExtensions: RouterExtensions,
    private _page: Page,
    
  ) {

  }

  ngOnInit() {
    const deviceHeight: number = platformModule.screen.mainScreen.heightDIPs;
    const deviceWidth: number = platformModule.screen.mainScreen.widthDIPs;
    this.pageSide = deviceWidth * 0.10;
    this.iconSize = deviceWidth * 0.095;
    this._page.actionBarHidden = true;
    this.getPeopleQueries();
  }


  Request(item) {
console.log('item');
    let navigationExtras: NavigationExtras = {
  
      queryParams: {
        "data": JSON.stringify({
          data: item,
  
        })
      }

    }
    this.routerExtensions.navigate(['home/request'], navigationExtras);
  }

  getPeopleQueries() {

    this.loader = true;
    this.httpService.getPeopleQueries()
      .subscribe(res => {
        this.queries = res;
        this.loader = false;
      }, (error) => {
        this.loader = false;
        console.log(error);
      });
  }
}
