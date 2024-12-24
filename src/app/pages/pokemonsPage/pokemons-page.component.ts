import { ApplicationRef, ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from '../../components/pokemonList/pokemonList.component';
import { PokemonListSkeletonComponent } from "./ui/pokemonListSkeleton/pokemonListSkeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/pokemons.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { toSignal } from "@angular/core/rxjs-interop";
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'pokemons-page',
    imports: [
        PokemonListComponent,
        PokemonListSkeletonComponent,
        RouterLink
    ],
    templateUrl: './pokemons-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent  {

    // public isLoading = signal(true);
    // private appReef = inject(ApplicationRef);
    // private $appsTate = this.appReef.isStable.subscribe((isStable) => {
    //     console.log(isStable);
    //  })

    private pokemonsService = inject(PokemonsService);
    public pokemons = signal<SimplePokemon[]>([]);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private title = inject(Title);

    public currentPage = toSignal<number>(
        this.route.params.pipe(
            map(params => params['page'] ?? '1'),
            map(page => (isNaN(+page) ? 1 : +page)),
            map(page => Math.max(1, page)
            )
        )
    )

    public loadOnPageChanged = effect(() => {
        // console.log('pagina cambio', this.currentPage());
        this.loadPokemons(this.currentPage());
    });

    // ngOnInit(): void {

    //     // setTimeout(() => {

    //     //     this.isLoading.set(false);

    //     // }, 5500);

    //     // this.loadPokemons();

    // }

    public loadPokemons(page: number = 0) {


        this.pokemonsService.loadPage(page)
            .pipe(
                // tap( () => this.router.navigate([], {queryParams: {
                //     page: page.toString()
                // }}) ),
                tap(() => this.title.setTitle(`Pokemons - Page ${page}`))
            )
            .subscribe((pokemons) => {
                this.pokemons.set(pokemons);
            });

    }


}
