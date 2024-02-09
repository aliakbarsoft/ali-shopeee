import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { IRegister } from "../../interfaces/register.dto";
import { AccountService } from "../../../../shared/services/account.service";

@Component({
  selector: "ali-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm!: UntypedFormGroup;
  showPassword = true;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  createFormGroup(): UntypedFormGroup {
    return new UntypedFormGroup({
      firstName: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new UntypedFormControl("", [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmNewPassword: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
    this.registerForm = this.createFormGroup();
  }

  getInputType() {
    if (this.showPassword) {
      return "text";
    }
    return "password";
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: (restult: IRegister) => {
        if (restult.confirmNewPassword) {
          this.toastr.success("اطلاعات شما با موفقیت ثبت شد"),
            {
              timeOut: 1000,
            };
          this.router.navigate(["auth/login"]);
        }
      },
      complete: () => {
        console.log("Register is successfully");
      },
    });

    // if (res) {
    //   this.toastr.success("اطلاعات شما با موفقیت ثبت شد"),
    //     {
    //       timeOut: 1000,
    //     };
    // }
  }
}
