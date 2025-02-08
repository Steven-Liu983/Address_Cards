import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardService } from "../../services/card.service";
import { Card } from '../../model/card.model';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatTabsModule],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.css'
})
export class CardsListComponent implements OnInit {
  cards!: Card[];
  card: Card = new Card();
  private num = 1;
  delBtn: boolean = true;
  isValid: boolean = true;
  address: Array<string> = [];
  results!: Card[];
  search = '';

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData(): void {
    this.cardService.getCardsList()
    .subscribe(cards => this.cards = cards);
  }

  newCard(): void {
    this.card = new Card();
  }

  addLine() {
    this.num += 1;
    let fline = <HTMLInputElement>document.getElementById('fline');
    let newline = <HTMLInputElement>document.createElement('div');
    newline.setAttribute('class','form-group row');
    newline.setAttribute('id', 'div'+this.num.toString());
    newline.innerHTML = "<label class='col-auto col-form-label' for='line" + this.num + "'><strong>Line " + this.num + "&nbsp;</strong></label><div class='col-md-9'><input type='text' class='form-control' id='line" + this.num + "' name='line" + this.num + "' minlength='2' style='margin-bottom: 10px' required></div>";
    fline.appendChild(newline);
  }

  delLine() {
    if (this.num < 2) {
      alert('There is only one address line');
    } else {
      let dline = <HTMLInputElement>document.getElementById('div'+this.num);
      dline.remove();
      this.num -= 1;
    }
  }

  save() {
    this.card.address = this.address;
    this.cardService.createCard(this.card)
    .subscribe({
      next: (data) => {
        console.log(data)
        this.card = new Card();
        location.reload();
      }, 
      error: (e) => console.log(e)
    });
  }

  addSubmit() {
    this.isValid = true;
    this.address = [];
    for(let i=1; i<=this.num; i++) {
      let line = <HTMLInputElement>document.getElementById('line'+i);
      if (line.value.length >= 2) {
        this.address.push(line.value);
      } else {
        this.isValid = false;
      }
    }
    if (this.isValid == false) {
      alert('Please enter a valid address');
    } else {
      this.save();
    }
  }

  updateCard(_id: any, size: number) {
    this.isValid = true;
    this.address = [];
    for(let i=0; i<size; i++) {
      let adr = (<HTMLInputElement>document.getElementById('adr'+i+_id));
      if (adr.value.length >= 2) {
        this.address.push(adr.value);
      } else {
        this.isValid = false;
      }
    }
    
    if (this.isValid == false) {
      alert('Please enter a valid address');
    } else {
      let addr = {"address": this.address};
      this.cardService.updateCard(_id, addr)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.card = new Card();
            this.reloadData();
            alert('The address has been updated');
          }, 
          error: (e) => console.log(e)
      });
    }
  }

  deleteCard(_id: any) {
    if (confirm('Are you sure you want to delete this address card?')) {
      this.cardService.deleteCard(_id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.reloadData();
        },
        error: (e) => console.log(e)
      });
    }
  }

  searchAddress() {
    this.cardService.findByAddress(this.search)
    .subscribe({
      next: (data) => {
        if (data.length < 1) {
          alert('The address cards cannot be found')
        } else {
          this.results = data;
          console.log(data)
        }
      }, 
      error: (e) => console.log(e)
    });
  }

  searchSubmit() {
    if (this.search.length < 1) {
      alert('Please enter a valid address');
    } else {
      this.searchAddress();
    }
  }
}
