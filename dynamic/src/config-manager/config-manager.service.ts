import {inject, Injectable, signal} from '@angular/core';
import {XtResolverService} from 'xt-components';
import {XtTypeInfo} from 'xt-type';
import {loadRemoteModule} from '@softarc/native-federation-runtime';

@Injectable({
  providedIn: 'root',
})
export class ConfigManagerService {
  configLoaded = signal<boolean>(false);
  errorMsg = signal<string | null>(null);

  protected readonly resolverService = inject(XtResolverService);

  loadConfig(pluginConfig: Array<{ plugin: string, url: string }>, types: XtTypeInfo) {
    this.loadPlugins(pluginConfig).then(() => {
      // We declare the types handled by the framework
      this.resolverService.registerTypes(types);
      this.configLoaded.set(true);
    }).catch((err) => {
      this.errorMsg.set(err.toString());
    });
  }

  /**
   * Load an register plugins listed
   * @param pluginInfos
   */
  async loadPlugins(pluginInfos: Array<{ plugin: string, url: string }>): Promise<void> {
    for (const pluginInfo of pluginInfos) {
      console.log(`Loading plugin ${pluginInfo.plugin} from ${pluginInfo.url}`);
      const module = await loadRemoteModule({
        remoteEntry: pluginInfo.url,
        exposedModule: './Register'
      });
      this.resolverService.registerPluginModule (module, pluginInfo.url);
    }

  }
}
