const async = require('async');
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared-service';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private _sharedData: DataService, private _cardServ: CardService) { }
  files: MappdData[] = [];


  q = async.queue((processFile, callback) => {
    console.log('start processing ' + processFile.name);
    this._cardServ.sendData(processFile, (progress, file) => {
      // setTimeout(() => {
      this.files.find(a => a.name === file.name).percent = progress;
      console.log(progress);
      // }, 100);
    }, () => {
      callback();
    });
  }, 1);


  ngOnInit() {

    this.q.drain = function () {
      console.log('all items have been processed');
    };

    this._sharedData.currentMessage.subscribe(data => {
      if (data == null) {
        return;
      }
      this.processData(data);

    });
  }

  processData(files: File[]) {
    console.log(files);
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      const itm = new MappdData(element.name, false, 0, element.size);

      this.files.push(itm);
      this.q.push(element, (err) => {
        this.files.find(a => a.name === element.name).isDone = true;
        console.log('finished processing ' + element.name);
      });
    }
  }
}


export class MappdData {
  constructor(public name: string,
    public isDone: boolean,
    public percent: number,
    public fileSize: number) { }
}
