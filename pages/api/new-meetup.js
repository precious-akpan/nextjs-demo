import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://preciousAkpan2000:A804ckN0pXgjHNrq@cluster0.nnexeic.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db("meetups");

    const meetupsCollection = db.collection("meetup");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    await client.close();
    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
