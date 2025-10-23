import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Header() {
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);
  
  // ✅ Load user from localStorage once
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("User loaded from localStorage:", parsedUser);
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  // ✅ Google login setup
  const glogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Google Login Response:", response);
      getUserProfile(response);
      setOpenDialog(false);
    },
    onError: (error) => console.error("Google Login Error:", error),
  });

  // ✅ Fetch Google user profile
  const getUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo.access_token}`
      );
      console.log("User Profile:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setOpenDialog(false);
      window.location.reload(); // Reload to reflect new user state
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // ✅ Log out function
  const handleLogout =  () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="p-3 shadow-sm flex justify-between items-center px-5">
      {/* Logo */}
      <img
        src="/logo.svg"
        alt="App Logo"
        className="h-10 w-auto bg-white dark:bg-card rounded-lg shadow-md border border-border p-1"
      />

      {/* Conditional UI */}
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
            <Button
              variant="ghost"
              className="rounded-full text-white font-medium flex items-center gap-2"
            >
              Create Trip
            </Button>
            </a>
            <a href="/my-trips">
            <Button
              variant="ghost"
              className="rounded-full text-white font-medium flex items-center gap-2"
            >
              My Trips
            </Button>
            </a>
            {/* ✅ Fixed Popover (duplicate img removed, onclick typo fixed) */}
            <Popover>
              <PopoverTrigger asChild>
                <img
                  src={user?.picture}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full cursor-pointer border border-gray-300"
                />
              </PopoverTrigger>

              <PopoverContent>
  <h2
    className="cursor-pointer"
    onClick={() => {
      googleLogout();
      localStorage.clear();
      navigate("/"); // 👈 redirect to home
      window.location.reload(); // refresh to update header state
    }}
  >
    Log Out
  </h2>
</PopoverContent>

            </Popover>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => setOpenDialog(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-colors"
            >
              Sign In
            </Button>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <img src="/logo.svg" alt="App Logo" className="h-20 w-20" />
                  </div>

                  <DialogTitle>Sign in with Google</DialogTitle>
                  <DialogDescription>
                    Sign in securely with your Google account to save your trips.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6">
                  <Button
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => glogin()}
                  >
                    <FcGoogle className="text-xl" />
                    Sign in with Google
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
