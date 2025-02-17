import LoadablePublic from "../layouts/public/loadable";
import LoadablePrivate from "../layouts/private/loadable";
import { useAppStore } from "../store";
import Grid2 from "@mui/material/Grid2";
import "../App.css";

const Navigation = () => {
  const { userInfo } = useAppStore();

  return userInfo ? <Grid2 className="content"><LoadablePrivate /></Grid2> : <LoadablePublic />;
};

export default Navigation;
