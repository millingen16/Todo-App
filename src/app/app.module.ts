import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

const routes: Routes = [
  { path: ':status', component: TaskComponent },
  { path: '**', redirectTo: '/all' }
];

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent
  ],
  imports: [
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    [RouterModule.forRoot(
      routes
    )]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
