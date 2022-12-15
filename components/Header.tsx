import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DarkThemeToggle, Navbar, Dropdown, Avatar } from "flowbite-react";
import {
  HiOutlineClipboardCheck,
  HiOutlineCollection,
  HiOutlinePhotograph,
  HiOutlineLogout,
  HiOutlineLogin,
} from "react-icons/hi";
import Router, { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();
  return (
    <Navbar fluid={true} rounded={false} className="sticky top-0 pb-4">
      <Navbar.Brand href="/">
        {/* <Image
          src="/logo.png"
          className="h-6 sm:h-9"
          alt="tinkrng.dev"
          width="40"
          height="40"
        /> */}
        <span className="ml-3 self-center whitespace-nowrap text-blue-700 text-3xl font-pacifico font-semibold">
          tinkrng.dev
        </span>
      </Navbar.Brand>
      <div className="absolute right-0 top-3 flex justify-between">
        {session ? (
          <Dropdown
            className="z-50"
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                className="mr-2"
                img={session?.user?.image ?? ""}
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{session?.user?.name}</span>
              <span className="block truncate text-sm font-medium">
                {session?.user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item
              icon={HiOutlineClipboardCheck}
              onClick={() => Router.push("/drafts")}
            >
              Drafts
            </Dropdown.Item>
            <Dropdown.Item
              icon={HiOutlineCollection}
              onClick={() => Router.push("/categories")}
            >
              Categories
            </Dropdown.Item>
            <Dropdown.Item
              icon={HiOutlinePhotograph}
              onClick={() => Router.push("/gallery")}
            >
              Gallery
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiOutlineLogout} onClick={() => signOut()}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : // <Dropdown
        //   arrowIcon={false}
        //   inline={true}
        //   label={
        //     <Avatar alt="User settings" className="mr-2" rounded={true} />
        //   }
        // >
        //   <Dropdown.Item
        //     icon={HiOutlineLogin}
        //     onClick={() => Router.push("/api/auth/signin")}
        //   >
        //     Sign In
        //   </Dropdown.Item>
        // </Dropdown>
        null}

        <Navbar.Toggle />
        <DarkThemeToggle className="mr-2" />
      </div>
      <Navbar.Collapse className="ml-5">
        <Navbar.Link
          className="cursor-pointer"
          onClick={() => Router.replace("/popular")}
          active={isActive("/popular")}
        >
          Popular
        </Navbar.Link>
        <Navbar.Link
          className="cursor-pointer"
          onClick={() => Router.replace("/latest")}
          active={isActive("/latest")}
        >
          Latest
        </Navbar.Link>
        <Navbar.Link
          className="cursor-pointer"
          onClick={() => Router.replace("/topics")}
          active={isActive("/topics")}
        >
          Topics
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
