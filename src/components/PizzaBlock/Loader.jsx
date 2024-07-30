import ContentLoader from 'react-content-loader';

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="119" r="107" />
    <rect x="0" y="246" rx="0" ry="0" width="280" height="32" />
    <rect x="5" y="414" rx="0" ry="0" width="92" height="27" />
    <rect x="134" y="403" rx="20" ry="20" width="147" height="47" />
    <rect x="-1" y="299" rx="6" ry="6" width="280" height="80" />
  </ContentLoader>
);

export default Loader;
