import { Link } from "react-router";
import "./Card.css";

export interface CardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  isPriority?: boolean;
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

export function Card({
  title,
  subtitle,
  imageUrl,
  linkUrl,
  isPriority = false,
}: CardProps) {
  return (
    <CardWrapper linkUrl={linkUrl}>
      <div className="card__cover">
        <img
          src={imageUrl}
          className="card__cover-img"
          loading={isPriority ? "eager" : "lazy"}
          decoding="async"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <p className="card__title">{title}</p>
      {subtitle && <p className="card__subtitle">{subtitle}</p>}
    </CardWrapper>
  );
}
