
import React from 'react';

export default function Recommendations({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50">
      <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
         <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
         Recommended for you
      </h3>
      <p className="mt-1 text-sm text-slate-500">Based on your search intent.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex cursor-default items-center rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 ring-1 ring-inset ring-indigo-700/10"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
