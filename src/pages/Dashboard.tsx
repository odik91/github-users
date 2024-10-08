import { useContext } from "react";
import { Info, Navbar, Repos, Search, User } from "../components";
import { GithubContext } from "../context/context";
import loadingImage from "../images/preloader.gif";
const Dashboard = () => {
  const { isLoading } = useContext(GithubContext);

  if (isLoading) {
    return <main>
      <Navbar />
      <Search />
      <img src={loadingImage} alt="loading" className="loading-img" />
    </main>
  }

  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
