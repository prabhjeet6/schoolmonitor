import {inject, InjectionToken, NgZone} from '@angular/core';
import {BroadcastService} from './service/broadcast.service';

declare var require: any;
//const { BroadcastChannel } = require('broadcast-channel');

export const BROADCAST_CHANNEL_INJECTION_TOKEN = new InjectionToken<BroadcastService>('broadcastChannelInjectionToken', {
  factory: () => new BroadcastService('auth', inject(NgZone))
});
