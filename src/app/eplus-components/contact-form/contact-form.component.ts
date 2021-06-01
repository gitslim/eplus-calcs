import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../contact.service';
import {ValidationService} from '../validation.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {

  public title = 'Форма контактов';
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
      phoneOrEmail: ['', [Validators.required, ValidationService.phoneOrEmailValidator]],
      message: ['', [Validators.required]],
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
          "Телефон или email: " + form.controls.phoneOrEmail.value + "\n" +
          "Сообщение: " + form.controls.message.value + "\n",
        }],
      };
      this.addContactSubmission(submission);
    }
  }


  addContactSubmission(obj: any) {
    this.contactService.addSubmission(obj).subscribe(res => {
        this.isSubmitted = true;
        this.successMsg = "Спасибо за обращение! Наш менеджер свяжется с вами в течение рабочего дня."
      }, error => {
        this.errorMsg = error;
        console.log(error);
      },
    )
  }
}
