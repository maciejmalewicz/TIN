import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() items: Array<any>;
  @Input() getName: Function;
  @Input() createNew: Function;

  @Output() itemChange = new EventEmitter();

  constructor() { }

  selectedItem: number = -1;

  ngOnInit(): void {
  }

  selectItem(n: number){
    if (n < this.items.length){
      this.itemChange.emit(this.items[n]);
    } else {
      this.selectNew();
    }
    this.selectedItem = n;
  }

  private selectNew(){
    let newObject = this.createNew.call(null);
    this.itemChange.emit(newObject);
  }

  isSelected(n: number){
    return n == this.selectedItem;
  }

  reset(){
    this.selectedItem = -1;
    this.itemChange.emit(null);
  }

}
