import { Link } from "react-router";
import "./Card.css";

export interface CardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  priority?: boolean;
}

export function Card({
  title,
  subtitle,
  imageUrl,
  linkUrl,
  priority = false,
}: CardProps) {
  const content = (
    <>
      <div className="card__cover">
        <img
          src={imageUrl}
          className="card__cover-img"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <p className="card__title">{title}</p>
      {subtitle && <p className="card__subtitle">{subtitle}</p>}
    </>
  );

  if (linkUrl) {
    return (
      <Link to={linkUrl} className="card">
        {content}
      </Link>
    );
  }

  return <div className="card">{content}</div>;
}
