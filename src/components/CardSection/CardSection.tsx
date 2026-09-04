import { Card } from "../Card/Card";
import "./CardSection.css";
import { DEFAULT_PRIORITY_CARDS } from "./CardSection.constants";

export interface CardSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
}

interface CardSectionProps {
  title: string;
  action?: React.ReactNode;
  items: CardSectionItem[];
  linkTemplate?: (item: CardSectionItem) => string;
  priorityCardsAmount?: number;
}

export function CardSection({
  title,
  items,
  linkTemplate,
  priorityCardsAmount = DEFAULT_PRIORITY_CARDS,
  action,
}: CardSectionProps) {
  return items.length === 0 ? null : (
    <section>
      <div className="flex items-center gap-2">
        <h2 className="card-section__title">{title}</h2>
        {action}
      </div>
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
    </section>
  );
}
