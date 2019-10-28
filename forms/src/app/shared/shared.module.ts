import { DropdownService } from './services/dropdown.service';
import { TestDebugComponent } from './test-debug/test-debug.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    TestDebugComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    TestDebugComponent
  ],
  providers: [
    DropdownService
  ]
})
export class SharedModule { }
