import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarsListComponent } from './client/cars-list/cars-list.component';
import { ForbiddenRouteComponent } from './client/forbidden-route/forbidden-route.component';
import { LoginComponent } from './client/login/login.component';
import { UserRole } from './core/models';
import { AuthGuard, PreventLoggedAccessGuard } from './core/services';

/**
 * App routes.
 */
const routes: Routes = [
  { path: 'cars', component: CarsListComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PreventLoggedAccessGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    data: { roles: [UserRole.Admin] },
    canActivate: [AuthGuard],
  },
  {
    path: 'forbidden',
    component: ForbiddenRouteComponent,
  },
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: '**', redirectTo: '/cars' },
];

/**
 * App routing module.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
