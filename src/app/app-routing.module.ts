import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRecordService } from './resolvers/user-record.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: SearchBarComponent },
  {
    path: 'user/:userid',
    component: UserProfileComponent,
    resolve: { items: UserRecordService }
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
