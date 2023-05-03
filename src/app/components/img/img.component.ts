import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  AfterViewInit,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  img: string = '';

  // Get data from parent
  @Input('img')
  // we use JS setter
  set imgValue(newImg: string) {
    this.img = newImg;
    console.log('change just img =>', this.img);
    // code
  }

  @Input() alt: string = '';

  // Send data to parent
  @Output() loaded = new EventEmitter<string>();
  imageDefault =
    'https://images.pexels.com/photos/2002719/pexels-photo-2002719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  counter = 0;
  timer: number | undefined;

  constructor() {
    // before render
    // don't use for async
    console.log('constructor', 'imgValue =>', this.img);
  }

  ngOnInit(): void {
    // before render -- runs only once
    // use for async -- fetch, subscribe, etc
    console.log('ngOnInit', 'imgValue =>', this.img);
    this.timer = window.setInterval(() => {
      this.counter += 1;
      console.log('run counter');
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    // before - during render
    // change inputs -- runs times
    console.log('ngOnChanges', 'imgValue =>', this.img);
    // changes is used to listen ALL the changes made to @Inputs
    console.log('changes', changes);
    // if(changes.) {
    //   // code
    // }
  }

  ngAfterViewInit(): void {
    // after render
    // handle children
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // delete from UI
    console.log('ngOnDestroy');
    window.clearInterval(this.timer);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('log hijo');
    this.loaded.emit(this.img);
  }
}
