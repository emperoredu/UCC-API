

const cheerio = require('cherio');
const request = require('request');
const fs = require('fs');
const express=require('express');


const https=require('https')
const PORT=process.env.PORT ||9000

// Creating a Write Stream 
var WriteStream  = fs.createWriteStream("ImagesLink.txt", "UTF-8");
const app=express();



process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
var links=[];
var post=[];

app.get("/", (request, res) => {

        res.send(links);
        //res.send(post)
});


request('https://www.ucc.edu.gh/events', (err, resp, html)=>{
console.log(err)
    if(!err && resp.statusCode == 200){
        console.log("Request was success ");
        
        // Define Cherio or $ Object 
       // console.log(html)
        const $ = cheerio.load(html);
    //    const a = cheerio.load(html);

        $(".title, .post-title").each(function(){

            const text = $(this).text();
      
            const baseUrl = 'https://www.ucc.edu.gh/'
            const Links = $(this).find('a').attr('href');
            const finallink=baseUrl + Links
          
           // console.log(img);
            links.push({
                text,
                finallink,
                
            

            }) 
            WriteStream.write(Links);
            WriteStream.write("\n");
          //  res.send(links);
            
        })
    }


    

   
   

})
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))


