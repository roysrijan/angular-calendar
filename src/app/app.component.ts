import { Component ,Renderer} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  headerClass='';
  navClass='navDown';

  constructor(private renderer: Renderer) {
   
  }

  scrollHeader(){
    // this function is been called
    const scrollPosition = window.pageYOffset
    const shrinkOn =50
    if (scrollPosition > shrinkOn) {
      this.headerClass="sticky";
      this.navClass="navUp";
    } else {
      this.headerClass="";
      this.navClass="navDown";
    }
    // console.log(" scroll position :"+scrollPosition +"|headerClass :"+this.headerClass );
  }
 

}
