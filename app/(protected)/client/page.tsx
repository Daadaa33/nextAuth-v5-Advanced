"use client"

import { UserInfo } from "@/components/UserInfo";
import {useCurrentUser} from "@/hooks/use-current-user"
const ServerPage =  () => {
  const user =  useCurrentUser();

  return ( 
    <UserInfo
      label="📲 Client component"
      user={user}
    />
   );
}

export default ServerPage;