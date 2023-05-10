import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const Homepage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name={"description"}
          content={"Browse a huge list of active React Meetups"}
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
};

// export function getServerSideProps(context) {
//   const request = context.req;
//   const response = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//     },
//   };
// }

export async function getStaticProps() {
  //fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://preciousAkpan2000:A804ckN0pXgjHNrq@cluster0.nnexeic.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetup");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default Homepage;
