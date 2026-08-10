import "./Card.css";

interface CardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export function Card({
  title,
  subtitle,
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
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </div>
  );
}
