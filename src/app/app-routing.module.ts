import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePaletteComponent } from './components/app/dashboard/create-palette/create-palette.component';
import { DashboardComponent } from './components/app/dashboard/dashboard.component';
import { SavedPalettesComponent } from './components/app/dashboard/saved-palettes/saved-palettes.component';
import { SigninComponent } from './components/app/signin/signin.component';
import { SignupComponent } from './components/app/signup/signup.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'app',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'create', pathMatch: 'full' },

      {
        path: 'create',
        component: CreatePaletteComponent,
      },
      {
        path: 'saved',
        component: SavedPalettesComponent,
      },
    ],
  },
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: '**', redirectTo: 'app' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
