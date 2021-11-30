import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Output() eventToggle = new EventEmitter();

  public userFullName: string = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _service: UserService,
    private router: Router,
  ) {
    let user = JSON.parse(localStorage.getItem('currentUser')!) || null;

    if (user) {
      this.userFullName = `${user.firstName} ${user.lastName}`
    }
  }

  onLogout(): void {
    if (this._service.logout()) {
      localStorage.clear();
      this.router.navigate(['/auth']);
    } else {
      console.log("logout err");
    }
  }

  handleToggel(): void {
    this.eventToggle.emit();
  }

}
