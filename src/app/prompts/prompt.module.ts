import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from '../material/material.module';
import { PromptsComponent } from './prompts/prompts.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule, CustomMaterialModule, FormsModule],
  declarations: [PromptsComponent],
})
export class PromptModule {}
