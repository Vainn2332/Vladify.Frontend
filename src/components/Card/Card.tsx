import { Link } from "react-router";
import "./Card.css";
import { CoverImage } from "../CoverImage/CoverImage";

export interface CardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl: string;
}

interface CardWrapperProps {
  children: React.ReactNode;
  linkUrl: string;
}

function CardWrapper({ children, linkUrl }: CardWrapperProps) {
  return (
    <Link to={linkUrl} className="card">
      {children}
    </Link>
  );
}

export function Card({ title, subtitle, imageUrl, linkUrl }: CardProps) {
  return (
    <CardWrapper linkUrl={linkUrl}>
      <CoverImage
        alt="card image"
        url={imageUrl}
        className="mb-2 w-full sm:w-full"
      />
      <p className="card__title">{title}</p>
      {subtitle && <p className="card__subtitle">{subtitle}</p>}
    </CardWrapper>
  );
}
