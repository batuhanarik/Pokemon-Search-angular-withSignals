import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { CommonModule,} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  private readonly pokemonService = inject(PokemonService);

  readonly pokemons = this.pokemonService.searchResults;
  readonly loading = this.pokemonService.loading;
  readonly searchQuery = this.pokemonService.searchQuery;
  ngOnInit(): void {
    this.search("");
  }

  search(query:string){
    this.pokemonService.searchQuery.set(query);
  }
}
