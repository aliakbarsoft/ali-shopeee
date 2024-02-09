import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { IProducts } from "../interfaces/product.interface";

@Injectable({
  providedIn: "root",
})
export class UploaderService {
  constructor(private http: HttpClient, private toastService: ToastrService) {}

  uploadImage(file: File) {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    return this.http.post(`${environment.Baseurl}uploadImage`, formData);
  }

  addProducts(product: IProducts):Observable<IProducts> {
    if (!product) {
      this.toastService.error("No category selected!");
      console.error("No category selected");
      return;
    }

    const payload = {
      product_name: product.product_name,
      price: product.price,
      description: product.description,
    };
    this.http.post(environment.Baseurl + "products", payload).subscribe((res)=>{
      this.toastService.success('محصول شما با موفقیت ثبت شد')
    });
  }

  createProducts(formData: any) {}
}
