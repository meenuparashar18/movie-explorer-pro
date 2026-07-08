import PropTypes from "prop-types";

LoadMore.propTypes = {
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  sentinelRef: PropTypes.object
}

export default function LoadMore({ hasMore, loading, onClick, sentinelRef }) {
  if (!hasMore) return null

  return (
    <div className="flex flex-col items-center py-10 gap-4">
      <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />
      <button
        onClick={onClick}
        disabled={loading}
        className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Loading…' : 'Load More'}
      </button>
    </div>
  )
}