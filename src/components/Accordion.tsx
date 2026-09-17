import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  content: string;
  number?: string;
  key?: React.Key;
}

export function AccordionItem({ title, content, number }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item group" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {number && <span className="text-sm font-bold text-[var(--muted)]">{number}.</span>}
          <h3 className="text-xl md:text-2xl">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
      </div>
      {isOpen && (
        <div className="mt-4 text-[var(--semi)] leading-relaxed max-w-2xl">
          {content}
        </div>
      )}
    </div>
  );
}
