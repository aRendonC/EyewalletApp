import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  imgLeft:string=null;
  imgRight:string=null;
  classLeft:string=null;
  bandera:string=null;
  
  constructor() {
    this.classLeft="resize-logo-left1";
    this.imgLeft = "../../assets/img/btn-left-s.svg"
    this.imgRight="../../assets/img/btn-right.svg"
    
  }


  ngOnInit() {
  }

  enviar(){
    if(this.bandera==""){
      this.classLeft="resize-logo-left1";
      
      this.bandera="1";
      console.log("bandera:"+this.bandera);
    }else{
      this.classLeft="resize-logo-left";
      this.bandera="";
      console.log("bandera: "+this.bandera);
      
    }

    
  }

  recibir(){

  }

}
