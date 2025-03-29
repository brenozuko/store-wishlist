import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useFilters } from "@/hooks/use-filters";
import { GET_CATEGORIES } from "@/lib/apollo/queries";
import { Category } from "@/lib/apollo/types";
import { useQuery } from "@apollo/client";

interface FilterSidebarProps {
  minPrice: number;
  maxPrice: number;
}

export function FilterSidebar({ minPrice, maxPrice }: FilterSidebarProps) {
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const { filters, setCategory, setPriceRange, setSortBy, resetFilters } =
    useFilters();

  const handleCategoryChange = (value: string) => {
    setCategory(value ? parseInt(value, 10) : undefined);
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleReset = () => {
    resetFilters(minPrice, maxPrice);
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="font-medium text-lg mb-4">Sort By</h3>
        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select sorting" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-medium text-lg mb-4">Categories</h3>
        <RadioGroup
          value={filters.category ? String(filters.category) : ""}
          onValueChange={handleCategoryChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="" id="all-categories" />
            <Label htmlFor="all-categories">All Categories</Label>
          </div>
          {categoriesData?.categories.map((category: Category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={category.id.toString()}
                id={`category-${category.id}`}
              />
              <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-medium text-lg mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            min={minPrice}
            max={maxPrice}
            step={1}
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            className="mt-6"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={handleReset}>
        Reset Filters
      </Button>
    </Card>
  );
}
