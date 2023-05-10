import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetails(props) {
  const { image, title, description, address } = props.meetupData;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={'description'} content={description}/>
      </Head>
      <MeetupDetail
        image={image}
        title={title}
        address={address}
        description={description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://preciousAkpan2000:A804ckN0pXgjHNrq@cluster0.nnexeic.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetup");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://preciousAkpan2000:A804ckN0pXgjHNrq@cluster0.nnexeic.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetup");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();
  console.log(meetupId);
  //fetch data from server
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
