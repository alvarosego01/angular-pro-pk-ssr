import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'page-about',
    imports: [
        CommonModule
    ],
    templateUrl: './aboutPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {

    private title = inject(Title);
    private meta = inject(Meta);


    ngOnInit(): void {
        this.title.setTitle('About page');
        this.meta.updateTag({ name: 'description', content: 'About page description asdfasfasd f' });
        this.meta.updateTag({ name: 'og:title', content: 'About page description  f' });
        this.meta.updateTag({ name: 'keywords', content: 'Algo, hola, mundo, aaaa' });
    }

}
