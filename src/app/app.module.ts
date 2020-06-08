import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule }    from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { JwtModule } from "@auth0/angular-jwt";
import { TestComponent } from './test/test.component';
import { AuthGuardService } from 'src/app/auth-guard.service';

import { MatGridListModule, MatMenuModule, MatIconModule, MatButtonModule,MatToolbarModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { OnlineCourseworkComponent } from './online-coursework/online-coursework.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { OverflowMenuComponent } from './overflow-menu/overflow-menu.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';





export function tokenGetter() {
  return localStorage.getItem("userToken");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    TestComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    
    AdminConsoleComponent,
    OnlineCourseworkComponent,
    FooterComponent,
    HeaderComponent,
    OverflowMenuComponent,
    PageNotFoundComponent,
   
    
    
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
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
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
