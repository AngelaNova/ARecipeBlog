"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";

const Nav = async () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const session = await getServerSession(options);

  //page shows logout first, however, the signIn doesn't seem to work the right way
  //it automatically logs me into my account that I have signed in google via OAuth 2 - it seems that my account is somehow saved, but no other things can be done

  return (
    <nav className="flex-between w-full mb-16 pt-3 mt-5 align-items">
      <Link href="./" className="flex gap-2 flex-center l">
        {/* logo + name of the website*/}
        <Image
          src="/assets/images/logo.png"
          alt="Orange Blog logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text"> Orange Blog</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex justify-in_between position:relative left-0 items-left">
        {/* Sign In button if the session is a falsy value
        
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}

        */}

        {session ? (
          <div className="flex md:gap-5 justify-end items-center">
            <Link href="/api/auth/signin">Sign in</Link>
            {/* 
            <button
              type='button'
              onClick={() => /*signIn(providers ? providers.google.id : null)
              className='black_btn position absolute right-40'
            >
              Sign in
            </button>
            */}
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5 justify-Content:flex-end align-Items:flex-end align-Content: flex-end position absolute mt-[-3vh]">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <Link href="/api/auth/signout?callbackUrl=/">Sign Out</Link>
            {/*
            <button
              type='button'
              onClick={() =>  handleSignOut}
              className='outline_btn'
            >
              Sign Out
            </button>
            */}

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:flex relative">
        {/* Display profile picture and dropdown if signed in */}
        {toggleDropdown && (
          <div className="flex">
            {session ? (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <Link
                  href="/api/auth/signout?callbackUrl=/"
                  onClick={() => setToggleDropdown(false)}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </Link>
              </div>
            ) : (
              <Link
                href="/api/auth/signin"
                onClick={() => setToggleDropdown(false)}
                className="mt-5 w-full black_btn"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
