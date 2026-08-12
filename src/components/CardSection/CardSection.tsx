import { Card } from "../Card/Card";
import "./CardSection.css";

const DEFAULT_PRIORITY_CARDS = 12;

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
  linkTemplate?: string;
  priorityCardsAmount?: number;
}

export function CardSection({
  title,
  items,
  emptyMessage = "No items available",
  linkTemplate,
  priorityCardsAmount = DEFAULT_PRIORITY_CARDS,
}: CardSectionProps) {
  return (
    <section>
      <h2 className="card-section__title">{title}</h2>

      {items.length === 0 ? (
        <p className="card-section__empty">{emptyMessage}</p>
      ) : (
        <div className="card-section__items">
          {items.map((item, index) => (
            <Card
              title={item.title}
              subtitle={item.subtitle}
              imageUrl={item.imageUrl}
              linkUrl={
                linkTemplate ? linkTemplate.replace("{id}", item.id) : undefined
              }
              priority={index < priorityCardsAmount}
            />
          ))}
        </div>
      )}
    </section>
  );
}
