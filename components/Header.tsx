import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DarkThemeToggle, Navbar, Dropdown, Avatar } from "flowbite-react";
import Router, { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  // let left = (
  //   <div className="left">
  //     <Link href="/">
  //       <a className="bold" data-active={isActive("/")}>
  //         Feed
  //       </a>
  //     </Link>
  //     <style jsx>{`
  //       .bold {
  //         font-weight: bold;
  //       }

  //       a {
  //         text-decoration: none;
  //         color: var(--geist-foreground);
  //         display: inline-block;
  //       }

  //       .left a[data-active="true"] {
  //         color: gray;
  //       }

  //       a + a {
  //         margin-left: 1rem;
  //       }
  //     `}</style>
  //   </div>
  // );

  // let right = null ?? <div className="right"></div>;

  // if (status === "loading") {
  //   left = (
  //     <div className="left">
  //       <Link href="/">
  //         <a className="bold" data-active={isActive("/")}>
  //           Feed
  //         </a>
  //       </Link>
  //       <style jsx>{`
  //         .bold {
  //           font-weight: bold;
  //         }

  //         a {
  //           text-decoration: none;
  //           color: var(--geist-foreground);
  //           display: inline-block;
  //         }

  //         .left a[data-active="true"] {
  //           color: gray;
  //         }

  //         a + a {
  //           margin-left: 1rem;
  //         }
  //       `}</style>
  //     </div>
  //   );
  //   right = (
  //     <div className="right">
  //       <p>Validating session ...</p>
  //       <style jsx>{`
  //         .right {
  //           margin-left: auto;
  //         }
  //       `}</style>
  //     </div>
  //   );
  // }

  // if (!session) {
  //   right = (
  //     <div className="right">
  //       {/* <Link href="/api/auth/signin">
  //         <a data-active={isActive('/signup')}>Log in</a>
  //       </Link> */}
  //       <style jsx>{`
  //         a {
  //           text-decoration: none;
  //           color: var(--geist-foreground);
  //           display: inline-block;
  //         }

  //         a + a {
  //           margin-left: 1rem;
  //         }

  //         .right {
  //           margin-left: auto;
  //         }

  //         .right a {
  //           border: 1px solid var(--geist-foreground);
  //           padding: 0.5rem 1rem;
  //           border-radius: 3px;
  //         }
  //       `}</style>
  //     </div>
  //   );
  // }

  // if (session) {
  //   left = (
  //     <div className="left">
  //       <Link href="/">
  //         <a className="bold" data-active={isActive("/")}>
  //           Feed
  //         </a>
  //       </Link>
  //       <Link href="/drafts">
  //         <a className="bold" data-active={isActive("/drafts")}>
  //           Drafts
  //         </a>
  //       </Link>
  //       <style jsx>{`
  //         .bold {
  //           font-weight: bold;
  //         }

  //         a {
  //           text-decoration: none;
  //           color: var(--geist-foreground);
  //           display: inline-block;
  //         }

  //         .left a[data-active="true"] {
  //           color: gray;
  //           font-weight: bold;
  //         }

  //         a + a {
  //           margin-left: 1rem;
  //         }
  //       `}</style>
  //     </div>
  //   );
  //   right = (
  //     <div className="right">
  //       <div className="inline">
  //         <div className="user-profile">
  //           <Image
  //             src={session?.user?.image ?? ""}
  //             alt="Picture of the author"
  //             width={40}
  //             height={40}
  //             style={{ borderRadius: 20 }}
  //           />
  //           <span>{session?.user?.name}</span>
  //         </div>
  //       </div>
  //       <Link href="/create">
  //         <button>
  //           <a>New Article</a>
  //         </button>
  //       </Link>
  //       <button onClick={() => signOut()}>
  //         <a>Log Out</a>
  //       </button>
  //       <style jsx>{`
  //         .user-profile {
  //           background-color: transparent;
  //           display: flex;
  //           align-items: center;
  //         }
  //         .user-profile span {
  //           margin-left: 10px;
  //         }
  //         .inline {
  //           display: inline-block;
  //           padding-top: 10px;
  //         }
  //         a {
  //           text-decoration: none;
  //           color: var(--geist-foreground);
  //           display: inline-block;
  //         }

  //         p {
  //           display: inline-block;
  //           font-size: 13px;
  //           padding-right: 1rem;
  //         }

  //         a + a {
  //           margin-left: 1rem;
  //         }

  //         .right {
  //           display: flex;
  //           margin-left: auto;
  //           align-items: center;
  //         }

  //         .right a {
  //           border: 1px solid var(--geist-foreground);
  //           padding: 0.5rem 1rem;
  //           margin-top: 10px;
  //           margin-right: 5px;
  //           border-radius: 3px;
  //         }
  //       `}</style>
  //     </div>
  //   );
  // }

  return (
    <Navbar fluid={true} rounded={false} className="sticky top-0">
      <Navbar.Brand href="/">
        <Image
          src="/frantic-logo.png"
          className="h-6 sm:h-9"
          alt="Frantic Logs"
          width="40"
          height="40"
        />
        <span className="ml-3 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Frantic Logs
        </span>
      </Navbar.Brand>
      <div className="absolute right-0 flex justify-between">
        {session ? (
          <Dropdown
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
            <Dropdown.Item onClick={() => Router.push("/drafts")}>
              Drafts
            </Dropdown.Item>
            <Dropdown.Item onClick={() => Router.push("/categories")}>
              Categories
            </Dropdown.Item>
            <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar alt="User settings" className="mr-2" rounded={true} />
            }
          >
            <Dropdown.Item onClick={() => Router.push("/api/auth/signin")}>
              Sign In
            </Dropdown.Item>
          </Dropdown>
        )}

        <Navbar.Toggle />
        <DarkThemeToggle className="mr-2" />
      </div>
      <Navbar.Collapse className="ml-5">
        <Navbar.Link href="/" active={isActive("/")}>
          Popular
        </Navbar.Link>
        <Navbar.Link href="/">New</Navbar.Link>
        <Navbar.Link href="/">Topics</Navbar.Link>
        <Navbar.Link href="/">Reading List</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
