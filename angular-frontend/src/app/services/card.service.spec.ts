import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardService } from './card.service';

describe('ServiceComponent', () => {
  let component: CardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardService]
    })
    .compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
