import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between mt-2 mb-8">
      <Link href="/" className="font-bold text-2xl mr-10">
        Voyager
      </Link>
    </div>
  );
};

export default Navbar;
