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
        <div className="w-full sm:flex sm:items-center align-center sm:justify-between">
          <Footer.Title
            title="tinkrng.dev"
            className="lowercase text-3xl flex text-blue-700 font-pacifico dark:text-blue-700 mb-0"
          />
          <Footer.Copyright href="/" by="tinkrng.dev™" year={2022} />
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
