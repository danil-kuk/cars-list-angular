import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap, first, switchMapTo } from 'rxjs/operators';
import { User, UserRole } from 'src/app/core/models';
import { UserService } from 'src/app/core/services';

import { UserEditorComponent } from '../user-editor/user-editor.component';

/**
 * Component to display users.
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, OnDestroy {
  /** Users data source observable. */
  public usersDataSource$: Observable<MatTableDataSource<User>>;

  /** RxJS Subject to destroy all subscriptions. */
  private readonly destroy$ = new Subject<void>();

  /** Columns that will be displayed in table. */
  public readonly displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'role',
    'actions',
  ];

  /** Enum type to parse. */
  public readonly enumToParse = UserRole;

  /** Table data pagination. */
  @ViewChild(MatPaginator)
  public readonly paginator: MatPaginator;

  /** Table data sorting. */
  @ViewChild(MatSort)
  public readonly sort: MatSort;

  /**
   * Create component for displaying users.
   * @param userService Service to manage users.
   * @param dialog Dialog where editor form is displayed.
   */
  constructor(private userService: UserService, private dialog: MatDialog) {}

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.initUsersDataSource();
  }

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Get users data from server and save it to cache.
   */
  private initUsersDataSource(): void {
    this.usersDataSource$ = this.userService.getUsers().pipe(
      map((users) => {
        const data = new MatTableDataSource<User>(users);
        data.sort = this.sort;
        data.paginator = this.paginator;
        return data;
      }),
    );
  }

  /**
   * Open dialog with user editor form.
   */
  public openDialog(selectedUser?: User): void {
    const dialogRef = this.dialog.open(UserEditorComponent, {
      width: '600px',
      data: selectedUser,
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe();
  }

  /**
   * Delete user from list by id.
   * @param userId Id of user to delete.
   */
  public deleteUser(userId: string): void {
    this.userService
      .deleteUser(userId)
      .pipe(
        switchMapTo(this.userService.currentUser$),
        first(),
        tap((user) => {
          if (userId === user.id) {
            this.userService.logout();
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
