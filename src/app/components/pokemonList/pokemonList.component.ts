import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardComponent } from "../pokemonCard/pokemonCard.component";
import { SimplePokemon } from '../../pokemons/interfaces/pokemons.interface';

@Component({
  selector: 'pokemon-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemonList.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {

    public pokemons = input.required<SimplePokemon[]>();

 }
