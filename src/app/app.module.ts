import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule }    from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { JwtModule } from "@auth0/angular-jwt";

import { AuthGuardService } from 'src/app/auth-guard.service';
import { NgOtpInputModule } from  'ng-otp-input';
import { MatGridListModule, MatMenuModule, MatFormFieldModule,MatIconModule, MatButtonModule,MatToolbarModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

import {FileUploadModule} from 'primeng/fileupload';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { OnlineCourseworkComponent } from './online-coursework/online-coursework.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { OverflowMenuComponent } from './overflow-menu/overflow-menu.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {PortalModule} from '@angular/cdk/portal';

import {MatSelectModule} from '@angular/material/select';
import {CaptchaModule} from 'primeng/captcha';



export function tokenGetter() {
  return localStorage.getItem("userToken");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    
    DashboardComponent,
   
    
    AdminConsoleComponent,
    OnlineCourseworkComponent,
    FooterComponent,
    HeaderComponent,
    OverflowMenuComponent,
    PageNotFoundComponent,
    ResetPasswordComponent,
   
   
    
   
   
    
    
  ],
  imports: [
    FileUploadModule,
    BrowserModule,
    ReactiveFormsModule ,
    HttpClientModule,
    FormsModule,
     
  
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    RouterModule,
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    OverlayModule,
     JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [],
        blacklistedRoutes: []
      }
    }),

     MatGridListModule,

     MatMenuModule,

     MatIconModule,

     MatButtonModule,

     LayoutModule,
     PortalModule,
     MatSelectModule,
     MatFormFieldModule,
     NgOtpInputModule ,
     CaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
