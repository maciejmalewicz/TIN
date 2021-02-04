import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  @ViewChild("content") modal: TemplateRef<any>;

  ngOnInit(): void {
  }

  open() {
    this.modalService.open(this.modal, {ariaLabelledBy: 'modal-basic-title'});
  }

}
