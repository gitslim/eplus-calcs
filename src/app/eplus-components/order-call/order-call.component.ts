import {Component, OnInit, Inject} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ContactService} from "../contact.service";
import {ValidationService} from "../validation.service";


@Component({
  selector: 'app-order-call',
  templateUrl: 'order-call.component.html',
  styleUrls: ['order-call.component.css']
})
export class OrderCallComponent implements OnInit {

  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';
  // @HostBinding('style.width') width = '100%';
  // @HostBinding('style.height') height = '100%';
  // @HostBinding('style.z-index') zindex = '10000';

  public title = 'Обратный звонок';
  public form: FormGroup;
  private isSubmitted: boolean = false;
  public successMsg: string = '';
  public errorMsg: string = '';

  constructor(@Inject(FormBuilder) private _fb: FormBuilder,
              @Inject(ContactService) private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactService.setupToken();
    this.form = this._fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, ValidationService.phoneValidator]]
    });
  }

  submitForm(): void {
    const form = <any>this.form;

    if (!this.isSubmitted) {
      let submission = {
        "contact_form": [{"target_id": "feedback"}],
        "name": [{"value": form.controls.name.value}],
        "subject": [{"value": this.title}],
        "message": [{
          "value": this.title + "\n" +
          "Имя: " + form.controls.name.value + "\n" +
          "Телефон: " + form.controls.phone.value + "\n"
        }]
      };
      this.addContactSubmission(submission);
    }
  }


  addContactSubmission(obj: any) {
    this.contactService.addSubmission(obj).subscribe(res => {
        this.isSubmitted = true;
        this.successMsg = "Спасибо за обращение! Мы перезвоним вам в ближайшее время."
      }, error => {
        this.errorMsg = error;
        console.log(error);
      }
    )
  }
}
