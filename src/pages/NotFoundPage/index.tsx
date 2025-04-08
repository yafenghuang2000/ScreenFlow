import React from 'react';

const NotFoundPage = (): React.JSX.Element => {
  const title = process.env.PUBLIC_BAS_URL;
  return <div>404 {title ?? '--'}</div>;
};

export default NotFoundPage;
