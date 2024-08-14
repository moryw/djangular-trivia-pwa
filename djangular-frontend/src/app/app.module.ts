import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule } from '@angular/material/toolbar'
import { TriviaComponent } from './trivia/trivia.component'
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms"
import { MatRadioModule } from "@angular/material/radio"
import { MatButtonModule } from "@angular/material/button"
import { MatSelectModule } from '@angular/material/select'
import { ServiceWorkerModule } from '@angular/service-worker'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MaterialComponent } from './material/material.component'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatGridListModule } from '@angular/material/grid-list'

@NgModule({
  declarations: [
    AppComponent,
    TriviaComponent,
    MaterialComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'trivia', component: TriviaComponent },
      { path: 'material', component: MaterialComponent }
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    MatRadioModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
