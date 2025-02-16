import loadable from "../../utils/loadable";

const LoadablePublic = loadable(() => import("./containers/public"), {
  fallback: null,
});

export default LoadablePublic;
