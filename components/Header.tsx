import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DarkThemeToggle, Navbar, Dropdown, Avatar } from "flowbite-react";
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive('/')}>
          Feed
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
        }

        .left a[data-active='true'] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null ?? <div className="right"></div>;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active='true'] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        {/* <Link href="/api/auth/signin">
          <a data-active={isActive('/signup')}>Log in</a>
        </Link> */}
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a className="bold" data-active={isActive('/drafts')}>Drafts</a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active='true'] {
            color: gray;
            font-weight: bold;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <div className='inline'>
        <div className='user-profile'>
         <Image
            src={session?.user?.image ?? ''}
            alt="Picture of the author"
            width={40}
            height={40}
            style={{borderRadius: 20}}
          />
        <span>
          {session?.user?.name}
        </span>
        </div>

        </div>
        <Link href="/create">
          <button>
            <a>New Article</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log Out</a>
        </button>
        <style jsx>{`
          .user-profile{
            background-color:transparent;
            display: flex;
            align-items:center;
          }
          .user-profile span{
            margin-left:10px;
          }
          .inline{
            display: inline-block;
            padding-top:10px;
          }
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            display: flex;
            margin-left: auto;
            align-items:center;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            margin-top: 10px;
            margin-right:5px;
            border-radius: 3px;
          }

        `}</style>
      </div>
    );
  }

  return (
    <Navbar fluid={true} rounded={true}
>
  <Navbar.Brand href="https://flowbite.com/">
    <Image
      src="https://flowbite.com/docs/images/logo.svg"
      className="h-6 sm:h-9"
      alt="Flowbite Logo"
      width="24"
      height="24"
    />
    <span className="ml-3 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Flowbite
    </span>
  </Navbar.Brand>
  <div className="absolute right-0 flex justify-between">
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={<Avatar alt="User settings" className='mr-2' img={session?.user?.image ?? ''} rounded={true}/>}
    >
      <Dropdown.Header>
        <span className="block text-sm">
        {session?.user?.name}
        </span>
        <span className="block truncate text-sm font-medium">
        {session?.user?.email}
        </span>
      </Dropdown.Header>
      <Dropdown.Item>
        Sign out
      </Dropdown.Item>
    </Dropdown>
    <Navbar.Toggle />
    <DarkThemeToggle className='mr-2'/>
  </div>
  <Navbar.Collapse className='ml-5'>
    <Navbar.Link
      href="/navbars"
      active={true}
    >
      Home
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      About
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Services
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Pricing
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Contact
    </Navbar.Link>
  </Navbar.Collapse>
</Navbar>
    // <nav>
    //   {left}
    //   {right}
    //   <style jsx>{`
    //     nav {
    //       display: flex;
    //       padding: 2rem;
    //       align-items: center;
    //     }
    //   `}</style>
    // </nav>
  );
};

export default Header;
