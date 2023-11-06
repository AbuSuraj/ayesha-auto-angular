const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sc93kvm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(401).send('unauthorized access');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
      if (err) {
          return res.status(403).send({ message: 'forbidden access' })
      }
      req.decoded = decoded;
      next();
  })

}

async function run() {
  try {
    const categoryCollection = client
      .db('ayeshaAutoReseller')
      .collection('categories');
    const productCollection = client
      .db('ayeshaAutoReseller')
      .collection('products');
    const usersCollection = client.db('ayeshaAutoReseller').collection('users');
    const bookingsCollection = client
      .db('ayeshaAutoReseller')
      .collection('bookings');
    const reportsCollection = client
      .db('ayeshaAutoReseller')
      .collection('reports');
    const paymentsCollection = client
      .db('ayeshaAutoReseller')
      .collection('payments');
    // verify admin

    const verifyAdmin = async (req, res, next) => {
      const decodedEmail = req.decoded.email;
      const query = { email: decodedEmail };
      const user = await usersCollection.findOne(query);

      if (user?.accountType !== 'admin') {
          return res.status(403).send({ message: 'forbidden access' })
      }
      next();
  }
// add a categories to db
app.post('/addcategory',verifyJWT,verifyAdmin,async (req,res) =>{
  const category = req.body;
  const result = await categoryCollection.insertOne(category);
  res.send(result);
})

// add a reported item to db
app.post('/report',verifyJWT,async (req,res) =>{
  const report = req.body;
  const result = await reportsCollection.insertOne(report);
  res.send(result);
})

    // read reportedItem from db
    app.get('/report', async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const sortBy = req.query.sort || 'productName'; // Default sorting by productName
      const order = req.query.order || 'asc'; // Default sorting order is ascending
      const query = {};
    
      const sortOptions = {};
      sortOptions[sortBy] = order === 'asc' ? 1 : -1;
    
      const cursor = reportsCollection
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);
    
      const report = await cursor.toArray();
      const totalReports = await reportsCollection.countDocuments(query);
    
      res.send({
        data: report,
        total: totalReports,
        currentPage: page,
        totalPages: Math.ceil(totalReports / limit),
      });
    });
    

    // delete a report
    app.delete('/report/:id', verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { product_id: id };
      const result = await reportsCollection.deleteOne(query);
      res.send(result);
    });
    // delete a reportedItem
    app.delete(
      '/reportedItem/:id',
      verifyJWT,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await productCollection.deleteOne(query);
        res.send(result);
      }
    );

    // read category from db
    app.get('/categories', async (req, res) => {
      const query = {};
      const cursor = categoryCollection.find(query);
      const category = await cursor.toArray();
      res.send(category);
    });

    // add a product to db
    app.post('/addproduct', verifyJWT, async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.send(result);
    });

    // read products from db
    app.get('/category/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { categoryId: id, isPaid: false };
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    // add users to db
    //  confusion
    app.post('/users', async (req, res) => {
      const users = req.body;
      const result = await usersCollection.insertOne(users);
      res.send(result);
    });
    // get a  user from db
 
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      console.log(email);
      const query = {email: email}
      const result = await usersCollection.findOne(query);
      console.log(result)
      res.send(result);
    });
    // add bookings to db
    app.post('/bookings', verifyJWT, async (req, res) => {
      const bookings = req.body;
      const result = await bookingsCollection.insertOne(bookings);
      res.send(result);
    });

    // Get all sellers
    app.get('/sellers', verifyJWT, async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
    
      const query = { accountType: 'seller' };
      const sortColumn = req.query.sort || 'name'; // Default to sorting by 'name'
      const sortOrder = req.query.order || 'asc'; // Default to ascending order
    
      const sortOptions = {};
      sortOptions[sortColumn] = sortOrder === 'asc' ? 1 : -1;
    
      const cursor = usersCollection
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit); 
      const sellers = await cursor.toArray();
      const totalSellers = await usersCollection.countDocuments(query);
    
      res.send({
        data: sellers,
        total: totalSellers,
        currentPage: page,
        totalPages: Math.ceil(totalSellers / limit),
      });
    });
    

    // delete a seller
    app.delete('/seller/:id', verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // Get all buyers
    app.get('/buyers', verifyJWT, verifyAdmin, async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
    
      const query = { accountType: 'buyer' };
    
      const sortColumn = req.query.sort || 'name'; // Default to 'name' if no sort column is provided
      const sortOrder = req.query.order || 'asc'; // Default to 'asc' if no sort order is provided
    
      const sortOptions = {};
      sortOptions[sortColumn] = sortOrder === 'asc' ? 1 : -1;
    
      const cursor = usersCollection
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort(sortOptions);
    
      const buyers = await cursor.toArray();
    
      const totalBuyers = await usersCollection.countDocuments(query);
    
      res.send({
        data: buyers,
        total: totalBuyers,
        currentPage: page,
        totalPages: Math.ceil(totalBuyers / limit),
      });
    });
    

    // delete a buyer
    app.delete('/buyer/:id', verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });
    // my products get api
    app.get('/myproducts/seller/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const cursor = productCollection.find(query);
      const myproducts = await cursor.toArray();
      res.send(myproducts);
    });
    // deleteting a product by seller
    app.delete('/product/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });
    // my orders get api
    app.get('/myorders/buyer/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const cursor = bookingsCollection.find(query);
      const myOrders = await cursor.toArray();
      res.send(myOrders);
    });

    // jwt

    app.get('/jwt', async (req, res) => {
      const email = req.query.email;
      console.log(email);
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user) {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
          expiresIn: '1h',
        });
        return res.send({ accessToken: token });
      }
      res.status(403).send({
        message: 'Unauthorized access',
        accessToken: '',
      });
    });
    // isAdmin api
    app.get('/users/admin/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      res.send({ isAdmin: user?.accountType === 'admin' });
    });
    // isSeller api
    app.get('/users/seller/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      res.send({ isSeller: user?.accountType === 'seller' });
    });
    // isBuyer api
    app.get('/users/buyer/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      res.send({ isBuyer: user?.accountType === 'buyer' });
    });

    // change product status api

    app.patch('/products/advertise/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      console.log(id);
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          isAdvertised: 'true',
        },
      };
      const result = await productCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });
    // verify seller
    app.patch('/verifySeller/:id', verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      console.log(id);
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          verify: true,
        },
      };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // advertisementItem api
    app.get('/advertisementItem', async (req, res) => {
      const query = { isAdvertised: 'true', isPaid: false };
      const cursor = productCollection.find(query);
      const advertisementItem = await cursor.toArray();
      res.send(advertisementItem);
    });

    // payment

    app.post('/create-payment-intent', async (req, res) => {
      const booking = req.body;
      console.log(booking);
      const price = booking.resalePrice;
      const amount = 1000 * 100;

      const paymentIntent = await stripe.paymentIntents.create({
        currency: 'bdt',
        amount: amount,
        payment_method_types: ['card'],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post('/payments', async (req, res) => {
      const payment = req.body;
      const result = await paymentsCollection.insertOne(payment);
      const id = payment.bookingId;
      const product_id = payment.product_id;
      const filter = { _id: ObjectId(id) };
      const query = { _id: ObjectId(product_id) };
      const updatedDoc = {
        $set: {
          paid: true,
          transactionId: payment.transactionId,
        },
      };
      const updatedDoc2 = {
        $set: {
          isPaid: true,
        },
      };
      const updatedResult = await bookingsCollection.updateOne(
        filter,
        updatedDoc
      );
      const updatedResult2 = await productCollection.updateOne(
        query,
        updatedDoc2
      );
      res.send(result);
    });

    app.get('/bookings/:id', async (req, res) => {
      const bookingId = req.params.id;
      console.log(bookingId);
      const query = { _id: ObjectId(bookingId) };
      const result = await bookingsCollection.findOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Ayesha Auto Reseller server is running');
});

app.listen(port, () => {
  console.log(`Ayesha Auto Reseller server running on ${port}`);
});
