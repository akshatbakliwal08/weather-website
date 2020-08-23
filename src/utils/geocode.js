const request=require('request');

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmFrbGktd2FsMDgiLCJhIjoiY2tkYzNqOHRoMWNzbzJ4cGNpOWU4Y240bSJ9.D7Rny5W88HsnH18AbpmASQ&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect');
        }
        else if(body.features.length===0){
            callback('Unable to find location');
        }else{
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location:body.features[0].place_name
            });
        }
    })
}
module.exports=geocode;