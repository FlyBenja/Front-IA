import Link from "next/link"
import ProductList from "@/components/product-list"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Tienda Online</h1>
      <div className="flex justify-end mb-4">
        <Link
          href="/productos/nuevo"
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
        >
          Agregar Producto
        </Link>
      </div>
      <ProductList />
    </main>
  )
}
