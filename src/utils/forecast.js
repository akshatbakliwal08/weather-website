const request=require('request');
const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=63c8c1c8d6f12a1a4c551a6f0fc22ee3&query='+long+','+lat+'&units=m';
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to Connect');
        }else if(body.error){
            callback('Unable to find Location');
        }else{
            callback(undefined,body.current.weather_descriptions[0]+', The temperature is '+body.current.temperature+' degrees but feels like '+body.current.feelslike+' degrees out!!');
        }
    })
}
module.exports=forecast;