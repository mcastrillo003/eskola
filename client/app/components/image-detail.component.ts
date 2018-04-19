import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {ImageService} from '../services/image.service';
import {Image} from '../models/image';


@Component({
    selector:'image-detail',
    templateUrl: '../views/image-detail.html',
    providers: [ImageService]
})

export class ImageDetailComponent implements OnInit{
    public image:Image;
    public apiUrl:string;
    public errorMessage:any;
    public loading:boolean;
    public confirmado:any;

    constructor(
      private _route:ActivatedRoute,
      private _router:Router,
      private _imageService: ImageService
    ){}


    ngOnInit(){
        console.log("Image-detail.Component.ts cargado");
        this.apiUrl=this._imageService.getApiUrl('get-image/');
        this.getImage();
    }

    getImage(){
      this.loading=true;
      this._route.params.forEach((params:Params)=>{
        let id=params['id'];
        this._imageService.getImage(id).subscribe(
            result=>{//vamos a capturar toda la info que llega de getAlbums
                this.image=result.image;
                if(!this.image){
                    this._router.navigate(['/']);
                }
                this.loading=false;
            },
            error=>{
                this.errorMessage=<any>error;

                if(this.errorMessage!=null){
                    console.log(this.errorMessage);
                    this._router.navigate(['/']);
                }

            }
        );
      });

    }

    onDeleteConfirm(id:string){
      this.confirmado=id;
    }
    onCancelConfirm(){
      this.confirmado=null;
    }

    onDeleteImage(id:string){
      this._imageService.deleteImage(id).subscribe(
        result=>{//vamos a capturar toda la info que llega de getAlbums
            if(!result.image){
                alert('Error al eliminar la imagen');
            }else{
              //this.getImages(); --> no queremos que nos refresque las imagenes, si no que nos redirija
              //HAU KAMBIDXEE
              //this._router.navigate(['/album',result.image.album]);//
            }
        },
        error=>{
            this.errorMessage=<any>error;

            if(this.errorMessage!=null){
                console.log(this.errorMessage);
            }

        }
      );
    }

}
