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

import { User } from '../models';

import { UserService } from './user.service';

/**
 * Service to manage user access to app routes.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   * Create service that helps manage user access to app routes.
   * @param router Roter.
   * @param userService Service to manage users.
   */
  constructor(private router: Router, private userService: UserService) {}

  /**
   * Check if user can access route.
   * @param route Route.
   * @param state Route state.
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // By default if user not logged redirect him to login page with the redirect url.
    const loginRoute = this.router.createUrlTree(['/login'], {
      queryParams: { redirectUrl: state.url },
    });
    return this.userService.currentUser$.pipe(
      first(),
      map((user) =>
        user ? this.checkCurrentUserPermission(route, user) : loginRoute,
      ),
    );
  }

  /**
   * Check if route is restricted by role.
   * @param route Route.
   * @param currentUser Current user.
   */
  private checkCurrentUserPermission(
    route: ActivatedRouteSnapshot,
    currentUser: User,
  ): boolean | UrlTree {
    if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
      // Role not authorised so redirect to page with error message.
      return this.router.createUrlTree(['/forbidden']);
    }
    // User is logged in so return true.
    return true;
  }
}
