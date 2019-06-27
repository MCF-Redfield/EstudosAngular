import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateFormComponent } from './template-form.component';
import { TestDebugComponent } from '../test-debug/test-debug.component';

@NgModule({
  declarations: [
    TemplateFormComponent,
    TestDebugComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TemplateFormModule { }
