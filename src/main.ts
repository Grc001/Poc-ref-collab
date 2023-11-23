import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { applyPolyfills, defineCustomElements } from 'wcs-core/loader';



import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  applyPolyfills().then(() => {
    defineCustomElements();
  });