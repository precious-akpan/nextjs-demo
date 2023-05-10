import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter();

  async function handleAddMeetup(meetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name={"description"}
          content={"Add your own exciting meetups and create amazing networking opportunities!"}
        />
      </Head>
      <NewMeetupForm onAddMeetup={handleAddMeetup} />
    </>
  );
};
export default NewMeetupPage;
