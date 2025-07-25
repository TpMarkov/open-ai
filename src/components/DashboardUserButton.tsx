import { authClient } from "@/lib/auth-client";
import {
  ChevronDownIcon,
  CreditCardIcon,
  Loader,
  LogOutIcon,
} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarImage } from "./ui/avatar";
import GeneratedAvatar from "./generated-avatar";
import { redirect } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";

const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const isMobile = useIsMobile();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/sign-in");
        },
      },
    });
  };

  if (isPending || !data?.user)
    return <Loader className="flex justify-center items-center w-full mb-2" />;

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
          {data.user.image ? (
            <Avatar className="mr-1">
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name}
              variant="initials"
              className="size-9 mr-3"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">{data.user.name}</p>
            <p className="text-xs truncate tw-full">{data.user.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0"></ChevronDownIcon>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{data.user.name}</DrawerTitle>
              <DrawerDescription>{data.user.email}</DrawerDescription>
              <DrawerFooter>
                <Button variant="outline" onClick={() => {}}>
                  <CreditCardIcon className="size-4 text-black"></CreditCardIcon>
                  Billing
                </Button>
                <Button variant="outline" onClick={onLogout}>
                  <LogOutIcon className="size-4 text-black"></LogOutIcon>
                  Logout
                </Button>
              </DrawerFooter>
            </DrawerHeader>
          </DrawerContent>
        </DrawerTrigger>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        {data.user.image ? (
          <Avatar className="mr-1">
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data.user.name}</p>
          <p className="text-xs truncate tw-full">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0"></ChevronDownIcon>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer flex items-center justify-between"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;
