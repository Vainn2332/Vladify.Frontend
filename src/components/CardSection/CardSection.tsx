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
  onItemClick?: (id: string) => void;
}

export function CardSection({
  title,
  items,
  emptyMessage = "No items available",
  cardSize = "medium",
  onItemClick,
}: CardSectionProps) {
  return (
    <section className="card-section">
      <h2 className="card-section-title">{title}</h2>

      {items.length === 0 ? (
        <p className="card-section-empty">{emptyMessage}</p>
      ) : (
        <div className="card-section-items">
          {items.map((item) => (
            <div key={item.id} className="card-section-item">
              <Card
                title={item.title}
                subtitle={item.subtitle}
                imageUrl={item.imageUrl}
                size={cardSize}
                onClick={onItemClick ? () => onItemClick(item.id) : undefined}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
