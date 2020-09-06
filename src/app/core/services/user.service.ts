import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, first, tap, switchMapTo } from 'rxjs/operators';

import { UserDto } from '../dtos';
import { UserMapper } from '../mappers';
import { User, UserRole } from '../models';

import { DatabaseService } from './database.service';

const LOCAL_STORAGE_USER_KEY = 'cars-list-users';
const USERS_COLLECTION_ID = 'users';

/**
 * Service to manage app users.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /** Mapper to work with User and UserDto. */
  private readonly userMapper = new UserMapper();

  /** Get current user as BehaviorSubject. */
  private readonly currentUserValue$ = new BehaviorSubject<User>(null);

  /** Get current user as Observable. */
  public readonly currentUser$ = this.currentUserValue$.asObservable();

  /**
   * Create service to manage users.
   * @param databaseService Database service.
   * @param router Router.
   */
  constructor(
    private databaseService: DatabaseService,
    private router: Router,
  ) {
    const raw = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (raw) {
      const user = JSON.parse(raw);
      this.currentUserValue$.next(user);
    }
  }

  /**
   * Login user with passed email and password.
   * @param email User email.
   * @param password User password.
   */
  public login(email: string, password: string): Observable<User> {
    return this.getUsers().pipe(
      map((users) =>
        users.find((user) => user.email === email && user.password === password),
      ),
      map((user) => this.setCurrentUser(user)),
    );
  }

  /**
   * Set passed user as current and add it to localStorage.
   * @param user User to set as current.
   */
  private setCurrentUser(user: User): User {
    if (user) {
      this.currentUserValue$.next(user);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
      return user;
    }
  }

  /**
   * Check if current user is Admin.
   */
  public isCurrentUserAdmin(): Observable<boolean> {
    return this.currentUserValue$.pipe(map((user) => user?.role === UserRole.Admin));
  }

  /**
   * Current user logout.
   */
  public logout(): void {
    this.currentUserValue$.next(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    this.router.navigate(['/']);
  }

  /**
   * Get all users.
   */
  public getUsers(): Observable<User[]> {
    return this.databaseService
      .getAllItems(USERS_COLLECTION_ID)
      .pipe(
        map((items: UserDto[]) =>
          items.map((dto) => this.userMapper.fromDto(dto)),
        ),
      );
  }

  /**
   * Add new user to database.
   * @param user New user.
   */
  public addNewUser(user: User): Observable<void> {
    const dto = this.userMapper.toDto(user);
    return this.databaseService.postItem(USERS_COLLECTION_ID, dto);
  }

  /**
   * Update passed user data.
   * @param user User to update.
   */
  public updateUser(user: User): Observable<void> {
    const dto = this.userMapper.toDto(user);
    const updateItem$ = this.databaseService.updateItem(
      USERS_COLLECTION_ID,
      dto,
    );
    return this.currentUserValue$.pipe(
      first(),
      tap((currentUser) => {
        if (currentUser.id === user.id) {
          this.setCurrentUser(user);
        }
      }),
      switchMapTo(updateItem$),
    );
  }

  /**
   * Delete user from database by id.
   * @param userId Id of user to delete.
   */
  public deleteUser(userId: string): Observable<void> {
    return this.databaseService.deleteItem(USERS_COLLECTION_ID, userId);
  }
}
