import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePaletteComponent } from './components/app/dashboard/create-palette/create-palette.component';
import { PaletteExamplesComponent } from './components/app/dashboard/create-palette/palette-examples/palette-examples.component';
import { DashboardComponent } from './components/app/dashboard/dashboard.component';
import { SavedPalettesComponent } from './components/app/dashboard/saved-palettes/saved-palettes.component';
import { SigninComponent } from './components/app/signin/signin.component';
import { SignupComponent } from './components/app/signup/signup.component';
import { AppButtonComponent } from './components/ui/app-button/app-button.component';
import { AppInputComponent } from './components/ui/app-input/app-input.component';
import { AppPaletteComponent } from './components/ui/app-palette/app-palette.component';
import { AppSpinnerComponent } from './components/ui/app-spinner/app-spinner.component';
import { AppSwitchComponent } from './components/ui/app-switch/app-switch.component';
import { AppModalComponent } from './components/ui/modal/modal.component';
import { NotificationsComponent } from './components/ui/notifications/notifications.component';
import { PaletteGeneratorInputComponent } from './components/ui/palette-generator-input/palette-generator-input.component';
import './extensions/formControlExtensions';
import './extensions/formGroupExtensions';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { SignatureComponent } from './components/ui/signature/signature.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PaletteGeneratorInputComponent,
    AppSwitchComponent,
    AppModalComponent,
    SignupComponent,
    SigninComponent,
    AppButtonComponent,
    AppInputComponent,
    AppSpinnerComponent,
    NotificationsComponent,
    CreatePaletteComponent,
    SavedPalettesComponent,
    AppPaletteComponent,
    PaletteExamplesComponent,
    SignatureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
