const Publishkey = 'pk_test_51OnD5DSHKuOJ2OzwK75MUOL0gh3uRoE1bZcBAtUwHfNutdDO82rga092Oh38PgDgZWS3v3gGqSKUM8BUrll0Ln6800rCwKR3jc'

const Secretkey = 'sk_test_51OnD5DSHKuOJ2Ozwfov2PAvt9eVPFPNr1OW69TbjybEKQigT7xG4ecDE78yGUj2bzmJdswdhDXfRyE6yYutcUZXR00rtZOBiAj'

const Stripe = require('stripe')('sk_test_51OnD5DSHKuOJ2Ozwfov2PAvt9eVPFPNr1OW69TbjybEKQigT7xG4ecDE78yGUj2bzmJdswdhDXfRyE6yYutcUZXR00rtZOBiAj')



const Express = require('express')

const App = Express()

const Mongoose = require('mongoose')

const BCRYPT = require('bcryptjs')

const CORS = require('cors')

App.use(Express.urlencoded())

App.use(Express.json())

// App.use(CORS())


App.use(CORS({
    origin: 'http://localhost:3000', // Allow requests from this origin
    
    credentials: true,
}))

App.set('views', './Views');

App.set('view engine', 'ejs');


const Data = require('./Movies.json')

const Filesystem = require('fs')



Mongoose.connect('mongodb+srv://Phani2612:2612@cluster0.nxfzz84.mongodb.net/BookingDatabase?retryWrites=true&w=majority&appName=Cluster0')



// /////////////////////Contact

const ContactSchema = new Mongoose.Schema({

     Name : {
          type : String
     },

     Email : {

          type : String
     },

     Message : {

          type : String
     }

})


const ContactModel = Mongoose.model("Contact",ContactSchema)


// ///////////////////////


// ////////////////////////////////////////////////////////////////////////Register Schema

const RegisterSchema = new Mongoose.Schema({

      Username : {

         type : String,

       
      },

      Email : {
         
         type : String,

         unique : true

      },

      Password : {

          type : String,

      }
})


const RegisterModel = Mongoose.model("Register" , RegisterSchema)



// ///////////////////////////////////////////////////////////////////////// Movie schema



const Movieschema = new Mongoose.Schema({

     id : {

          type : Number,
          unique : true
     },

     

     movie_name : {

          type : String
     },

     image_url : {

          type : String
     },

     description : {

          type : String
     },

     Location : {

          type : String
     },

     Genre : {

          type : String
     },

     Censor : {

          type : String
     },

     Location : {

          type : String
     },

     Dates : []
})

const Moviemodel = Mongoose.model('Movies' , Movieschema)



// /////////////////////////////////////////////// All Movies




const AllMovieschema = new Mongoose.Schema({

     id : {

          type : Number,
          unique : true
     },

     

     movie_name : {

          type : String
     },

     image_url : {

          type : String
     },

     description : {

          type : String
     },

     Location : {

          type : String
     },

     Genre : {

          type : String
     },

     Censor : {

          type : String
     }
})

const AllMoviemodel = Mongoose.model('AllMovies' , AllMovieschema)















// ///////////////////////////////////////////////////////////////////////////////User schema



const Userschema = new Mongoose.Schema({


     Email : {

          type : String
     },

     Password : {

          type : String
     },

     // MovieID : {

     //      type : Mongoose.Schema.Types.ObjectId,

     //      ref : Moviemodel
     // }

     LocationID : [],

     MovieID : []


})


const Usermodel = Mongoose.model('Users' , Userschema)





// ///////////////////////////////////////////////////////////////////////////////////// Showschema

const ShowSchema = new Mongoose.Schema({

     id : {

          type : Number,
          unique : true
     },

     Location : {

          type : String
     },

     Name : {

          type : String
     },

     SeatID : []

})

const ShowModel = Mongoose.model("Shows",ShowSchema)

// //////////////////////////////////////////////////////////////// Seat Schema

const SeatSchema = new Mongoose.Schema({

      id : {

          type : Number,
          unique : true
      },

      price : {

          type : Number
      },

      booked : {

          type : Boolean
      }
})

const SeatModel = Mongoose.model("Seats" , SeatSchema)



// /////////////////////////////////////////////// Location schema


const LocationSchema = new Mongoose.Schema({

     //   id : {

     //       type : Number
     //   },

       name : {

           type : String
       },

       AllUsers : []
})


const LocationModel = Mongoose.model("Location" , LocationSchema)





///////////////////////////////////////////////////////////////////////////////////Theater Schema


const TheaterSchema = new Mongoose.Schema({
     
     id:{

          type : Number,
          unique : true
     },


     Name : {

          type : String
     },

     Location : {

         type : String
     },

     
     Date1 : [],

     Date2 : [],

     Date3 : [],

     Seats : [],

     // MovieID : [],

     MovieName : {

          type : String
     }

})


const TheaterModel = Mongoose.model("Theater" , TheaterSchema)

// /////////////////////////////////////////////////Booking schema

const BookingSchema = new Mongoose.Schema({

        TheaterID : [],

        MovieID : [],

        ShowID : [],

      SeatID : [],

      UserID : {

          type : String
      },

      Total : {

          type : Number
      }



})


const BookingModel = Mongoose.model("Booking",BookingSchema)
// ///////////////////////////////////////////////


const OrderConfirmSchema = new Mongoose.Schema({

     TheaterID : [],

     MovieID : [],

     ShowID : [],

   SeatID : [],

   UserID : {

       type : String
   },

   Total : {

       type : Number
   }



})


const OrderConfirmModel = Mongoose.model("Confirmation",OrderConfirmSchema)



// /////////////////////////////////////////////////////////////////////




const OrderDisplayschema = new Mongoose.Schema({

     TheaterID : [],

     MovieID : [],

     ShowID : [],

   SeatID : [],

   UserID : {

       type : String
   },

   Total : {

       type : Number
   }



})


const OrderDisplayModel = Mongoose.model("OrderDisplay",OrderConfirmSchema)




// //////////////////////////////////////////////////////////////////////////////////


App.post('/register' , async function(req,res)
{

     const Myusername = req.body.username

     const MyEmail = req.body.email

     const Mypassword = req.body.password

     const Myconfirm = req.body.confirmpassword 

    

     const Hashedpassword = await BCRYPT.hash(Mypassword , 10)

     // console.log(Hashedpassword)

     const Checkdata = await RegisterModel.findOne({Email : MyEmail})
     

     if(Checkdata)
     {
          res.send("Already exist")
     }
     


     else{




          if(Mypassword === Myconfirm)
          {
     
     
               
          new RegisterModel({
     
               Username : Myusername,
     
               Email : MyEmail,
     
               Password : Hashedpassword
     
               
     
     
     
          }).save().then(function()
          {
              res.send("/login")
          }).catch(function(error)
          {
              
              res.send(Error)
          })
     
          }




     }


     
})

App.post('/login' , async function(req , res)
{

     // console.log(req.body)

     const MyEmail = req.body.email


     const Result = await RegisterModel.findOne({Email : MyEmail })

     const Checkdata = await Usermodel.findOne({Email : MyEmail})

     if(Result != null)
     {
          const Mypassword = req.body.password

          const Actualpassword = Result.Password


          const Confirmation = await BCRYPT.compare(Mypassword , Actualpassword)


          if(Confirmation === true)
          {

               if(!Checkdata)
               {
                    new Usermodel({

                         Email : MyEmail,
     
                         Password : Actualpassword,
     
                         // MovieID : `5f4b32a689ee4120d855cf21`
                    }).save()
                    
                    res.send("/Home")
               }

               else{

                    res.send("/Home")
               }
          }

          else{

               res.send("/login")
          }


     }

     else{

          res.send('/register')
     }

})


App.get('/all' , async function(req,res)
{
    
     const Fetcheddata = await AllMoviemodel.find()

     res.send(Fetcheddata)


})



App.get('/data' , async function(req,res)
{
      const Fetcheddata = await Moviemodel.find()

      res.send(Fetcheddata)


})


App.post('/book' , async function(req,res)
{
     const ObjectID = req.body._id
     
     const MyEmail = req.body.user

     const ID = req.body.id

     const FetchedbookingID = await Moviemodel.findOne({id : ID})

     // console.log("fetched", FetchedbookingID)

     // console.log(req.body)

     await Usermodel.findOneAndUpdate({Email : MyEmail } , {$set : {MovieID : FetchedbookingID}} )

})


App.get('/theater' , async function(req,res)
{
     const data = await TheaterModel.find()

     res.send(data)
})


// App.get('/check' , async function(req,res)
// {
//      const data = await Usermodel.find().populate('MovieID')

//      console.log(data)
// })

App.post('/location' , async function(req,res)
{
     const UserMail = req.body.user

     const Location = req.body.Location

     console.log(Location)

     const location = req.body.Location

     const Adduser = await Usermodel.findOne({Email : UserMail})

     const Check = await LocationModel.findOne({name : Location})

     const ShowUpdate = await ShowModel.find()

     const SeatUpdate = await SeatModel.find()

     const MovieUpdate = await Moviemodel.find()

     const Theaterupdate = await TheaterModel.find()

     const Allusers = await Usermodel.find()

    
     ShowUpdate.map(async function(i)
     {
          await ShowModel.findOneAndUpdate({id : i.id} , {$set : {SeatID : SeatUpdate}})
     })

     



     if(!Check)
     {
          
          new LocationModel({

               name : Location,

               AllUsers : Allusers

          }).save().then(async function(output)
          {
               await Usermodel.findOneAndUpdate({Email : UserMail} , {$set : {LocationID : output}})
               
               console.log("Added successfully")
          }).catch(function(error)
          {
               console.error(error)
          })

          

             
          
     // //    await TheaterModel.findOneAndUpdate({id : 1} , {$set : {Shows : ShowUpdate }})

     // //    await TheaterModel.findOneAndUpdate({id : 2} , {$set : {Shows : ShowUpdate }})


      Theaterupdate.map(async function(i)
      { 
          
          console.log('hey')

          if(i.Location === location)
          {
               console.log(i.Location === location)
               await TheaterModel.findOneAndUpdate({_id : i._id} , {$set : {Date1 : ShowUpdate }})

               await TheaterModel.findOneAndUpdate({_id : i._id} , {$set : {Date2 : ShowUpdate }})

               await TheaterModel.findOneAndUpdate({_id : i._id} , {$set : {Date3 : ShowUpdate }})

               await TheaterModel.findOneAndUpdate({_id : i._id} , {$set : {Seats : SeatUpdate}})
          }

         
      })





    
          

          
     }

     else{

     await LocationModel.findOneAndUpdate({name : Location} , {$set : {AllUsers : Allusers}})

        
     }
})



App.get('/UserInfo' , async function(req,res)
{
     const UserData = await Usermodel.find()

     res.send(UserData)
})



App.get('/booking' , async function(req,res)
{
        const BookingDetails = await BookingModel.find()

        res.send(BookingDetails)
})



App.post('/booking' , async function(req,res)
{
      
     
      const SeatArray = req.body.Seats
  

      
      

      const TheaterIDforbooking = req.body.id

      const ShowIDforbooking = req.body.ID

      const Userdata = req.body.Userdetails


      if(SeatArray.length === 0)
      {
          return
      }
      
     //  console.log(Userdata)

      const MovieInformation = await Moviemodel.find()

      const Theaterinformation = await TheaterModel.findOne({id : TheaterIDforbooking})



      const SeatInformation = await SeatModel.find()
 
      let total = 0

      SeatArray.map(function(i)
      {
            SeatInformation.map(function(j)
            {
                  if(i.id === j.id)
                  {
                      total += j.price
                  }
            })
      })


      console.log(total)






      const Showinformation = await ShowModel.findOne({id:ShowIDforbooking})

      let MovieIDinformation = 0

      

      

    
      MovieInformation.map(function(i)
      {
          if(i.movie_name === Theaterinformation.MovieName)
          {
               MovieIDinformation = i.id
               
          }
      })


      const FindtheMovie = await Moviemodel.findOne({id : MovieIDinformation})
      
      


      new BookingModel({

          TheaterID : Theaterinformation,

          ShowID : Showinformation,

          MovieID : FindtheMovie,

          SeatID : SeatArray,

          UserID : Userdata,
          
          Total : total
         

         
      }).save().then(function(output)
      {
     
         
         



          console.log("Updated successfully")
      }).catch(function(error)
      {
          console.error(error)
      })
})



App.get('/:date/theater/:id/show/:ID' , async function(req,res)
{
     const TheaterID = req.params.id

     const ShowID = parseInt(req.params.ID)

     const DateID = parseInt(req.params.date)

     // console.log(DateID)

     const SendInfo = []
     
     const Seatdetails = await TheaterModel.findOne({id : TheaterID})


     Seatdetails[`Date${DateID}`].map(function(i)
     {
          if(i.id === ShowID)
          {
                SendInfo.push(i)
          }
     })

     // console.log(SendInfo)
    
     res.send(SendInfo)
     
})



App.post('/Confirm' , async function(req,res)
{
     const Nameoftheuser = req.body.Name
     
     const Theaterid = req.body.Theater

     const DateID = req.body.Date

     const ShowID = parseInt(req.body.Show)

     

     const Allbookings = await BookingModel.findOne({UserID : Nameoftheuser})

     
      

     const FindtheaterandUpdate = await TheaterModel.findOne({id:Theaterid})
     
     
     


     FindtheaterandUpdate[`Date${DateID}`].forEach(function(i)
     {

     

          //   console.log(i)

           

            if(i.id === ShowID)
            {
                  i.SeatID.forEach(function(j)
                  {
                    const BookedSeat = Allbookings.SeatID.find(BookedSeat => BookedSeat.id === j.id )
                    

                    if(BookedSeat)
                    {
                         j.booked = true
                    }

                  })

            }

     })




await TheaterModel.findOneAndUpdate({ id: Theaterid }, { [`Date${DateID}`]: FindtheaterandUpdate[`Date${DateID}`] });
     


     new OrderConfirmModel({

          TheaterID : Allbookings.TheaterID,

          MovieID : Allbookings.MovieID,

          ShowID : Allbookings.ShowID,

          SeatID : Allbookings.SeatID,

          UserID : Allbookings.UserID,

          Total : Allbookings.Total

     }).save().then(async function()
     {
           await BookingModel.findOneAndDelete({UserID : Nameoftheuser})
           console.log("Order confirmed")
     }).catch(function(error)
     {
          console.error(error)
     })


     new OrderDisplayModel({
          TheaterID : Allbookings.TheaterID,

          MovieID : Allbookings.MovieID,

          ShowID : Allbookings.ShowID,

          SeatID : Allbookings.SeatID,

          UserID : Allbookings.UserID,

          Total : Allbookings.Total

     }).save().then(function()
     {
           
           
     }).catch(function(error)
     {
          console.error(error)

     })


    
})


App.get('/Order' , async function(req,res)
{

     const OrderInfo = await OrderConfirmModel.find()


     res.send(OrderInfo)
})




App.get('/debit' , function(req,res)
{
     res.render('Debit.ejs', {Publish : Publishkey})
})



App.post('/payment' , async function(req,res)
{

       
     const OrderInfo = await OrderConfirmModel.find()




    // console.log(req.body)
    Stripe.customers.create({

        email : req.body.stripeEmail,

        source : req.body.stripeToken,

        name : "Phani",

    }).then(function(output){

        console.log(output)
     
        Stripe.paymentIntents.create({
             
            amount : 1000,

            description : "Ticket booking",

            currency : "INR",

            

            customer : output.id
        })
    }).then(async function()
    {
     //    res.send('<h3>Payment is successful</h3>')




       res.redirect('http://localhost:3000/Confirmed')
    }).catch(function()
    {
        res.send('<h3>Payment not successfull</h3>')
    })
    
})


App.get('/Confirmed' , async function(req,res)
{
     const OrderInfo = await OrderDisplayModel.find()

     res.send(OrderInfo)
})

App.delete('/:Delete' , async function(req,res)
{
     const UserName = req.params.Delete
    await OrderDisplayModel.deleteOne({UserID : UserName})

    res.send("Successfully deleted")

})



App.post('/contact' , function(req,res)
{
    const UserName = req.body.name

    const UserMail = req.body.email

    const UserMessage = req.body.message


    new ContactModel({

            Name : UserName,

            Email : UserMail,

            Message : UserMessage
    }).save().then(function()
    {
      console.log("Successfully posted")
    }).catch(function(error)
    {
       console.error(error)
    })
})





App.listen(5000 , function(req,res)
{
     console.log("Port running at 5000")
})
