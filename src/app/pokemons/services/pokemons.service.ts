import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { PokemonApiResponse, SimplePokemon } from '../interfaces/pokemons.interface';

@Injectable({
    providedIn: 'root'
})
export class PokemonsService {

    private http = inject(HttpClient);

    public loadPage(page: number): Observable<SimplePokemon[]> {
        // return this.http.get('https://pokeapi.co/api/v2/pokemon');
        if (page != 0) {
            --page;
        }
        page = Math.max(0, page);

        return this.http.get<PokemonApiResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`).pipe(
            map((resp) => {
                const simplePokemons: SimplePokemon[] = resp.results.map((result) => ({
                    id: result.url.split('/').at(-2) ?? '',
                    name: result.name
                }))

                return simplePokemons;
            }),
        )

    }

    public loadPokemon(id: string): Observable<any> {
        return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    }

}
