import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models';
import { UserService } from 'src/app/core/services';

/**
 * Toolbar component to display navigation buttons.
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  /** Get current user as Observable. */
  public get currentUser$(): Observable<User> {
    return this.userService.currentUser$;
  }

  /** Check if user is Admin. */
  public get isAdmin$(): Observable<boolean> {
    return this.userService.isCurrentUserAdmin();
  }

  /**
   * Create navigation toolbar.
   * @param userService Service to manage user.
   */
  constructor(private userService: UserService) {}

  /**
   * Logout current user.
   */
  public onLogout(): void {
    this.userService.logout();
  }
}
