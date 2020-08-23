const path=require('path');
const express=require('express');
const hbs=require('hbs');
const app=express();
const port=process.env.PORT||3000;
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

//defing path for Express config
const viewsPath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials');
//setuphandbars engine and view location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialpath);

//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')));
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:"Akshat Bakliwal"
    });
});
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Akshat Bakliwal'
    });
});
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'If you need any help contact me.',
        title:'Help',
        name:'Akshat Bakliwal'
    });
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Did not provide the address'
        });
    }
    geocode(req.query.address,(error,{lat,long,location}={})=>{ 
        if(error){
            return res.send({
                error:'Error'
            });
        }
        forecast(long,lat,(error,data)=>{
            if(error){
                return res.send({
                    error:'Error'
                });
            } 
            res.send({
                loc:location,
                dat:data
            })
            /*console.log(chalk.bold.green.inverse(location));
            console.log(data);*/
        });
    });
});

/*app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Must provide a search term'
        });
    }
    
        console.log(req.query.search);
        res.send({
            product:[]
        });
});*/

app.get('/about/*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        name:'Akshat Bakliwal',
        message:'About article not Found'
    });
});

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        name:'Akshat Bakliwal',
        message:'Help article not Found'
    });
});

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Akshat Bakliwal',
        message:'Error 404 not Found'
    });
});

app.listen(port,()=>{
    console.log('Server is up on port '+port);
});