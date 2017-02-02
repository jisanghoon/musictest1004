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


    var pathalone = this.nativepath.substring(8);
    const file = new MediaPlugin(pathalone, (status) => {

    });


    file.play();

setTimeout(()=>{
  this.max=file.getDuration();
  alert(this.max);
},3000)



    setInterval(() => {
      file.getCurrentPosition().then((curpos) => {
        console.log((curpos) + " sec");
        this.value = curpos;
      });
      console.log(file.getDuration() + "테스트테스트");
    })
  }

}
