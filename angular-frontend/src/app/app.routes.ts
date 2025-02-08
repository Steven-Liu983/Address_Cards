import { Routes } from '@angular/router';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { SearchListComponent } from './components/search-list/search-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cards', pathMatch: 'full' },
  { path: 'cards', component: CardsListComponent },
  { path: 'search', component: SearchListComponent },
];
