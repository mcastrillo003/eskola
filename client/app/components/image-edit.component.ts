import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {ImageService} from '../services/image.service';
import {Image} from '../models/image';
import {GLOBAL} from '../services/global';

@Component({
    selector:'image-edit',
    templateUrl: '../views/image-add.html',
    providers: [ImageService]
})

export class ImageEditComponent implements OnInit{
    public titulo:string;
    public image: Image;
    public errorMessage:any;
    public is_edit:boolean;

    constructor(
      private _route:ActivatedRoute,
      private _router:Router,
      private _imageService: ImageService
    ){
      this.titulo="Editar imagen";
      this.is_edit=true;
    }


    ngOnInit(){
        console.log("Image-edit.Component.ts cargado");
        this.image=new Image("","");
        this.getImage();
    }

    getImage(){
        //recoger los parametros que nos llegan por la URL
        this._route.params.forEach((params:Params)=>{
            let id =params['id'];

            this._imageService.getImage(id).subscribe(
              resp=>{
                this.image=resp.image;
                if(!resp.image){
                  this._router.navigate(['/']);
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

    onSubmit(){
      this._route.params.forEach((params:Params)=>{

        let id=params['id'];

        this._imageService.editImage(id,this.image).subscribe(
            resp=>{
              this.image=resp.image;
              if(!resp.image){
                alert('Error en el servidor');
              }else{
                  if(!this.filesToUpload)
                  {
                    //  this._router.navigate(['/album',this.image.album]);
                  }else{
                      //Subir la imagen
                      this.makeFileRequest(GLOBAL.url+'upload-image/'+id,[],this.filesToUpload)
                          .then(
                                (result)=>{
                                    this.resultUpload=result;
                                    this.image.picture=this.resultUpload.filename;
                                //    this._router.navigate(['/album',this.image.album]);
                                },
                                (error)=>{
                                    console.log(error);
                                }
                          );
                  }
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

    public resultUpload:any;
    public filesToUpload: Array<File>;

    fileChangeEvent(fileInput:any){
        this.filesToUpload=<Array<File>>fileInput.target.files;

    }

    makeFileRequest(url:string,params:Array<string>,files:Array<File>){
        return new Promise(function(resolve,reject){
            var formData: any=new FormData();
            var xhr =new XMLHttpRequest();//peticion xml http request-->AJAX clasico de JavaScript

            for(var i=0;i<files.length;i++){
                formData.append('image',files[i],files[i].name);
            }

            xhr.onreadystatechange=function(){//cuando el estado de la peticion AJAX cambie
                if(xhr.readyState==4){
                  if(xhr.status==200){
                      resolve(JSON.parse(xhr.response));
                  }else{
                      reject(xhr.response);
                  }
              }
            }
            xhr.open('POST',url,true);//hacer la peticion AJAX por POST
            xhr.send(formData);//enviar los datos que hay en la formData, es decir, la imagen
        });
    }
}
