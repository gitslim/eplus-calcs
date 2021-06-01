import {Component, OnInit, Inject} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ContactService} from "../contact.service";
import {ValidationService} from "../validation.service";

@Component({
  selector: 'app-calc-kotel',
  templateUrl: 'calc-kotel.component.html',
  styleUrls: ['calc-kotel.component.css']
})
export class CalcKotelComponent implements OnInit {

  public title = 'Калькулятор по котельным';
  public form: FormGroup;
  private isSubmitted: boolean = false;

  constructor(@Inject(FormBuilder) private _fb: FormBuilder, @Inject(ContactService) private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactService.setupToken();
    this.form = this._fb.group({
      buildType: ['novo', [Validators.required]],
      power: ['', [Validators.required, ValidationService.minValue(0.4), ValidationService.maxValue(100)]],
      eqType: ['impo', [Validators.required]],
      workType: this.initWorkTypeFormGroup(),
      name: ['', [Validators.required]],
      phoneOrEmail: ['', [Validators.required, ValidationService.phoneOrEmailValidator]],
      result: ''
    });
  }

  initWorkTypeFormGroup() {
    const group = this._fb.group({
      isProject: [true],
      isMontazh: [true]
    });
    group.setValidators([ValidationService.mustChooseValidator]);
    return group;
  }

  submitForm(): void {
    const form = <any>this.form;
    const power = parseFloat(form.controls.power.value);
    const buildType = form.controls.buildType.value;
    const eqType = form.controls.eqType.value;
    const isProject = form.controls.workType.controls.isProject.value;
    const isMontazh = form.controls.workType.controls.isMontazh.value;

    let result = 0;

    if (power < 1) {
      if (buildType == 'novo' || buildType == 'reco') {
        if (isProject)
          result += 750000;
        if (isMontazh) {
          if (eqType == 'impo') {
            result += power * 8000000;
          } else {
            result += power * 7500000;
          }
        }
      } else if (buildType == 'pere') {
        if (isProject)
          result += 600000;
        if (isMontazh) {
          if (eqType == 'impo') {
            result += power * 6500000;
          } else {
            result += power * 6000000;
          }
        }
      }
    } else if (power < 3) {
      if (buildType == 'novo' || buildType == 'reco') {
        if (isProject)
          result += 1200000;
        if (isMontazh) {
          if (eqType == 'impo') {
            result += power * 7500000;
          } else {
            result += power * 7000000;
          }
        }
      } else if (buildType == 'pere') {
        if (isProject)
          result += 960000;
        if (isMontazh) {
          if (eqType == 'impo') {
            result += power * 6000000;
          } else {
            result += power * 5600000;
          }
        }
      }
    } else if (power < 7) {
      if (buildType == 'novo' || buildType == 'reco') {
        if (isProject)
          result += 1900000;
        if (isMontazh) {
          if (eqType == 'impo') {
            result += power * 6500000;
          } else {
            result += power * 6000000;
          }
        }
      } else if (buildType == 'pere') {
        if (isProject)
          result += 1520000;
        if (isMontazh) {
          if (eqType == 'impo') {
            result += power * 5200000;
          } else {
            result += power * 5000000;
          }
        }
      }
    } else if (power < 12) {
      if (buildType == 'novo' || buildType == 'reco') {
        if (isProject)
          result += 2700000;
        if (isMontazh) {
          if (eqType == 'impo') {
            result += power * 5500000;
          } else {
            result += power * 5000000;
          }
        }
      } else if (buildType == 'pere') {
        if (isProject)
          result += 2160000;
        if (isMontazh) {
          if (eqType == 'impo') {
            result += power * 4500000;
          } else {
            result += power * 4000000;
          }
        }
      }
    } else if (power < 20) {
      if (buildType == 'novo' || buildType == 'reco') {
        if (isProject)
          result += 3500000;
        if (isMontazh) {
          if (eqType == 'impo') {
            result += power * 4500000;
          } else {
            result += power * 4000000;
          }
        }
      } else if (buildType == 'pere') {
        if (isProject)
          result += 2800000;
        if (isMontazh) {
          if (eqType == 'impo') {
            result += power * 3600000;
          } else {
            result += power * 3200000;
          }
        }
      }
    } else {
      if (buildType == 'novo' || buildType == 'reco') {
        if (isProject)
          result += power * 160000;
        if (isMontazh) {
          if (eqType == 'impo') {
            result += power * 3500000;
          } else {
            result += power * 3100000;
          }
        }
      } else if (buildType == 'pere') {
        if (isProject)
          result += power * 140000;
        if (isMontazh) {
          if (eqType == 'impo') {
            result += power * 3000000;
          } else {
            result += power * 2500000;
          }
        }
      }
    }

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
    this.contactService.addSubmission(obj).subscribe(responseText => {
      this.isSubmitted = true;
    })
  }

}
