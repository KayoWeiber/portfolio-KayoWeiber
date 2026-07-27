import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import { technologies, type TechnologyCategory } from "../data/technologies";

const CATEGORY_ORDER: TechnologyCategory[] = [
  "language",
  "frontend",
  "backend",
  "data",
  "automation",
];

const RING_RADII = [0.4, 0.68, 0.94];

interface GraphNode {
  name: string;
  icon: IconType;
  color: string;
  category: TechnologyCategory;
  x: number;
  y: number;
}

function buildNodes(radiusX: number, radiusY: number): GraphNode[] {
  const byCategory = technologies.reduce<Record<string, typeof technologies[number][]>>(
    (acc, tech) => {
      acc[tech.category] = acc[tech.category] ?? [];
      acc[tech.category].push(tech);
      return acc;
    },
    {}
  );

  const categoriesPresent = CATEGORY_ORDER.filter((category) => byCategory[category]?.length);
  const sectorSize = 360 / categoriesPresent.length;

  return categoriesPresent.flatMap((category, categoryIndex) => {
    const techs = byCategory[category];
    const sectorStart = categoryIndex * sectorSize;
    const sectorPadding = sectorSize * 0.18;
    const usableSector = sectorSize - sectorPadding * 2;

    return techs.map((tech, index) => {
      const angleWithinSector =
        techs.length > 1 ? (index / (techs.length - 1)) * usableSector : usableSector / 2;
      const angleDeg = sectorStart + sectorPadding + angleWithinSector;
      const angleRad = (angleDeg * Math.PI) / 180;
      const ring = RING_RADII[index % RING_RADII.length];

      return {
        name: tech.name,
        icon: tech.icon,
        color: tech.color,
        category: tech.category,
        x: 50 + Math.cos(angleRad) * radiusX * ring,
        y: 50 + Math.sin(angleRad) * radiusY * ring,
      };
    });
  });
}

const TechStackGraph: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = useMemo(() => buildNodes(40, 40), []);

  const edges = useMemo(() => {
    const pairs: [GraphNode, GraphNode][] = [];

    nodes.forEach((node, index) => {
      const sameCategory = nodes.filter(
        (other, otherIndex) => other.category === node.category && otherIndex > index
      );
      sameCategory.forEach((other) => pairs.push([node, other]));
    });

    return pairs;
  }, [nodes]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] py-6">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {edges.map(([from, to], index) => {
          const isHighlighted =
            hoveredNode === from.name || hoveredNode === to.name;

          return (
            <line
              key={index}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={isHighlighted ? "#38bdf8" : "#334155"}
              strokeWidth={isHighlighted ? 0.5 : 0.25}
              strokeOpacity={isHighlighted ? 0.9 : 0.45}
            />
          );
        })}

        <circle cx={50} cy={50} r={5} fill="#0ea5e9" fillOpacity={0.2} />
      </svg>

      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/50 bg-slate-950/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-sky-200">
        KW
      </span>

      {nodes.map((node) => {
        const Icon = node.icon;
        const isHovered = hoveredNode === node.name;

        return (
          <motion.div
            key={node.name}
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setHoveredNode(node.name)}
            onMouseLeave={() => setHoveredNode(null)}
            onFocus={() => setHoveredNode(node.name)}
            onBlur={() => setHoveredNode(null)}
            animate={prefersReducedMotion ? undefined : { scale: isHovered ? 1.15 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/90 shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300 sm:h-9 sm:w-9"
              style={{ borderColor: isHovered ? node.color : undefined }}
            >
              <Icon size={14} style={{ color: node.color }} aria-hidden="true" />
              <span className="sr-only">{node.name}</span>
            </button>

            {isHovered && (
              <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs font-semibold text-white shadow-lg">
                {node.name}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default TechStackGraph;
