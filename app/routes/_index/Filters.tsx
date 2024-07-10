import { useLocalStorage, useMediaQuery } from "@uidotdev/usehooks"
import { PanelBottomCloseIcon, PanelBottomOpenIcon } from "lucide-react"
import type { HTMLAttributes } from "react"
import { useInstantSearch } from "react-instantsearch"
import { Button } from "~/components/Button"
import { cx } from "~/utils/cva"
import { Refinements } from "./Refinements"
import { SearchBox } from "./SearchBox"
import { SortBy } from "./SortBy"

export const Filters = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const isMobile = useMediaQuery("only screen and (max-width : 768px)")
  const [isFiltersOpen, setIsFiltersOpen] = useLocalStorage("filtersOpen", false)
  const { results } = useInstantSearch()

  const sortByItems = [
    { value: "openalternative", label: "Relevance" },
    { value: "openalternative_created_desc", label: "Latest" },
    { value: "openalternative_name_asc", label: "Name" },
    { value: "openalternative_stars_desc", label: "Stars" },
    { value: "openalternative_forks_desc", label: "Forks" },
    { value: "openalternative_lastcommit_desc", label: "Last Commit" },
  ]

  const hitsPerPageItems = [
    { value: 17, label: "18 per page", default: isMobile },
    { value: 35, label: "36 per page", default: !isMobile },
    { value: 71, label: "72 per page" },
  ]

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cx("flex flex-wrap gap-x-2 gap-y-3 w-full md:flex-nowrap", className)}
        {...props}
      >
        <SearchBox className="w-full md:max-w-[calc(66%+6px)]" />
        <SortBy items={sortByItems} className="flex-1" />

        <Button
          type="button"
          size="md"
          variant="secondary"
          suffix={isFiltersOpen ? <PanelBottomOpenIcon /> : <PanelBottomCloseIcon />}
          onClick={() => setIsFiltersOpen(prev => !prev)}
          className="flex-1"
        >
          {isFiltersOpen ? "Hide" : "Show"} Filters
        </Button>
      </div>

      {isFiltersOpen && (
        <>
          <Refinements />

          <div className="flex items-center justify-between gap-4 text-xs text-secondary">
            <p>
              Found <strong className="font-medium text-foreground">{results?.nbHits}</strong>{" "}
              results in {results?.processingTimeMS}ms
            </p>
          </div>
        </>
      )}
    </div>
  )
}
