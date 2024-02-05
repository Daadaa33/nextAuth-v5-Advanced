import { auth, signOut } from "@/auth";
import Image from "next/image";
import React from "react";

const SettingPage = async () => {
  const session = await auth();
  return (
    <div className="gap-10 m-4 ">
      <p>Setting Page</p>
      <h2 className="font-bold text-xl text-blue-900">
        welcome {session?.user?.name}
      </h2>
      {/* {JSON.stringify(session)} */}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        {/* <Image src={session?.user?.image} alt={session?.user.name} height={200} width={200}/> */}
        <button type="submit">sign out</button>
      </form>
    </div>
  );
};

export default SettingPage;
