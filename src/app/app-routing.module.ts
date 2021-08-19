import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './layouts/auth/auth.module';
import { HomeModule } from './layouts/home/home.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/auth/auth.module').then(m => AuthModule), 
  },
  {
    path: 'home',
    loadChildren: () => import('./layouts/home/home.module').then(m => HomeModule),
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
