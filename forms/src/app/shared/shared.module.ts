import { DropdownService } from './services/dropdown.service';
import { TestDebugComponent } from './test-debug/test-debug.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TestDebugComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    TestDebugComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ],
})
export class SharedModule { }
