import "./HomePage.css";
export function HomePage() {
  return (
    <div className="layout">
      <div className="content">
        <section className="section-items">
          <h2>Популярные треки</h2>

          <div className="tracks-grid">
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

      {/* 3. Нижняя панель плеера */}
      <footer className="player-bar">
        <div>Сейчас играет: Ничего</div>
        <div>[Кнопки управления]</div>
        <div>[Громкость]</div>
      </footer>
    </div>
  );
}
