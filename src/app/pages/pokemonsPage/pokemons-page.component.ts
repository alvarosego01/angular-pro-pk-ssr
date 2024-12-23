import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from '../../components/pokemonList/pokemonList.component';
import { PokemonListSkeletonComponent } from "./ui/pokemonListSkeleton/pokemonListSkeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/pokemons.interface';
import { ActivatedRoute, Router } from '@angular/router';

import { toSignal } from "@angular/core/rxjs-interop";
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'pokemons-page',
    imports: [PokemonListComponent, PokemonListSkeletonComponent],
    templateUrl: './pokemons-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {

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
        this.route.queryParamMap.pipe(
            map(params => params.get('page') ?? '1'),
            map(page => (isNaN(+page) ? 1 : +page) ),
            map(page => Math.max(1, page)
            )
        )
    )

    ngOnInit(): void {

        // setTimeout(() => {

        //     this.isLoading.set(false);

        // }, 5500);

        console.log(this.currentPage());

        this.loadPokemons();

    }

    public loadPokemons( page: number = 0){

        const pageToLoad = this.currentPage()! + page;

        this.pokemonsService.loadPage(pageToLoad)
        .pipe(
            tap( () => this.router.navigate([], {queryParams: {
                page: pageToLoad.toString()
            }}) ),
            tap( () => this.title.setTitle(`Pokemons - Page ${pageToLoad}`) )
        )
        .subscribe((pokemons) => {
            this.pokemons.set(pokemons);
        });

    }


}
