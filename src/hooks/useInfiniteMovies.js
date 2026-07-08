import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Handles paginated movie loading with a "Load More" affordance
 * and an optional IntersectionObserver-based infinite scroll sentinel.
 *
 * fetchPage: (page) => Promise<{ results, total_pages }>
 */
export function useInfiniteMovies(fetchPage, resetKey) {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const sentinelRef = useRef(null)

  const loadPage = useCallback(
    async (pageToLoad, replace = false) => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchPage(pageToLoad)
        setMovies((prev) => (replace ? data.results : [...prev, ...data.results]))
        setTotalPages(data.total_pages || 1)
        setPage(pageToLoad)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resetKey]
  )

  // reset + load first page whenever resetKey changes (e.g. new filters/category)
  useEffect(() => {
    setMovies([])
    loadPage(1, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey])

  const loadMore = useCallback(() => {
    if (loading || page >= totalPages) return
    loadPage(page + 1)
  }, [loading, page, totalPages, loadPage])

  // infinite scroll observer
  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: '400px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [loadMore])

  return {
    movies,
    loading,
    error,
    hasMore: page < totalPages,
    loadMore,
    sentinelRef,
  }
}