import React from 'react';

export default function SectionHeading({ subtitle, title, description, align = "center", className = "" }) {
  const alignmentClasses = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <div className={`max-w-2xl mb-12 md:mb-16 ${alignmentClasses} ${className}`}>
      {subtitle && (
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-red/10 text-brand-orange border border-brand-red/20 mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
