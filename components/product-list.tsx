"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products")
        if (!response.ok) {
          throw new Error("Error al cargar los productos")
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2">Cargando productos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          href={`/productos/${product.id}`}
          key={product.id}
          className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="h-48 relative bg-gray-100">
            <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-contain p-4" />
          </div>
          <div className="p-4">
            <h2 className="font-semibold text-lg line-clamp-1">{product.title}</h2>
            <p className="text-gray-600 text-sm line-clamp-2 mt-1">{product.description}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
              <span className="text-sm text-gray-500">{product.category}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
