import { Card } from "../Card/Card";
import "./CardSection.css";
import { DEFAULT_PRIORITY_CARDS } from "./CardSection.constants";

export interface CardSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

interface CardSectionProps {
  title: string;
  action?: React.ReactNode;
  items: CardSectionItem[];
  linkTemplate?: (item: CardSectionItem) => string;
  priorityCardsAmount?: number;
  /**
   * Rendered in place of the cards when there are none. Without it an empty
   * section disappears entirely, heading and action included.
   */
  emptyState?: React.ReactNode;
}

export function CardSection({
  title,
  items,
  linkTemplate,
  priorityCardsAmount = DEFAULT_PRIORITY_CARDS,
  action,
  emptyState,
}: CardSectionProps) {
  const isEmpty = items.length === 0;

  if (isEmpty && !emptyState) return null;

  return (
    <section>
      <div className="flex items-center gap-2">
        <h2 className="card-section__title">{title}</h2>
        {action}
      </div>
      {isEmpty ? (
        emptyState
      ) : (
        <div className="card-section__items">
          {items.map((item, index) => (
            <Card
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              imageUrl={item.imageUrl}
              linkUrl={linkTemplate?.(item)}
              priority={index < priorityCardsAmount ? "high" : "low"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
