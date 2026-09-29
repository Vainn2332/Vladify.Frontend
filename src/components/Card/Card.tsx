import { Link } from "react-router";
import "./Card.css";

export interface CardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  linkUrl?: string;
}

interface CardWrapperProps {
  children: React.ReactNode;
  linkUrl?: string;
}

function CardWrapper({ children, linkUrl }: CardWrapperProps) {
  if (linkUrl) {
    return (
      <Link to={linkUrl} className="card">
        {children}
      </Link>
    );
  }

  return <div className="card">{children}</div>;
}

export function Card({ title, subtitle, imageUrl, linkUrl }: CardProps) {
  return (
    <CardWrapper linkUrl={linkUrl}>
      <div className="card__cover">
        {imageUrl && (
          <img
            src={imageUrl}
            className="card__cover-img"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
      </div>
      <p className="card__title">{title}</p>
      {subtitle && <p className="card__subtitle">{subtitle}</p>}
    </CardWrapper>
  );
}
