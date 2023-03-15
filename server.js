const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio')
const app = express()

app.get('/', (req, res) => {
  res.send("Wecome brother")
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
const getlistbyarea=()=>{
  axios.get("https://www.worldometers.info/geography/largest-countries-in-the-world/")
  .then((responce) => {
    const html = responce.data
    const $ = cheerio.load(html)
  
    const comp = "#example2 > tbody > tr"
    $(comp).each((index, elem) => {
      const rank = $(elem).find('td:nth-child(1)').text()
      const countryname = $(elem).find('td:nth-child(2)').text()
  
     
      const landarea = $(elem).find('td:nth-child(3)').text()
    

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
  axios.get("https://www.fresherslive.com/current-affairs/article/list-of-national-animals-of-all-countries-35")
  .then((responce) => {
    const html = responce.data
    const $ = cheerio.load(html)
  
    const comp ="body > main > div > div > div.leftwrap > div.page_content > table > tbody > tr"
    $(comp).each((index, elem) => {
     
      const countryname = $(elem).find('td:nth-child(1)').text()
  
     
      const nationalAnimal = $(elem).find('td:nth-child(2)').text()
    

      listnationalanimal.push({
        countryname,
        nationalAnimal
     
      })
    }) 
  


  }).catch(err => console.log(err))
}
const getlistnationalbird=()=>{
  axios.get("https://www.fresherslive.com/current-affairs/article/list-of-national-birds-of-different-countries-36")
    .then((responce) => {
      const html = responce.data
      const $ = cheerio.load(html)
    
      const comp ="body > main > div > div > div.leftwrap > div.page_content > table > tbody > tr"
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
const getlistall=async()=>{
  getpopulationwiselist();
  getlistbyarea();
  getlistwithcap();
  getlistnationalanimal();

  const arrs=[].concat(populationwiselist,areawiselist,listwithcapital,listnationalanimal);
  const noDuplicate=arr=>[...new Set(arr)]
  const names=await arrs.map(ele=>ele.countryname);
  const ids=noDuplicate(names);
  
  const result=ids.map(id=>
      arrs.reduce((self,item)=>{
          return item.countryname===id?
          {...self,...item} : self
      },{})
  )
 alllist.push(result)
}

app.get('/listbypopulation', (req, res) => {
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
  
    res.send(populationwiselist)

  }).catch(err => console.log(err))
      


 
})

app.get('/listbyarea', (req, res) => {
  axios.get("https://www.worldometers.info/geography/largest-countries-in-the-world/")
  .then((responce) => {
    const html = responce.data
    const $ = cheerio.load(html)
  
    const comp = "#example2 > tbody > tr"
    $(comp).each((index, elem) => {
      const rank = $(elem).find('td:nth-child(1)').text()
      const countryname = $(elem).find('td:nth-child(2)').text()
  
     
      const landarea = $(elem).find('td:nth-child(3)').text()
    

      areawiselist.push({
        rank,
        countryname,
       
        landarea
      })
    }) 

    res.send(areawiselist)

  }).catch(err => console.log(err))
  
})

app.get('/listwithcapital', (req, res) => {
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
 const newlist=listwithcapital.slice(1,)
    res.send(newlist) 

  }).catch(err => console.log(err))
  
})

app.get('/listnationalanimal', (req, res) => {
  axios.get("https://www.fresherslive.com/current-affairs/article/list-of-national-animals-of-all-countries-35")
  .then((responce) => {
    const html = responce.data
    const $ = cheerio.load(html)
  
    const comp ="body > main > div > div > div.leftwrap > div.page_content > table > tbody > tr"
    $(comp).each((index, elem) => {
     
      const countryname = $(elem).find('td:nth-child(1)').text()
  
     
      const nationalAnimal = $(elem).find('td:nth-child(2)').text()
    

      listnationalanimal.push({
        countryname,
        nationalAnimal
     
      })
    }) 
  
    res.send(listnationalanimal)

  }).catch(err => console.log(err))
  
})

app.get('/listnationalbird', (req, res) => {
  axios.get("https://www.fresherslive.com/current-affairs/article/list-of-national-birds-of-different-countries-36")
    .then((responce) => {
      const html = responce.data
      const $ = cheerio.load(html)
    
      const comp ="body > main > div > div > div.leftwrap > div.page_content > table > tbody > tr"
      $(comp).each((index, elem) => {
       
        const countryname = $(elem).find('td:nth-child(1)').text()
    
       
        const nationalBird = $(elem).find('td:nth-child(2)').text()
      

        listnationalbird.push({
          countryname,
          nationalBird
       
        })
      }) 
  
      res.send(listnationalbird) 

    }).catch(err => console.log(err))

  
})
app.get('/listnationalflag', (req, res) => {
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

      res.send(listnationalflag) 

    }).catch(err => console.log(err))
 
  
})

app.get('/listcurrency', (req, res) => {
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
   

    res.send(
      listcurrency
     ) 

  }).catch(err => console.log(err))




})
// app.get('/countrylist', (req, res) => {
//   getlistall()


//    res.send(
//      alllist
//     ) 
//  })

app.listen(process.env.PORT||8000, () => console.log('server is running on port 8000'))