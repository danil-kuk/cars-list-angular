import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { UserService } from 'src/app/core/services';

/**
 * Login component.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  /** Login form. */
  public loginForm: FormGroup;

  /** Url where user will be redirected after login. */
  private redirectUrl: string;

  /** Form validation error. */
  public readonly formValidationError$ = new BehaviorSubject<string>(null);

  /** RxJS Subject to destroy all subscriptions. */
  private readonly destroy$ = new Subject<void>();

  /**
   * Create Login component.
   * @param userService Service to manage user auth.
   * @param formBuilder Login form builder.
   * @param router Router.
   * @param route Activated route.
   */
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.createLoginForm();
    this.route.queryParamMap.subscribe((params) => {
      this.redirectUrl = params.get('redirectUrl');
    });
  }
  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Create user login form.
   */
  private createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
    this.loginForm.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe(() => this.formValidationError$.next(null));
  }

  /**
   * Login form submit actions.
   */
  public onSubmit(): void {
    const userCredentials = this.loginForm.value;
    this.userService
      .login(userCredentials.email, userCredentials.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.redirectUrl
            ? this.router.navigateByUrl(this.redirectUrl)
            : this.router.navigate(['/']);
        } else {
          this.formValidationError$.next('Invalid email or password!');
        }
      });
  }
}
