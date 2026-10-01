import { Card } from "../../Card/Card";
import "./CardSection.css";

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
  placeholder?: React.ReactNode;
}

export function CardSection({
  title,
  items,
  linkTemplate,
  action,
  placeholder,
}: CardSectionProps) {
  const isEmpty = items.length === 0;

  if (isEmpty && placeholder === undefined) return null;

  return (
    <section>
      <div className="flex items-center gap-2">
        <h2 className="card-section__title">{title}</h2>
        {action}
      </div>
      {isEmpty ? (
        placeholder
      ) : (
        <div className="card-section__items">
          {items.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              imageUrl={item.imageUrl}
              linkUrl={linkTemplate?.(item)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
