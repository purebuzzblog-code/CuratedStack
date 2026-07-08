import Image from "next/image";
import { ExternalLink, Star } from "lucide-react";
import type { Tool } from "@prisma/client";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="relative flex flex-col rounded-xl border border-gray-100 bg-white p-6 hover:shadow-md hover:border-gray-200 transition-all">
      {tool.featured && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
          <Star className="h-3 w-3 fill-brand-600 text-brand-600" />
          Featured
        </span>
      )}

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 overflow-hidden">
          {tool.logo ? (
            <Image src={tool.logo} alt={tool.name} width={48} height={48} className="object-contain" />
          ) : (
            <span className="text-lg font-bold text-gray-300">{tool.name[0]}</span>
          )}
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{tool.name}</h3>
          <span className="text-xs text-gray-400">{tool.category}</span>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600 flex-1">{tool.description}</p>

      <a
        href={tool.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-brand-400 hover:text-brand-600 transition-colors"
      >
        Visit {tool.name}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
