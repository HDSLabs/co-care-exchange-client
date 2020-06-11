import { interval, concat } from 'rxjs';
import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Plugins } from '@capacitor/core';
const { Modals } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class ServiceWorkerUpdateService {
  constructor(private appRef: ApplicationRef, private updates: SwUpdate, private toastrService: ToastrService) {}
  // Chrome for iOS does not support service workers: https://stackoverflow.com/questions/50607343/chrome-service-worker-ios-support
  public checkForUpdates() {
    console.log('ServiceWorkerUpdateService registered');
    if (this.updates.isEnabled) {
      // check for updates
      const appStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everyFiveMinutes$ = interval(5 * 60 * 1000);
      const everyFiveMinutesOnceStable$ = concat(appStable$, everyFiveMinutes$);
      everyFiveMinutesOnceStable$.subscribe(() => {
        console.log('checking for updates...');
        this.updates.checkForUpdate();
      });
      // handle update available
      this.updates.available.subscribe(() => this.handleVersionUpdateAvailable());
      // hanlde update
      this.updates.activated.subscribe(event => this.handleVersionUpdate(event));
    }
  }

  private async handleVersionUpdateAvailable() {
    const confirmReload = await Modals.confirm({
      title: 'A new version of the app is available.',
      message: `A new version of the app is available! Would you like to reload now to receive the updates?`,
    });
    if (confirmReload) {
      try {
        await this.updates.activateUpdate();
        window.location.reload();
        return;
      } catch (e) {
        // see logs at /ngsw/state
        console.error('an error occurred with the pwa update: ', e);
      }
    } else {
      this.toastrService.warning(
        `Colorado Care Exchange was not updated.
               The app is not current and may cause issues. Please do a refresh to receive the updates.`,
        null,
        { positionClass: 'toast-top-center' }
      );
    }
  }

  private handleVersionUpdate(event) {
    console.log('Successfully updated pwa');
    console.log('Previous version: ', event.previous);
    console.log('Current version: ', event.current);
  }
}
