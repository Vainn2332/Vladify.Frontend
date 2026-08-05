import "./HomePage.css";
export function HomePage() {
  return (
    <div className="layout">
      <div className="content">
        <section>
          <h2>Популярные треки</h2>
          <div className="section-items">
            <div className="track-card">
              <div className="track-cover"></div>
              <p className="track-title">Название трека</p>
              <p className="track-artist">Исполнитель</p>
            </div>

            <div className="track-card">
              <div className="track-cover"></div>
              <p className="track-title">Название трека</p>
              <p className="track-artist">Исполнитель</p>
            </div>

            <div className="track-card">
              <div className="track-cover"></div>
              <p className="track-title">Название трека</p>
              <p className="track-artist">Исполнитель</p>
            </div>

            <div className="track-card">
              <div className="track-cover"></div>
              <p className="track-title">Название трека</p>
              <p className="track-artist">Исполнитель</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
