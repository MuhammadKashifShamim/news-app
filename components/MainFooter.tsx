import React from "react";
import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
const MainFooter: React.FC = () => {
  return (
    <Footer container>
      <div className="w-full">
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="/"
            src="/frantic-logo.png"
            alt="Frantic Devlogs"
            name="Frantic Devlogs"
          />
          <Footer.Copyright href="/" by="Frantic Devlogs™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};
export default MainFooter;
