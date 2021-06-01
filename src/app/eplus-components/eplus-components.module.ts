import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CalcGazComponent} from "./calc-gaz/calc-gaz.component";
import {ControlMessagesComponent} from "./control-messages/control-messages.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {OrderCallComponent} from "./order-call/order-call.component";
import {ContactService} from "./contact.service";
import {ValidationService} from "./validation.service";
import {ModalModule, TabsModule} from "ng2-bootstrap";
import {CalcKotelComponent} from "./calc-kotel/calc-kotel.component";
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ModalsComponent } from './modals/modals.component';
import { CalcsComponent } from './calcs/calcs.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    TabsModule.forRoot()
  ],
  declarations: [
    ControlMessagesComponent,
    OrderCallComponent,
    CalcGazComponent,
    CalcKotelComponent,
    ContactFormComponent,
    ModalsComponent,
    CalcsComponent
  ],
  exports: [
    ControlMessagesComponent,
    OrderCallComponent,
    CalcGazComponent,
    CalcKotelComponent,
    CalcsComponent,
    ModalsComponent
  ],
  providers: [
    ContactService,
    ValidationService
  ],
})

export class EplusComponentsModule {
}
