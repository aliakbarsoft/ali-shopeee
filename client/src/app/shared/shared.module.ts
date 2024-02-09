import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilePickerModule } from "ngx-awesome-uploader";
import { NbButtonModule, NbInputModule, NbSelectModule } from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SpliceNumberDirective } from "./directives/splice-number.directive";
import { PersianNumberDirective } from './directives/persian-number.directive';
import { UploaderComponent } from "./components/uploader/uploader.component";

@NgModule({
  declarations: [
    SpliceNumberDirective,
    PersianNumberDirective,
    UploaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FilePickerModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
  ],
  exports: [
    SpliceNumberDirective,
    PersianNumberDirective,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
