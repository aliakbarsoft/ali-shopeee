import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { IProducts } from "../../interfaces/product.interface";
import { UploaderService } from "../../services/uploader.service";
import { ICategories } from "../../interfaces/uploader.interface";

@Component({
  selector: "ali-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"],
})
export class UploaderComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  form: UntypedFormGroup;
  data: ICategories[] = [
    { id: 1, brand: "لباس" },
    { id: 2, brand: "کفش" },
  ];
  itemSelected: ICategories;
  selectedValue: any;
  type = "select";
  file: File | null = null;
  imageUrl = "";
  fileToUpload;

  constructor(
    private uploadService: UploaderService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      product_name: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      imgUpload: new FormControl("", Validators.required),
    });
  }

  onChange(event: any) {
    const files = event.target.files;
    this.fileToUpload = event.target.files[0];
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);

    if (files) {
      this.status = "initial";
      this.file = files;
    }
  }

  onUpload() {
    if (this.file) {
      // const formData: FormData = new FormData();
      // const fileToUpload = this.file[0] as File;
      // const formData = new FormData();
      // formData.append('file', fileToUpload, fileToUpload.name);

      // formData.append("image", this.file, this.file.name);
      const upload$ = this.uploadService.uploadImage(this.file);
      this.status = "uploading";
      upload$.subscribe({
        next: () => {
          this.status = "success";
        },
        error: (error: any) => {
          this.status = "fail";
          return throwError(() => error);
        },
      });
    }
  }

  onSelectStatus(formData: IProducts): void {
    if (formData) {
      this.uploadService.addProducts(formData);
    }
  }

  submit(formData: IProducts) {
    if (!formData) {
      this.toastService.error("Not added!");
    } else {
      this.uploadService.addProducts(formData);
    }
  }
}
