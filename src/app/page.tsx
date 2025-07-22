"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = authClient.useSession();

  const onSubmit = async () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("Success");
        },
      }
    );
  };

  const onLogin = async () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("Success");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>SignOut</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-2 p-10 max-w-[50vw] m-auto justify-between align-top">
      <div className="w-[50vw] flex flex-col justify-cente m-auto gap-2">
        <Input
          placeholder="email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          placeholder="paswword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button onClick={onLogin}>Login</Button>
      </div>

      <div className="w-[50vw] flex flex-col justify-cente m-auto gap-2">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <Input
          placeholder="email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          placeholder="paswword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button onClick={onSubmit}>Create User</Button>
      </div>
    </div>
  );
}
