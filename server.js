const express=require('express');
const app=express();
const mongoose=require('mongoose');
const ShortUrl=require('./models/shortUrl');
mongoose.connect('mongodb://127.0.0.1/urlShortener')
    

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}))
app.get('/',async (req,res)=>{
    const shortUrls=await ShortUrl.find();
     
    res.render('index.ejs',{shortUrls:shortUrls});
})

app.post('/shortUrls',async (req,res)=>{
    await ShortUrl.create({full:req.body.fullUrl});
    res.redirect('/');
})

app.get('/:shorturl',async (req,res)=>{
   const shortURL=await ShortUrl.findOne({short:req.params.shorturl})
   if(shortURL==null) return res.sendStatus(404)
   shortURL.clicks++;
   shortURL.save();

   res.redirect(shortURL.full);
})


app.listen(5000);