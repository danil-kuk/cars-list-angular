import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserRole, User } from 'src/app/core/models';
import { UserService } from 'src/app/core/services';

/**
 * User editor component.
 */
@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditorComponent implements OnInit, OnDestroy {
  /** User roles. */
  public readonly userRoles = UserRole;

  /** RxJS Subject to destroy all subscriptions. */
  private readonly destroy$ = new Subject<void>();

  /** Form to edit user data. */
  public userEditorForm: FormGroup;

  /**
   * Create user editor component.
   * @param userService Service to manage users.
   * @param formBuilder User editor form builder.
   * @param dialogRef Dialog ref.
   * @param userData User to edit.
   */
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private userData: User,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.mapUserToEditorForm(this.userData);
  }

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Insert passed user data into editor form.
   * If no data is passed it will create an empty form.
   * @param user User data to insert into form.
   */
  private mapUserToEditorForm(user?: User): void {
    this.userEditorForm = this.formBuilder.group({
      name: [user?.name, Validators.required],
      role: [user?.role, Validators.required],
      email: [user?.email, [Validators.email, Validators.required]],
      password: [user?.password, Validators.required],
      id: [user?.id],
    });
  }

  /**
   * Handle from submit.
   */
  public handleFormSubmit(): void {
    const userInForm: User = this.userEditorForm.value;
    const user: User = {
      ...userInForm,
    };
    if (user.id) {
      this.userService
        .updateUser(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.dialogRef.close(user));
    } else {
      this.userService
        .addNewUser(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.dialogRef.close(user);
        });
    }
  }
}
