import {BrowserModule} from "@angular/platform-browser";
import {NgModule, ApplicationRef} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {RouterModule, Routes, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {EplusComponentsModule} from "./eplus-components/eplus-components.module";
import {CalcGazComponent} from "./eplus-components/calc-gaz/calc-gaz.component";
import {CalcKotelComponent} from "./eplus-components/calc-kotel/calc-kotel.component";
import {ModalModule} from "ng2-bootstrap";
import {ModalsComponent} from "./eplus-components/modals/modals.component";
import {CalcsComponent} from "./eplus-components/calcs/calcs.component";
import {ContactFormComponent} from "./eplus-components/contact-form/contact-form.component";

const appRoutes: Routes = [
  {
    path: 'modal/:what',
    component: ModalsComponent,
    // outlet: 'modal'
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {useHash: true}
    ),
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    EplusComponentsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  entryComponents: [AppComponent, CalcKotelComponent, CalcGazComponent, CalcsComponent, ContactFormComponent],
  // bootstrap: [AppComponent, CalcKotelComponent, CalcGazComponent]
})
export class AppModule {
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

  public ngDoBootstrap(appRef: ApplicationRef) {
    let components = [AppComponent, CalcKotelComponent, CalcGazComponent, CalcsComponent, ContactFormComponent];
    for (let component of components) {
      try {
        // console.log('bootstraping component', component);
        appRef.bootstrap(component);
      } catch (e) {
        // console.log('component bootstrap failed', component, e);
      }
    }
  }
}


