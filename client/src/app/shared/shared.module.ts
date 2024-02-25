import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilePickerModule } from "ngx-awesome-uploader";
import { NbButtonModule, NbInputModule, NbSelectModule } from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SpliceNumberDirective } from "./directives/splice-number.directive";
import { PersianNumberDirective } from './directives/persian-number.directive';
import { UploaderComponent } from "./components/uploader/uploader.component";
import {MatMenuModule} from '@angular/material/menu';
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from "@angular/material/button";
import { SplicNumberCommaDirective } from './directives/splic-number-comma.directive';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
  declarations: [
    SpliceNumberDirective,
    PersianNumberDirective,
    UploaderComponent,
    SplicNumberCommaDirective,
    DatePickerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FilePickerModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  exports: [
    SpliceNumberDirective,
    PersianNumberDirective,
    SplicNumberCommaDirective

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
