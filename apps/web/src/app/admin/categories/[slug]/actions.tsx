"use client"

import type { Category } from "@openalternative/db/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CategoriesDeleteDialog } from "~/app/admin/categories/_components/categories-delete-dialog"
import { CategoryActions } from "~/app/admin/categories/_components/category-actions"
import type { DataTableRowAction } from "~/types"

type UpdateCategoryActionProps = {
  category: Category
}

export const UpdateCategoryActions = ({ category }: UpdateCategoryActionProps) => {
  const router = useRouter()
  const [rowAction, setRowAction] = useState<DataTableRowAction<Category> | null>(null)

  return (
    <>
      <CategoryActions category={category} setRowAction={setRowAction} />

      <CategoriesDeleteDialog
        open={rowAction?.type === "delete"}
        onOpenChange={() => setRowAction(null)}
        categories={rowAction?.data ? [rowAction?.data] : []}
        showTrigger={false}
        onSuccess={() => router.push("/admin/categories")}
      />
    </>
  )
}
