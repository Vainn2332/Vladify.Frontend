import "./Card.css";

interface CardProps {
  title: string;
  artist?: string;
  imageUrl: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export function Card({
  title,
  artist,
  imageUrl,
  size = "medium",
  onClick,
}: CardProps) {
  return (
    <div className={`card card--${size}`} onClick={onClick}>
      <div className="card-cover">
        <img src={imageUrl} alt="" />
      </div>
      <p className="card-title">{title}</p>
      {artist && <p className="card-artist">{artist}</p>}
    </div>
  );
}
