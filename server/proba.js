
var sartutakoa="Mireia Castrillo Gonzalez ";
var array=sartutakoa.split(' ');
var izena=array[0].toLowerCase();
izena=izena.charAt(0).toUpperCase()+izena.slice(1);
console.log(izena);
var abizena1=array[1].toLowerCase();
var abizena2=array[2].toLowerCase();

console.log('izena: '+izena+' abizena1: '+abizena1+' abizena2: '+abizena2);
if(izena!=undefined && (abizena1==undefined || abizena1=='')){//abizena1 undefine bada, abizena2 ere
  //bakarrik egin find
  console.log('lehenengo parametroa soilik sartu da');
}
if(izena!=undefined && (abizena1!=undefined && abizena1!='') && (abizena2==undefined || abizena2=='')){
  console.log(' lehenengo bi parametroak soilik sartu dira');
}
if(izena!=undefined && abizena1!=undefined && (abizena2!= undefined && abizena2!='')){
  console.log('hiru parametroak sartu dira');
}
