import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { LogoutButton } from './logout-button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { FaUser } from 'react-icons/fa'
import { ExitIcon } from '@radix-ui/react-icons'

const UserButton = () => {
    const user = useCurrentUser();

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
                <LogoutButton>
            <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
                Logout
            </DropdownMenuItem>
                </LogoutButton>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}

export default UserButton