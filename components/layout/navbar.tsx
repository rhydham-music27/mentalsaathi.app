"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/store/auth.store";
import { authApi } from "@/utils/api.utils";
import { Avatar } from "../ui/avatar";
import SimpleAvatar from "../ui/imageAvatar";

export function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [islogin, setIslogin] = useState(false);
  const token = useAuthStore((state) => state.token);
  type UserData = {
    name: string;
    profile_picture: string;
  };
  const [userData, setUserData] = useState<UserData>({
    name: "",
    profile_picture: "",
  });
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/community", label: "Community" },
    { href: "/chat-with-therapist", label: "Chat With Therapist" },
    { href: "/journal", label: "Self Therapy" },
    { href: "/about", label: "About" },
  ];
  const mobilenavLinks = [
    { href: "/", label: "Home" },
    { href: "/community", label: "Community" },
    { href: "/chat-with-therapist", label: "Chat With Therapist" },
    { href: "/journal", label: "Self Therapy" },
    { href: "/about", label: "About" },
    { href: "/signup", label: "signup" },
    { href: "/login", label: "login" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
  const hasHydrated = useAuthStore((state) => {
    return state.hasHydrated;
  });
  const checkLoginState = async () => {
    console.log(token);
    authApi
      .post(
        "/authenticate",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setIslogin(true);
        setUserData((previous) => ({
          ...previous,
          name: response.data.name,
          profile_picture: response.data.profile_picture,
        }));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    if (hasHydrated && token) {
      checkLoginState();
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-1">
              <Brain className="w-6 h-6 text-purple-600" />
              <Heart className="w-5 h-5 text-pink-500" />
            </div>
            <span className="text-xl font-bold text-gray-800">
              MentalSaathi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors font-medium ${
                  isActive(link.href)
                    ? "text-purple-600 border-b-2 border-purple-600 pb-1"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {islogin ? (
              <p className="`transition-colors font-medium pl-3 flex justify-center items-center gap-3 text-gray-700">
                {" "}
                <SimpleAvatar src={userData.profile_picture} />
                {userData.name}
              </p>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-100 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-3">
              {mobilenavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors font-medium px-2 py-1 ${
                    isActive(link.href)
                      ? "text-purple-600"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
