import * as React from "react";
import { Link } from "gatsby";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Button from "../components/Button";

const codeStyles = {
  color: `#8A6534`,
  padding: 4,
  backgroundColor: `#FFF4DB`,
  fontSize: `1.25rem`,
  borderRadius: 4,
};

const NotFoundPage = () => {
  return (
    <main>
      <title>Page not found</title>
      <ErrorPage title="404" subtitle="Page not found">
        <p>Sorry we couldn’t find what you were looking for.</p>
        {process.env.NODE_ENV === `development` ? (
          <>
            Try creating a page in <code style={codeStyles}>src/pages/</code>.
          </>
        ) : null}
        <Button color={`secondary`} position={`left`} to="/">
          Go home
        </Button>
      </ErrorPage>

      <script
        dangerouslySetInnerHTML={{
          __html: `plausible("404",{ props: { path: document.location.pathname } });`,
        }}
      />
    </main>
  );
};

export default NotFoundPage;
