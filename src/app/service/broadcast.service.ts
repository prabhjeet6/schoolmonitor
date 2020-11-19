import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
 
import {  OperatorFunction } from 'rxjs';
import { NgZone } from '@angular/core';

interface BroadcastMessage {
  type: string;
  payload: any;
}
 
export class BroadcastService {
  private broadcastChannel: BroadcastChannel;
  private onMessage = new Subject<any>();
 
  constructor(broadcastChannelName: string, private ngZone: NgZone) {
    this.broadcastChannel = new BroadcastChannel(broadcastChannelName);
    this.broadcastChannel.onmessage = (message) => this.onMessage.next(message.data);
  }
 
  publish(message: BroadcastMessage): void {
    this.broadcastChannel.postMessage(message);
  }
 
  messagesOfType(type: string): Observable<BroadcastMessage> {
    return this.onMessage.pipe(
 
      // It is important that we are running in the NgZone. This will make sure that Angular component changes are immediately visible in the browser when they are updated after receiving messages.
      runInZone(this.ngZone),
      filter(message => message.type === type)
    );
  }
}


/**
 * Custom OperatorFunction that makes sure that all lifecycle hooks of an Observable
 * are running in the NgZone.
 */
export function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
  return (source) => {
    return new Observable(observer => {
      const onNext = (value: T) => zone.run(() => observer.next(value));
      const onError = (e: any) => zone.run(() => observer.error(e));
      const onComplete = () => zone.run(() => observer.complete());
      return source.subscribe(onNext, onError, onComplete);
    });
  };
}