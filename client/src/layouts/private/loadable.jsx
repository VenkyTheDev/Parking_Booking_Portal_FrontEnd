import loadable from "../../utils/loadable";


const LoadablePrivate = loadable(() => import("./containers/private"), {
  fallback: null,
});

export default LoadablePrivate;
