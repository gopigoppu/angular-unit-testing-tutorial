import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ResultCardComponent } from './components/result-card/result-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ScoreHeighlightDirective } from './directives/score-heighlight.directive';
import { RegisterUserComponent } from './modal/register-user/register-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    ResultCardComponent,
    UserProfileComponent,
    PageNotFoundComponent,
    ScoreHeighlightDirective,
    RegisterUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgHttpLoaderModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [NgbActiveModal],
  entryComponents: [RegisterUserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
