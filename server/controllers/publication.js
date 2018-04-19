'use strict'

var path=require('path');
var Publication=require('../models/publication');


function getPublication(req,res){
  var publiId=req.params.id;

  Publication.findById(publiId,(err,publication)=>{
    if(err){
      res.status(500).send({message: 'Errorea argitalpena eskuratzean'});
    }else{
      if(!publication){
        res.status(404).send({message: 'Ez da argitalpen hori existitzen'});
      }else{
        res.status(200).send({publication});
      }
    }
  });
}

function getArgitalpenak(req,res){
  var mota="argitalpena";
  Publication.find({'mota':mota}).sort('-data').exec((err,publications)=>{
    if(err){
      res.status(500).send({message: 'Errorea argitalpenak eskuratzean'});
    }else{
      if(!publications || publications==false){
        res.status(404).send({message: 'Ez da argitalpenik existitzen'});
      }else{
        res.status(200).send({publications});
      }
    }
  });
}

function getEginbeharrak(req,res){
  var mota="eginbeharra";
  Publication.find({'mota':mota}).sort('-data').exec((err,publications)=>{
    if(err){
      res.status(500).send({message: 'Errorea eginbeharrak eskuratzean'});
    }else{
      if(!publications || publications==false){
        res.status(404).send({message: 'Ez da eginbeharrik existitzen'});
      }else{
        res.status(200).send({publications});
      }
    }
  });
}

function getForoak(req,res){
  var mota="foroa";
  Publication.find({'mota':mota}).sort('-data').exec((err,publications)=>{
    if(err){
      res.status(500).send({message: 'Errorea foroko argitalpenak eskuratzean'});
    }else{
      if(!publications || publications==false){
        res.status(404).send({message: 'Ez da foroko argitalpenik existitzen'});
      }else{
        res.status(200).send({publications});
      }
    }
  });
}

function createArgitalpena(req,res){
  var publi=new Publication();
  var user=req.params.id;
  var params=req.body;


  publi.izenburua=params.izenburua;
  publi.azalpena=params.azalpena;
  publi.mota="argitalpena";
  publi.sortzailea=user;
  var data=new Date();
  var hour=data.getHours();
  var min=data.getMinutes();
  var sec=data.getSeconds();
  if(hour<10)
  {
    hour='0'+data.getHours();
  }
  if(min<10)
  {
    min='0'+data.getMinutes();
  }
  if(sec<10)
  {
    sec='0'+data.getSeconds();
  }
  publi.data = data.toISOString().substr(0, 11).replace('T', ' ')+hour+':'+min+':'+sec;


  publi.save((err,publiStored)=>{
    if(err)
    {
      res.status(500).send({message: 'Errorea argitalpena gordetzerakoan'});
    }else{
      if(!publiStored){
        res.status(404).send({message: 'Ezin izan da argitalpena gorde'});
      }else{
          res.status(200).send({publication: publiStored});
        }
    }
  });
}

function createEginbeharra(req,res){
  var publi=new Publication();
  var user=req.params.id;
  var params=req.body;
  publi.izenburua=params.izenburua;
  publi.azalpena=params.azalpena;
  publi.mota="eginbeharra";
  publi.sortzailea=user;
  var data=new Date();
  var hour=data.getHours();
  var min=data.getMinutes();
  var sec=data.getSeconds();
  if(hour<10)
  {
    hour='0'+data.getHours();
  }
  if(min<10)
  {
    min='0'+data.getMinutes();
  }
  if(sec<10)
  {
    sec='0'+data.getSeconds();
  }
  publi.data = data.toISOString().substr(0, 11).replace('T', ' ')+hour+':'+min+':'+sec;

  publi.save((err,publiStored)=>{
    if(err)
    {
      res.status(500).send({message: 'Errorea eginbeharra gordetzerakoan'});
    }else{
      if(!publiStored){
        res.status(404).send({message: 'Ezin izan da eginbeharra gorde'});
      }else{
          res.status(200).send({publication: publiStored});
        }
    }
  });
}

function createForoa(req,res){
  var publi=new Publication();
  var user=req.params.id;
  var params=req.body;
  publi.izenburua=params.izenburua;
  publi.azalpena=params.azalpena;
  publi.mota="foroa";
  publi.sortzailea=user;
  var data=new Date();
  var hour=data.getHours();
  var min=data.getMinutes();
  var sec=data.getSeconds();
  if(hour<10)
  {
    hour='0'+data.getHours();
  }
  if(min<10)
  {
    min='0'+data.getMinutes();
  }
  if(sec<10)
  {
    sec='0'+data.getSeconds();
  }
  publi.data = data.toISOString().substr(0, 11).replace('T', ' ')+hour+':'+min+':'+sec;

  publi.save((err,publiStored)=>{
    if(err)
    {
      res.status(500).send({message: 'Errorea foroko argitalpena gordetzerakoan'});
    }else{
      if(!publiStored){
        res.status(404).send({message: 'Ezin izan da foroko argitalpena gorde'});
      }else{
          res.status(200).send({publication: publiStored});
        }
    }
  });
}

function updateArgitalpena(req,res){
  var id=req.params.id;
  var update=req.body;

  Publication.findByIdAndUpdate(id,update,(err,publiUpdated)=>{
    if(err){
      res.status(500).send({message: 'Errorea argitalpena eskuratzean'});
    }else{
      if(!publiUpdated){
        res.status(404).send({message: 'Ezin izan da argitalpena eguneratu'});
      }else{
        res.status(200).send({publication: publiUpdated});
      }
    }
  });
}

function updateEginbeharra(req,res){
  var id=req.params.id;
  var update=req.body;

  Publication.findByIdAndUpdate(id,update,(err,publiUpdated)=>{
    if(err){
      res.status(500).send({message: 'Errorea eginbeharra eskuratzean'});
    }else{
      if(!publiUpdated){
        res.status(404).send({message: 'Ezin izan da eginbeharra eguneratu'});
      }else{
        res.status(200).send({publication: publiUpdated});
      }
    }
  });
}

function updateForoa(req,res){
  var id=req.params.id;
  var update=req.body;

  Publication.findByIdAndUpdate(id,update,(err,publiUpdated)=>{
    if(err){
      res.status(500).send({message: 'Errorea foroko argitalpena eskuratzean'});
    }else{
      if(!publiUpdated){
        res.status(404).send({message: 'Ezin izan da foroko argitalpena eguneratu'});
      }else{
        res.status(200).send({publication: publiUpdated});
      }
    }
  });
}

function addGustukoDut(req,res){
  var id=req.params.id;//argitalpenarenIDa
  var params=req.body;
  var user=params.user;
  var badago=false;

  Publication.findById(id,(err,publi)=>{
    if(err){
      res.status(500).send({message: 'Errorea argitalpena eskuratzean'});
    }else{
      if(!publi){
        res.status(404).send({message: 'Ezin izan da argitalpena lortu'});
      }else{
          for(var i=0;i<publi.gustuko.length;i++){
            if(publi.gustuko[i]==user){
                badago=true;
            }
          }
          if(badago==false){
              publi.gustuko.push(user);
              Publication.findByIdAndUpdate(id,publi,(err,publiUpdated)=>{
                  if(err){
                      res.status(500).send({message: 'Errorea foroko argitalpena eskuratzean'});
                  }else{
                    if(!publiUpdated){
                      res.status(404).send({message: 'Ezin izan da argitalpenan gustukoa gehitu'});
                    }else{
                      res.status(200).send({publication: publiUpdated});
                    }
                  }
              });
          }else{
              res.status(404).send({message: 'Erabiltzaile hori jadanik bazegoen'});
          }



      }
    }
  });
}

function deleteGustukoDut(req,res){
  var id=req.params.id;//argitalpenarenIDa
  var params=req.body;
  var user=params.user;
  var badago=false;

  var planb;

  Publication.findById(id,(err,publication)=>{
    if(err){
      res.status(500).send({message: 'Errorea argitalpena eskuratzean'});
    }else{
      if(!publication){
        res.status(404).send({message: 'Ezin izan da argitalpen hori eskuratu'});
      }else{
        //komprobaketa egin beharko da jadanik erabiltzailea apuntatuta dagoen ikusteko
        var badago=false;
        var j=null;
        for(var i=0;i<publication.gustuko.length;i++){
            if(publication.gustuko[i]==user){
              badago=true;
              j=i;
            }
        }
        if(badago==true){
            publication.gustuko.splice(j,1);

            Publication.findByIdAndUpdate(id,publication,(err,publicationUpdated)=>{
            if(err){
              res.status(500).send({message: 'Errorea erabiltzailea ezabatzean'});
            }if(!publicationUpdated){
              res.status(404).send({message: 'Ezin izan da erabiltzailea ezabatu argitalpenetik'});
            }else{
              res.status(200).send({publication: publication});
            }
          });
        }else{
            res.status(404).send({message: 'Erabiltzailea jadanik ez dago argitalpenean'});
        }


        }
    }

  });

}

module.exports={
  getPublication,
  getArgitalpenak,
  getEginbeharrak,
  getForoak,
  createArgitalpena,
  createEginbeharra,
  createForoa,
  updateArgitalpena,
  updateEginbeharra,
  updateForoa,
  addGustukoDut,
  deleteGustukoDut
}
