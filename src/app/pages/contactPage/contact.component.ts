import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'page-contact',
    imports: [
        CommonModule
    ],
    templateUrl: './contact.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPage implements OnInit {

    private title = inject(Title);
    private meta = inject(Meta);


    ngOnInit(): void {
        this.title.setTitle('Contact page');
        this.meta.updateTag({ name: 'description', content: 'Contact page description asdfasfasd f' });
        this.meta.updateTag({ name: 'og:title', content: 'Contact page description  f' });
        this.meta.updateTag({ name: 'keywords', content: 'Algo, hola, mundo, aaaa' });
    }

}

