import LoadablePublic from "../layouts/public/loadable";
import LoadablePrivate from "../layouts/private/loadable";
import { useAppStore } from "../store";

const Navigation = () => {
  const { userInfo } = useAppStore();

  return userInfo ? <LoadablePrivate /> : <LoadablePublic />;
};

export default Navigation;
