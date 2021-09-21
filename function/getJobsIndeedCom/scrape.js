
const request=require('request');
const cheerio=require('cheerio');
const fs=require('fs');
const { url } = require('inspector');
const writeData=fs.createWriteStream('data.csv');

writeData.write(`Job,Location \n`);

request('https://in.indeed.com/jobs?q=digital%20marketing&l=kerala',(error,response,html)=>{
   if(!error&&response.statusCode==200){
       const $=cheerio.load(html);

        
       $('.job_seen_beacon').each((i,el)=>{
        const jobHd=$(el).find('h2').text();
        const jobLocation=$(el).find('.companyLocation').text();
        console.log(jobHd,jobLocation);
        writeData.write(`${jobHd},${jobLocation} \n`);
      
      });
       console.log('file is ready....');
    }
        
       
});
for(j=10;j<500;j++){
var baseUrl='https://in.indeed.com/jobs?q=digital+marketing&l=kerala&start='
baseUrl=baseUrl.concat(j)

request(baseUrl,(error,response,html)=>{
    if(!error&&response.statusCode==200){
        const $=cheerio.load(html);

        
       $('.job_seen_beacon').each((i,el)=>{
         const jobHd=$(el).find('h2').text();
         const jobLocation=$(el).find('.companyLocation').text();
         console.log(jobHd,jobLocation);
         writeData.write(`${jobHd},${jobLocation} \n`);
       
        });
        console.log('file is ready....');  
    }
          
       
});
}
