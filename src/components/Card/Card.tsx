import { Link } from "react-router";
import "./Card.css";

export interface CardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  size?: "small" | "medium" | "large";
  linkUrl?: string;
  priority?: boolean;
}

export function Card({
  title,
  subtitle,
  imageUrl,
  size = "medium",
  linkUrl,
  priority = false,
}: CardProps) {
  const className = `card card--${size}`;

  const content = (
    <>
      <div className="card-cover">
        <img
          src={imageUrl}
          alt=""
          className="card-cover-img"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <p className="card-title">{title}</p>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </>
  );

  if (linkUrl) {
    return (
      <Link to={linkUrl} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
