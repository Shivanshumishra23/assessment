const express = require('express');
const mongoose = require('mongoose');

const Product = require('./productModel');

const app = express();

app.use(express.json());

// routes 
app.get('/',(req, res)=>{
    res.send("Hello, world!");
})

app.get("/product", async(req, res)=>{
    try {
      const count = await Product.countDocuments(id);
      console.log(count);
      res.status(200);
     
     } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message});
    }
 })

 const dataToAdd = [
  {
     name: 'Document 1',
     quantity: 4,
     price: 236
   },
   {
    name: 'Document 2',
    quantity: 4,
    price: 236
  },
  {
    name: 'Document 3',
    quantity: 4,
    price: 236
  },
  {
    name: 'Document 4',
    quantity: 4,
    price: 236
  },
  {
    name: 'Document 5',
    quantity: 4,
    price: 236
  },
  {
    name: 'Document 6',
    quantity: 4,
    price: 236
  },
  {
    name: 'Document 7',
    quantity: 4,
    price: 236
  },
  {
    name: 'Document 8',
    quantity: 4,
    price: 236
  },
  {
    name: 'Document 9',
    quantity: 4,
    price: 236
  },
  {
    name: 'Document 10',
    quantity: 4,
    price: 236
  },
  {
    name: 'Document 11',
    quantity: 4,
    price: 236
  },
  {
    name: 'Document 12',
    quantity: 4,
    price: 236
  },
  {
    name: 'Document 13',
    quantity: 4,
    price: 236
  },
  {
    name: 'Document 14',
    quantity: 4,
    price: 236
  },
  {
    name: 'Document 15',
    quantity: 4,
    price: 236
  },
  
];


async function selectAndDeleteDocuments() {
  try {
    // Select 5 documents
    const documents = await Product.find().limit(5);
    console.log('Selected documents:', documents);

    // Delete selected documents
    const result = await Product.deleteMany({ _id: { $in: documents.map(doc => doc._id) } });
    console.log('Deleted count:', result.deletedCount);
} catch (error) {
    console.error('Error selecting and deleting documents:', error);
}
}
 
 async function countDocuments() {
  
  
  try {

    await selectAndDeleteDocuments();

      const count = await Product.countDocuments();
      console.log('Total count:', count);

      if(count<15)
      {
        if (count < 15) {
          // Add documents
          console.log('Adding documents...');
          await Product.insertMany(dataToAdd);


          console.log('Documents added successfully.');
         } else {
          console.log('No need to add documents. Count is greater than or equal to 15.');
        }
      }
      
  } catch (error) {
      console.error('Error counting documents:', error);
  } 
}


// Call the countDocuments function
countDocuments();

 app.get("/product/:id", async(req, res)=>{
    try { 
      const {id}= req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
     } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message});
    }
 })



 //update a product

 app.put("/product/:id", async(req, res)=>{
    try { 
      const {id}= req.params;
      const product = await Product.findByIdAndUpdate(id,req.body);

      if(!product) {
        return res.status(404).json({message: "Product not found with id: " + id});
      }
      const updatedproduct = await Product.findById(id)
      res.status(200).json(updatedproduct);
     } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message});
    }
 })

//delete
app.delete("/product/:id", async(req, res)=>{
    try { 
      const {id}= req.params;
      const product = await Product.findByIdAndDelete(id);
      if(!product) {
        return res.status(404).json({message: "Product not found with id: " + id});
      }
    
      res.status(200).json(product);
     } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message});
    }
 })

app.post("/product", async(req, res)=>{
   try {
     const product = await Product.create(req.body);
     res.status(200).json(product);
    } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message});
   }
})




mongoose
.connect('mongodb://127.0.0.1:27017/crud')
.then(()=>{
    console.log("Mongodb connected")
    app.listen(8000 , ()=>{
    console.log("listening on port 8000");
})
})
.catch((err)=>console.log("Mongo Error" ,err));


