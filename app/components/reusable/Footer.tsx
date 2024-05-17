import { FaTwitter, FaSpotify, FaInstagram } from "react-icons/fa";

/**
 *
 * @returns footer of the website
 */
const Footer = () => {
  return (
    <div className="flex flex-wrap justify-between mt-14">
      <div className="flex flex-col mb-5">
        <div className="text-xl font-bold mb-8">Voyager</div>
        <div className="font-semibold">Stay connected with us</div>
        <div className="flex mt-5">
          <a href="/">
            <FaInstagram className="mr-3 text-2xl" />
          </a>
          <a href="/">
            <FaTwitter className="mr-3 text-2xl" />
          </a>
          <a href="/">
            <FaSpotify className="mr-3 text-2xl" />
          </a>
        </div>
      </div>
      <div className="flex gap-4 md:min-w-[50%] lg:max-w-[50%]">
        <div className="flex flex-col">
          <div className="font-semibold mb-8">Innovative</div>
          <div>Learn about our mission & opportunities</div>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold mb-8">Join the vibrant</div>
          <div>For brands, partnerships, and community engagement</div>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold mb-8">Get</div>
          <div>Access support and our mobile app</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
