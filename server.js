const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio')
const app = express()
const mongoose=require('mongoose');
const router=express.Router();
const cors = require("cors");
const countrySchema=require('./model/countrydata')
app.use(cors()); 
app.use(router);


BD_CONNECTION="mongodb+srv://salahuddinsk933:I44n0GID6g5G6G5F@cluster0.bw9od.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.Promise = global.Promise;
const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(BD_CONNECTION) 
        console.log('database connected')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
    }
connectToMongo()
app.listen(4000,(error)=>{
  if(error){
      throw new Error(error);
  }
  console.log('server running on 4000');
})

router.get('/', (req, res) => {
  res.json({msg:"Wecome brother"})
})

const populationwiselist = []
const areawiselist = []
const listwithcapital = []
const listnationalanimal = []
const listnationalbird = []
const listnationalflag = []
const listcurrency = []
const alllist=[]

const getpopulationwiselist=()=>{
  axios.get("https://www.worldometers.info/geography/how-many-countries-are-there-in-the-world/")
  .then((responce) => {
    const html = responce.data
    const $ = cheerio.load(html)
    const component = "body > div.container > div:nth-child(2) > div.col-md-6 > div > div.row.spacer-top > div > ul:nth-child(7) > li"
    const comp = "#example2 > tbody > tr"
    $(comp).each((index, elem) => {
      const rank = $(elem).find('td:nth-child(1)').text()
      const countryname = $(elem).find('td:nth-child(2)').text()
      const countrypopulation = $(elem).find('td:nth-child(3)').text()
      const worldshare = $(elem).find('td:nth-child(4)').text()
      const landarea = $(elem).find('td:nth-child(5)').text()
      const link = $(elem).find('a').attr('href')

      populationwiselist.push({
        rank,
        countryname,
        countrypopulation,
        worldshare,
        landarea
      })
      
    })
   

  }).catch(err => console.log(err))
}



const getlistbyarea=async()=>{
  axios.get("https://www.worldometers.info/geography/how-many-countries-are-there-in-the-world/")
  .then((responce) => {
    const html = responce.data
    const $ = cheerio.load(html)
    const component = "body > div.container > div:nth-child(2) > div.col-md-6 > div > div.row.spacer-top > div > ul:nth-child(7) > li"
    const comp = "#example2 > tbody > tr"
    $(comp).each((index, elem) => {
      const rank = $(elem).find('td:nth-child(1)').text()
      const countryname = $(elem).find('td:nth-child(2)').text()
      
      const landarea = $(elem).find('td:nth-child(5)').text()
     

      areawiselist.push({
        rank,
        countryname,
       
        landarea
      })
      
    })
   

  }).catch(err => console.log(err))
}

const getlistwithcap=()=>{
  axios.get("https://geographyfieldwork.com/WorldCapitalCities.htm")
    .then((responce) => {
      const html = responce.data
      const $ = cheerio.load(html)
    
      const comp ="#anyid > tbody > tr"
      $(comp).each((index, elem) => {
       
        const countryname = $(elem).find('td:nth-child(1)').text()
    
       
        const capital = $(elem).find('td:nth-child(2)').text()
      

        listwithcapital.push({
          countryname,
          capital
       
        })
      }) 
   


    }).catch(err => console.log(err))
}
const getlistnationalanimal=()=>{
  axios.get("https://testbook.com/static-gk/national-animals-of-countries")
  .then((responce) => {
    const html = responce.data
    const $ = cheerio.load(html)
  
    const comp ="#target-content-html > table > tbody > tr"
    $(comp).each((index, elem) => {
     
      const countryname = $(elem).find('td:nth-child(1)').text().replace(/\n/g,"");
  
     
      const nationalAnimal = $(elem).find('td:nth-child(2)').text().replace(/\n/g,"");
    

      listnationalanimal.push({
        countryname,
        nationalAnimal
     
      })
    }) 
  
   console.log(listnationalanimal)

  }).catch(err => console.log(err))
}

const getlistnationalbird=()=>{
  axios.get("https://unacademy.com/content/bank-exam/study-material/general-awareness/list-of-national-birds/")
    .then((responce) => {
      const html = responce.data
      const $ = cheerio.load(html)
    
      const comp ="body > div.opinion-section > div > div > div > div > div > section > div > div > div > div > div > div > div > table > thead > tr"
      $(comp).each((index, elem) => {
       
        const countryname = $(elem).find('td:nth-child(1)').text()
    
       
        const nationalBird = $(elem).find('td:nth-child(2)').text()
      

        listnationalbird.push({
          countryname,
          nationalBird
       
        })
      }) 
  


    }).catch(err => console.log(err))
}
const getlistnationalflag=()=>{
  axios.get("https://www.worldometers.info/geography/flags-of-the-world/")
    .then((responce) => {
      const html = responce.data
      const $ = cheerio.load(html)
    
      const comp ="body > div.container > div:nth-child(2) > div.col-md-8 > div > div > div > div"
      $(comp).each((index, elem) => {
       
        const flagurl ="https://www.worldometers.info/"+ $(elem).find('img').attr('src')
        const countryname=$(elem).text()
       
     //   const nationalBird = $(elem).find('td:nth-child(2)').text()
     // console.log(countryname)

        listnationalflag.push({
          countryname,
          flagurl,
          
       
        })
      }) 



    }).catch(err => console.log(err))
}
const getlistcurrency=()=>{ 
  axios.get("https://fxtop.com/en/countries-currencies.php")
    .then((responce) => {
      const html = responce.data
      const $ = cheerio.load(html)
    
      const comp ="body > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td > table > tbody > tr"
      $(comp).each((index, elem) => {
    
       const countryname=$(elem).find('td:nth-child(1)').text()
       const currency=$(elem).find('td:nth-child(3)').text()
        listcurrency.push({
          countryname,
          currency
          
       
        })
        
      }) 
     
  


    }).catch(err => console.log(err))
}


// getpopulationwiselist();
//   getlistbyarea();
//   getlistwithcap();
//   getlistnationalanimal()
//   getlistnationalflag()
//   getlistcurrency()
//  getlistnationalbird()

router.post('/addcountrydata',async(req,res)=>{
  
 

  data={
    populationwiselist:populationwiselist,
    areawiselist:areawiselist,
    listwithcapital:listwithcapital,
    listnationalanimal:listnationalanimal,
    listnationalbird,
    listnationalflag,
    listcurrency

  }
  try {
   const responce= await countrySchema.create(data)
    if(responce){ 
     res.status(201).json(responce)
    } 
  } catch (error) {
   console.log(error) 
  }
})

router.get('/listbypopulation', async(req, res) => {
try {
  await countrySchema.find()
  .then(data=>res.status(200).json(data[0].populationwiselist))
} catch (error) {
  console.log(error)
}

 
})

router.get('/listbyarea', async(req, res) => {
  try {
    await countrySchema.find()
    .then(data=>res.status(200).json(data[0].areawiselist))
  } catch (error) {
    console.log(error)
  }
  
})

router.get('/listwithcapital', async(req, res) => {
  try {
    await countrySchema.find()
    .then(data=>res.status(200).json(data[0].listwithcapital))
  } catch (error) {
    console.log(error)
  }
}) 

router.get('/listnationalanimal', async(req, res) => {
  try {
    await countrySchema.find()
    .then(data=>res.status(200).json(data[0].listnationalanimal))
  } catch (error) {
    console.log(error)
  }
})

router.get('/listnationalbird', async(req, res) => {
  try {
    await countrySchema.find()
    .then(data=>res.status(200).json(data[0].listnationalbird))
  } catch (error) {
    console.log(error)
  }
})
router.get('/listnationalflag', async(req, res) => {
  try {
    await countrySchema.find()
    .then(data=>res.status(200).json(data[0].listnationalflag))
  } catch (error) {
    console.log(error)
  }
})

router.get('/listcurrency', async(req, res) => {
  try {
    await countrySchema.find()
    .then(data=>res.status(200).json(data[0].listcurrency))
  } catch (error) {
    console.log(error)
  }

})
app.get('/countrydetail_list', async(req, res) => {
  try {
    await countrySchema.find()
    .then(data=>{
  //     const titlesSet = new Set(data[0].listwithcapital.map(item => item.countryname));
  //     data[0].populationwiselist = data[0].populationwiselist.filter(item => titlesSet.has(item.countryname));
  //     data[0].areawiselist = data[0].areawiselist.filter(item => titlesSet.has(item.countryname));
  //     // data[0].listnationalanimal = data[0].listnationalanimal.filter(item => titlesSet.has(item.countryname));
  //     // data[0].listnationalbird = data[0].listnationalbird.filter(item => titlesSet.has(item.countryname));
  //     data[0].listnationalflag = data[0].listnationalflag.filter(item => titlesSet.has(item.countryname));
  //     data[0].listcurrency = data[0].listcurrency.filter(item => titlesSet.has(item.countryname));
  //     data[0].listwithcapital = data[0].listwithcapital.filter(item => data[0].populationwiselist.some((el)=>el.countryname===item.countryname));
  //     console.log(data[0].populationwiselist.length)
  //     console.log(data[0].areawiselist.length)
  //     console.log(data[0].listnationalanimal.length)
  //     console.log(data[0].listnationalbird.length)
  //     console.log(data[0].listnationalflag.length)
  //     console.log(data[0].listwithcapital.length)
  //     const arrs=[].concat(data[0].populationwiselist,data[0].areawiselist,data[0].listwithcapital,data[0].listnationalanimal);
  //     const noDuplicate=arr=>[...new Set(arr)]
  //     const names= arrs.map(ele=>ele.countryname);
  //     const ids=noDuplicate(names);
  
  //     const result=ids.map(id=>
  //     arrs.reduce((self,item)=>{
  //         return item.countryname===id?
  //         {...self,...item} : self
  //     },{})
  // )
      res.status(200).json(data[0])
    })
  } catch (error) {
    console.log(error)
  }
 })

