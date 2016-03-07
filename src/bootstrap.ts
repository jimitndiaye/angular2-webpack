import {enableProdMode, provide} from "angular2/core";
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ionicProviders, IonicApp, TapClick, Platform} from 'ionic-angular';

const ENV_PROVIDERS = [];
// depending on the env mode, enable prod mode or add debugging modules
const isProd = process.env.ENV === 'prod';
if (isProd) {
    enableProdMode();
} else {
    ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
    const defaultPlatform = Platform.get('core');
    defaultPlatform.settings.mode = 'md';
    return bootstrap(App, [
        // These are dependencies of our App
        ...HTTP_PROVIDERS,
        ...ROUTER_PROVIDERS,
        ...ENV_PROVIDERS,
        ...ionicProviders({})
        //provide(LocationStrategy, {useClass: HashLocationStrategy}) // use #/ routes, remove this for HTML5 mode
    ])
    .then(appRef => {
        appRef.injector.get(TapClick);
        let app = appRef.injector.get(IonicApp);
        app.setProd(isProd);
    })
    .catch(err => console.error(err));
});
