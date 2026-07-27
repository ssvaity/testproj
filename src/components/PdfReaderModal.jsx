import Dialog from './Dialog.jsx'

// Full-screen PDF reader used for library previews. Renders the file in the
// browser's built-in PDF viewer via an <iframe> — no extra dependencies.
// Open/close motion is handled by the shared animated Dialog.
export default function PdfReaderModal({ open, title, url, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      ariaLabel={title}
      panelClassName="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-surface"
    >
      <div className="flex items-center justify-between gap-4 border-b border-warm p-3">
        <div className="min-w-0">
          <p className="truncate font-headline-md text-headline-md text-primary">{title}</p>
          <p className="font-body-md text-xs text-text-muted">
            Preview — download the file for the full text.
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-text-muted transition-colors hover:text-primary"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <iframe src={url} title={title} className="w-full flex-1" />
    </Dialog>
  )
}
