import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Standalone bottom sheet for footer nav dropdowns on small viewports.
 * Slides up on mount, slides down on close (backdrop, X, or Escape).
 */
export function FooterMobileNavSheet({ title, items, onClosed }) {
	const [open, setOpen] = useState(false);
	const closingRef = useRef(false);

	useLayoutEffect(() => {
		const id = requestAnimationFrame(() => setOpen(true));
		return () => cancelAnimationFrame(id);
	}, []);

	const startClose = useCallback(() => {
		if (closingRef.current) {
			return;
		}
		closingRef.current = true;
		setOpen(false);
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			window.setTimeout(() => onClosed?.(), 0);
		}
	}, [onClosed]);

	useEffect(() => {
		const onKey = (event) => {
			if (event.key === "Escape") {
				startClose();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [startClose]);

	const onPanelTransitionEnd = (event) => {
		if (event.propertyName !== "transform" || !closingRef.current) {
			return;
		}
		closingRef.current = false;
		onClosed?.();
	};

	return (
		<div
			className={`footer-mobile-nav-sheet${open ? " is-open" : ""}`}
			role="presentation"
		>
			<button
				type="button"
				className="footer-mobile-nav-sheet__backdrop"
				aria-label="Close menu"
				onClick={startClose}
			/>
			<div
				className="footer-mobile-nav-sheet__panel"
				role="dialog"
				aria-modal="true"
				aria-labelledby="footer-mobile-nav-sheet-title"
				onTransitionEnd={onPanelTransitionEnd}
			>
				<header className="footer-mobile-nav-sheet__header">
					<strong
						className="footer-mobile-nav-sheet__title"
						id="footer-mobile-nav-sheet-title"
					>
						{title}
					</strong>
					<button
						type="button"
						className="footer-mobile-nav-sheet__close"
						aria-label="Close menu"
						onClick={startClose}
					>
						<img src="/close.svg" alt="" aria-hidden="true" />
					</button>
				</header>
				<img
					className="footer-mobile-nav-sheet__divider"
					src="/line.svg"
					alt=""
					aria-hidden="true"
				/>
				<ul className="footer-mobile-nav-sheet__list">
					{items.map((item) => (
						<li key={item.title} className="footer-mobile-nav-sheet__item">
							<img
								className="footer-mobile-nav-sheet__bullet"
								src="/bullet.svg"
								alt=""
								aria-hidden="true"
							/>
							<div className="footer-mobile-nav-sheet__item-copy">
								<span className="footer-mobile-nav-sheet__item-title">
									{item.title}
								</span>
								{item.description ? (
									<span className="footer-mobile-nav-sheet__item-description">
										{item.description}
									</span>
								) : null}
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
