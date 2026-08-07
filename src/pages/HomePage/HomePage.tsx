import "./HomePage.css";
import { Card } from "../../components/Card/Card.tsx";

export function HomePage() {
  return (
    <div className="layout">
      <div className="content">
        <section>
          <h2>New songs</h2>
          <div className="section-items">
            <Card
              title="some track title1"
              artist="some artist"
              imageUrl="someRoute/jpg"
              size="small"
            />

            <Card
              title="some track title2"
              artist="some artist"
              imageUrl="someRoute/jpg"
              size="medium"
            />

            <Card
              title="some track title"
              artist="some artist"
              imageUrl="someRoute/jpg"
              size="large"
            />

            <Card
              title="some track title"
              artist="some artist"
              imageUrl="someRoute/jpg"
              size="medium"
            />

            <Card
              title="some track title3"
              artist="some artist"
              imageUrl="someRoute/jpg"
              size="medium"
            />

            <Card
              title="some track title5"
              artist="some artist"
              imageUrl="someRoute/jpg"
              size="medium"
            />
          </div>
        </section>

        <section>
          <h2>My Playlists</h2>
          <div className="section-items">
            <Card
              title="some playlist1"
              imageUrl="someRoute/jpg"
              size="medium"
            />
            <Card
              title="some playlist2"
              imageUrl="someRoute/jpg"
              size="medium"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
