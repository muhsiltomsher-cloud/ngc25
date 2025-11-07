export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div role="region" aria-label="Product catalog">
      {children}
    </div>
  );
}

