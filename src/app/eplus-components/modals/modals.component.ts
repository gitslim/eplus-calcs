import {Component, OnInit, ViewChild, AfterViewInit} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit, AfterViewInit {

  @ViewChild('modal') public modal: ModalDirective;
  what: string;
  title: string;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // console.log(this.route.pathFromRoot);
    this.route.params.subscribe((params: {what: string}) => {
      // console.log('params.what', params.what);
      this.what = params.what;
    });
  }

  ngAfterViewInit() {
    if (this.what == 'calcs') {
      this.title = "Калькуляторы";
    } else if (this.what == 'calc-gaz') {
      this.title = 'Расчет стоимости газопровода';
    } else if (this.what == 'calc-kotel') {
      this.title = 'Расчет стоимости котельной';
    } else if (this.what == 'order-call') {
      this.title = 'Заказать звонок';
    } else if (this.what == 'contact-form') {
      this.title = 'Отправить сообщение';
    } else {
      return;
    }
    this.modal.show();
  }


  hideBackdrop() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    // this.router.navigate([{outlets: {modal: null}}]);
    this.router.navigate(['/']);
  }
}
