import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from './shared-service';
import { CardService } from './card/card.service';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'app';
  dropArea: HTMLElement;

  @ViewChild(CardComponent) child: CardComponent;

  constructor(private _sharedService: DataService, private _cardServ: CardService) { }

  fileChangeEvent(fils) {
    console.log(fils);
    // this.child.processData(fils);
    this._sharedService.changeMessage(fils);
  }

  ngAfterViewInit() {
    this.dropArea = document.getElementById('drop-area');

    console.log(this.dropArea);

    ['dragenter', 'dragover'].forEach(eventName => {
      this.dropArea.addEventListener(eventName, function () { this.dropArea.classList.add('highlight'); }.bind(this), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this.dropArea.addEventListener(eventName, function () { this.dropArea.classList.remove('highlight'); }.bind(this), false);
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.dropArea.addEventListener(eventName, this.preventDefaults, false);
    });

    this.dropArea.addEventListener('drop', function (e) { this.handleDrop(e); }.bind(this), false);

  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    this.fileChangeEvent(files);
  }

  ngOnInit() {
  }

  highlight(e) {
  }

  unhighlight(e) {

  }
}
