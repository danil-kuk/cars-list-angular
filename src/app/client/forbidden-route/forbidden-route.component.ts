import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Page to display if user tried to access forbidden route.
 */
@Component({
  selector: 'app-forbidden-route',
  templateUrl: './forbidden-route.component.html',
  styleUrls: ['./forbidden-route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForbiddenRouteComponent {
  /**
   * Create component with router.
   * @param router Router.
   */
  constructor(private router: Router) {}

  /**
   * Return to homepage.
   */
  public goToHomepage(): void {
    this.router.navigate(['/']);
  }
}
