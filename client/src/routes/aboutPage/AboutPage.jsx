import "./aboutPage.scss";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

function AboutPage() {
  const data = useLoaderData();

  return (
    <div className="aboutPage">
      <div className="aboutContainer">
        <Suspense fallback={<p>Loading content...</p>}>
          <Await
            resolve={data.aboutResponse}
            errorElement={<p>Error loading content!</p>}
          >
            {(aboutResponse) => (
              <div className="contentWrapper">
                <h1>About Us</h1>
                <p>{aboutResponse.description}</p>
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default AboutPage;
