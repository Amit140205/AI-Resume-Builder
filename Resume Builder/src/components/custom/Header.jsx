import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-3 px-5 flex justify-between shadow-md items-center">
      <Link to="/"><img src="/logo.svg" alt="logo" width={100} height={100} /></Link>
      

      {isSignedIn ? (
        <div className="flex gap-2">
          <Link to="/dashboard">
            <Button variant="outline" className="cursor-pointer">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button className="cursor-pointer">Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
