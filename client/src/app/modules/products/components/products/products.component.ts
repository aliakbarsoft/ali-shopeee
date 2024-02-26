import { Component, OnInit } from '@angular/core';
import { IProducts } from '../../../../shared/interfaces/product.interface';
import { ProductsDTO } from '../../models/products';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'ali-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  sizes = [5, 6.5, 8, 10, 5, 6];
  defualtSize = 5;
  dataProduct:IProducts[];

  public env = environment
  jalaliDate: string;
  

  colors = ['قرمز', 'آبی', 'سبز']
  defualtColor = "قرمز"

  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  defualtQuantity = 1

  constructor(private producService:ProductService) {
    const gregorianDate = moment('2024-02-24', 'YYYY-MM-DD');
    this.jalaliDate = gregorianDate.format('jYYYY/jMM/jDD');
  }

  ngOnInit(): void {
   this.producService.getProduct().subscribe((res:IProducts[])=>{
    res.forEach(product => {
      product.product_imgShow = `${environment.urlProductPic}${product.product_img}`
      debugger;
    });
    this.dataProduct = res
   })
  }

  changeSize(getSize: number): void {
    this.defualtSize = getSize;
    // this.periodChange.emit(period);
  }

  changeColor(getColor: string) {
    this.defualtColor = getColor
  }

  changeQuantity(getQuantity: number) {
  }
  createProduct(product:ProductsDTO) {
    console.log(product);

  }
}
