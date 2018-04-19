import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {ImageService} from '../services/image.service';
import {Image} from '../models/image';

@Component({
    selector:'image-add',
    templateUrl: '../views/image-add.html',
    providers: [ImageService]
})

export class ImageAddComponent implements OnInit{
    public titulo:string;
    public image: Image;
    public errorMessage:any;

    constructor(
      private _route:ActivatedRoute,
      private _router:Router,
      private _imageService: ImageService
    ){
      this.titulo="Añadir nueva imagen";
    }


    ngOnInit(){
        console.log("Image-add.Component.ts cargado");
        this.image=new Image("","");
    }

    onSubmit(){
      this._route.params.forEach((params:Params)=>{
        console.log(params);

        this._imageService.addImage(this.image).subscribe(
            resp=>{
              this.image=resp.image;
              if(!resp.image){
                alert('Error al enviar la nueva imagen');
              }else{
                this._router.navigate(['/editar-imagen',resp.image._id]);
              }
            },
            error=>{
              this.errorMessage=<any>error;

              if(this.errorMessage!=null){
                  console.log(this.errorMessage);
              }
            }
        );
      });

    }

}
