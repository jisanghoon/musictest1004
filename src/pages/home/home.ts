import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FileChooser, MediaPlugin } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nativepath: string;
  value;
  max;
  mediaTimer: any;
  file;
  constructor(public navCtrl: NavController) {

  }


  filechooser() {
    FileChooser.open()
      .then(uri => {
        (<any>window).FilePath.resolveNativePath(uri, (result) => {
          this.nativepath = result;

          this.audioplay();
        }, (err) => {
          alert(err);
        })

      })
      .catch(e => console.log(e));
  }

  audioplay() {


    //var pathalone = this.nativepath.substring(8);
    this.file = new MediaPlugin("http://1.222.240.74/1.mp3", (status) => {

    });


    this.file.play();

    setTimeout(() => {
      this.max = (this.file.getDuration()/1000*60) % 60
      alert(this.max);
    }, 700)



    setInterval(() => {
      this.file.getCurrentPosition().then((curpos) => {
        console.log((curpos) + " sec");
        this.value = (curpos/1000*60) % 60;
      });
      console.log(this.file.getDuration() + "테스트테스트");
    })
  }
  musicPlay() {
     
    this.file.play();
  }
  musicPause() {
    this.file.pause();
  }
  musicStop() {
    this.file.stop();
  }

}
