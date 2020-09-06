import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { UserService } from './user.service';

/**
 * Service to manage logged users app routes access.
 */
@Injectable({
  providedIn: 'root',
})
export class PreventLoggedAccessGuard implements CanActivate {
  /**
   * Create service to manage logged users routes access.
   * @param userService Service to manage users.
   * @param router Router.
   */
  constructor(private userService: UserService, private router: Router) {}

  /**
   * Check if logged user can access route.
   */
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userService.currentUser$.pipe(
      first(),
      map((user) => (user ? this.router.createUrlTree(['/']) : true)),
    );
  }
}
