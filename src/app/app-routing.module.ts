import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { DetailsComponent } from './details/details.component';
import { SessionGuard } from './session-guard.service';
import { HelpComponent } from './help.component';
import { CastComponent } from './cast/cast.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'cast/:id', component: CastComponent },
  { path: 'user',  canActivate: [SessionGuard],component: UserComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
