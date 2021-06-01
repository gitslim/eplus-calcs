import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ContactService} from "../contact.service";
import {ValidationService} from "../validation.service";

@Component({
  selector: 'app-calc-gaz',
  templateUrl: 'calc-gaz.component.html',
  styleUrls: ['calc-gaz.component.css']
})
export class CalcGazComponent implements OnInit {

  public title = 'Калькулятор по газопроводам';
  public form: FormGroup;
  private isSubmitted: boolean = false;

  constructor(@Inject(FormBuilder) private _fb: FormBuilder, @Inject(ContactService) private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactService.setupToken();
    this.form = this._fb.group({
      type: this.initTypeFormGroup(),
      data: this.initDataFormGroup(),
      name: ['', [Validators.required]],
      phoneOrEmail: ['', [Validators.required, ValidationService.phoneOrEmailValidator]],
      result: ''
    });

    this.subscribeTypeChanges();
  }

  initDataFormGroup() {
    return this._fb.group({
      gazLen: [''],
      gazPower: ['']
    });
  }

  initTypeFormGroup() {
    const group = this._fb.group({
      projectVP: [false],
      projectV: [false],
      smrVP: [false],
      smrV: [false]
    });
    group.setValidators([ValidationService.mustChooseValidator]);
    return group;
  }

  subscribeTypeChanges() {
    const typeCtrl = (<any>this.form).controls.type;
    const changes$ = typeCtrl.valueChanges;
    changes$.subscribe(it => {
      if (it.projectVP || it.smrVP) {
        (<any>this.form).controls.data.controls.gazLen.setValidators([
          Validators.required,
          ValidationService.minValue(1),
          ValidationService.maxValue(100000)
        ]);
      } else {
        (<any>this.form).controls.type.controls.projectVP.setValidators(null);
      }
      (<any>this.form).controls.data.controls.gazLen.updateValueAndValidity();

      if (it.projectV || it.smrV) {
        (<any>this.form).controls.data.controls.gazPower.setValidators([
          Validators.required,
          ValidationService.minValue(0.4),
          Validators.maxLength(100)
        ]);
      } else {
        (<any>this.form).controls.data.controls.gazPower.setValidators(null);
      }
      (<any>this.form).controls.data.controls.gazPower.updateValueAndValidity();
    })
  }


  submitForm(): void {
    const form = <any>this.form;
    const projectVP = form.controls.type.controls.projectVP.value ? 90000 + (form.controls.data.controls.gazLen.value - 100) * 600 : 0;
    const projectV = form.controls.type.controls.projectV.value ? 80000 + (form.controls.data.controls.gazPower.value - 1) * 8000 : 0;
    const smrVP = form.controls.type.controls.smrVP.value ? 20000 * form.controls.data.controls.gazLen.value : 0;
    const smrV = form.controls.type.controls.smrV.value ? 1000000 + (form.controls.data.controls.gazPower.value - 1) * 75000 : 0;

    const result = projectVP + projectV + smrVP + smrV;
    form.controls.result.setValue(result.toLocaleString());

    if (!this.isSubmitted) {
      let submission = {
        "contact_form": [{"target_id": "feedback"}],
        "name": [{"value": form.controls.name.value}],
        // "mail": [{"value": form.controls.email.value}],
        "subject": [{"value": this.title}],
        "message": [{
          "value": this.title + "\n" +
          "Имя: " + form.controls.name.value + "\n" +
          "Телефон/email: " + form.controls.phoneOrEmail.value + "\n" +
          "Стоимость: " + form.controls.result.value + "\n"
        }]
      };
      this.addContactSubmission(submission);
    }
  }

  addContactSubmission(obj: any) {
    this.contactService.addSubmission(obj).subscribe(res => {
      this.isSubmitted = true;
    }, error => {
        console.log(error);
      }
    )
  }

}
