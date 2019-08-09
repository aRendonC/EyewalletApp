import { Injectable } from '@angular/core';
import {HammerGestureConfig} from "@angular/platform-browser";
import {HammerInstance} from "@angular/platform-browser/src/dom/events/hammer_gestures";

@Injectable({
  providedIn: 'root'
})
export class HammerService extends HammerGestureConfig{
  buildHammer(element: HTMLElement): HammerInstance {
    const mc = new (<any>window).Hammer(element);
    for(const eventName in this.overrides) {
      if (eventName) {
        mc.get(eventName).set(this.overrides[eventName]);
      }
    }
    return mc;
  }
}
