import { ChangeDetectionStrategy, Component, DestroyRef, Input, inject, signal } from '@angular/core';
import { PokemonDetails } from '../models/pokemon.model';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../models/response.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PokemonCardComponent {
  readonly #pokemonService = inject(PokemonService);
  readonly #destroyRef = inject(DestroyRef);

  readonly pokemonDetails = signal<PokemonDetails | null>(null);
  @Input({required:true}) set pokemon(value:Pokemon){
    this.#pokemonService.loadPokemon(value.url)
    .pipe(takeUntilDestroyed(this.#destroyRef))
    .subscribe((pokemonDetails)=>this.pokemonDetails.set(pokemonDetails))
  }
}
