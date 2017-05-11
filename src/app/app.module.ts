import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CommentsComponent } from './comments/comments.component';
import { FormForCommentComponent } from './form-for-comment/form-for-comment.component';
import {DataService} from './_shared/data.service';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    FormForCommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
