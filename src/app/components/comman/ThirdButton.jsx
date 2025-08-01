"use client";

export default function ThirdButton({ title, loading = false, disabled = false }) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={`w-full bg-[var(--Secondary-Color)] 
                  ${!disabled && !loading ? 'hover:bg-[var(--Fourth-Color)] hover:text-[var(--Secondary-Color)]' : ''} 
                  border border-[var(--Secondary-Color)]
                  text-white font-semibold py-3 text-sm transition-all
                  ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
                  flex items-center justify-center gap-2`}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {title}
    </button>
  );
}
