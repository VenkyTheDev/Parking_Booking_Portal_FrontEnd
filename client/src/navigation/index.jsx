import LoadablePublic from "../layouts/public/loadable";
import LoadablePrivate from "../layouts/private/loadable";
import { useAppStore } from "../store";
import "../App.css";

const Navigation = () => {
  const { userInfo } = useAppStore();

  return userInfo ? <div className="content"><LoadablePrivate /></div> : <LoadablePublic />;
};

export default Navigation;
