import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'page-contact',
    imports: [
        CommonModule
    ],
    templateUrl: './pricing.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {

    private title = inject(Title);
    private meta = inject(Meta);

    // Detecta la plataforma en la que estamos corriendo
    private platform = inject(PLATFORM_ID);

    ngOnInit(): void {

        document.title = 'Pricing page';

        this.title.setTitle('Pricing page');
        this.meta.updateTag({ name: 'description', content: 'Pricing page description asdfasfasd f' });
        this.meta.updateTag({ name: 'og:title', content: 'Pricing page description  f' });
        this.meta.updateTag({ name: 'keywords', content: 'Algo, hola, mundo, aaaa' });

    }

}
