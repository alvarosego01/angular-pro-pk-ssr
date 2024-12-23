import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../pokemons/interfaces/pokemons.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-card',
  imports: [
    RouterLink
  ],
  templateUrl: './pokemonCard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {

    pokemon = input.required<SimplePokemon>();

    // señal computada
    public readonly pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png` )

    // Cada vez qye haya un cambio en la señal habra´un cambio por el logeffect
    // logEffect = effect(() => {
    //     console.log(this.pokemon());
    // })

}
