import { Component, OnInit } from "@angular/core";
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { User } from "../../../../@core/data/users";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ali-request-password",
  templateUrl: "./request-password.component.html",
  styleUrls: ["./request-password.component.scss"],
})
export class RequestPasswordComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): UntypedFormGroup {
    return new UntypedFormGroup({
      email: new UntypedFormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern(".+@.+..+"),
      ]),
    });
  }

  submit(email: string) {
    this.authService.requestReset(email).subscribe((res) => {
      if (res) {
        this.authService.setEmailUser.next(email);
        this.toastr.success("رمز برای ایمیل شما ارسال شد'"),
          {
            timeOut: 1000,
          };
        this.router.navigate(["auth/confirm-password"]);
      } else {
        this.toastr.error("ایمیل شما موجود نمبباشد");
      }
    });
  }
}
