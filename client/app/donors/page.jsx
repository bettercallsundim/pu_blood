import Navbar from "../../components/Navbar";
import FetchDonors from "../../components/FetchDonors.jsx";
export default async function page() {
  return (
    <div className="text-black">
      <Navbar />
      <FetchDonors />
    </div>
  );
}
