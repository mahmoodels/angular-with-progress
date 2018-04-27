import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MappdData } from './card/card.component';

@Injectable()
export class DataService {
    files: MappdData[] = [];

    @Output()
    change: EventEmitter<number> = new EventEmitter<number>();


    private messageSource = new BehaviorSubject<File[]>(null);
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeMessage(fils) {
        this.messageSource.next(fils);
    }

    addFile(data: MappdData) {
        this.files.push(data);
    }

    clear() {
        this.files = [];
    }

}
