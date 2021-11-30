import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

interface LinkItemI {
  title: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  public listLinkItem: LinkItemI[] = [];
  @ViewChild('drawer') sidenav!: MatSidenav;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    this.listLinkItem = [
      {
        title: 'Inicio',
        icon: 'fa fa-home',
        link: '/'
      }
    ];
  }

  dawerToggle() {
    this.sidenav.toggle();
  }
}
