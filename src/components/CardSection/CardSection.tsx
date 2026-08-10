import { Card } from "../Card/Card";
import "./CardSection.css";

export interface CardSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
}

interface CardSectionProps {
  title: string;
  items: CardSectionItem[];
  emptyMessage?: string;
  cardSize?: "small" | "medium" | "large";
  linkTemplate?: string;
}

export function CardSection({
  title,
  items,
  emptyMessage = "No items available",
  cardSize = "medium",
  linkTemplate,
}: CardSectionProps) {
  return (
    <section>
      <h2 className="card-section-title">{title}</h2>

      {items.length === 0 ? (
        <p className="card-section-empty">{emptyMessage}</p>
      ) : (
        <div className="card-section-items">
          {items.map((item) => (
            <Card
              title={item.title}
              subtitle={item.subtitle}
              imageUrl={item.imageUrl}
              linkUrl={
                linkTemplate ? linkTemplate.replace("{id}", item.id) : undefined
              }
              size={cardSize}
            />
          ))}
        </div>
      )}
    </section>
  );
}
