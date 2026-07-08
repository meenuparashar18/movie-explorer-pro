import PropTypes from "prop-types";


Spinner.propTypes = {
  label: PropTypes.string
}

export default function Spinner({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" role="status" aria-live="polite">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-marquee-line" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-marquee-gold animate-spin" />
      </div>
      <p className="text-sm text-muted tracking-wide">{label}…</p>
    </div>
  )
}