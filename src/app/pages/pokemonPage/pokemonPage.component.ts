import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemons.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-page',
  imports: [
    CommonModule
  ],
  templateUrl: './pokemonPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {

    pokemon = signal<Pokemon | null>(null)
    private pokemonService = inject(PokemonsService);
    private activatedRoute = inject(ActivatedRoute);
    private title = inject(Title)
    private meta = inject(Meta)

    ngOnInit(): void {

        const id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
        if (!id) return;

        this.pokemonService.loadPokemon(id)
            .pipe(
                tap( ({id, name}) => {

                    const pageTitle = `Pokemon #${id} ${name}`;

                    this.title.setTitle(pageTitle)
                    this.meta.updateTag({ name: 'description', content: `Pagina del Pokemon ${name}` })
                    this.meta.updateTag({ name: 'og:title', content: pageTitle })
                    this.meta.updateTag({ name: 'og:description', content: `Pagina del Pokemon ${name}` })
                    this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` })
                })
            )
            .subscribe(this.pokemon.set)

    }

}
