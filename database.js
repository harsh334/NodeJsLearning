const {MongoClient} = require('mongodb');

const url = 'mongodb+srv://LearningMongo:lZAFodr55fcMUrcl@cluster0.drbbk.mongodb.net/';
const client = new MongoClient(url);

const dbName = 'LearningNode';

async function main(){
   await client.connect();
   console.log("Client connected successfully");
   const db = client.db(dbName);
   const collection = db.collection('NamsteNode');

   
   //find specific
   // const filteredDocs = await collection.find({ "fistName":"harsh" }).toArray();
   // console.log('Found documents filtered by { "fistName":"harsh" } =>', filteredDocs);
   
   //insert a data
   // const insertResult = await collection.insertMany([{ "fistName":"gaurav","lastName":"sharma" },{ "fistName":"bhanu","lastName":"singh" }]);
   // console.log('Inserted documents =>', insertResult);

   //update a data
   // const updateResult = await collection.updateOne({"fistName":"bhanu"}, { $set: {"lastName":"pratap" } });
   // console.log('Updated documents =>', updateResult);

   // delte a data
   const deleteResult = await collection.deleteMany({"fistName":"bhanu"});
   console.log('Deleted documents =>', deleteResult);

   //find all
   const findResult = await collection.find({}).toArray();
   console.log('Found documents =>', findResult);


   return 'done';
   
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());