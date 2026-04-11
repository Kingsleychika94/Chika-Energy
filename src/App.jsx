import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FooterMobileNavSheet } from "./FooterMobileNavSheet.jsx";
import "./App.css";

const featureCards = [
	{
		title: "Integrity",
		description:
			"We act with honesty, transparency, and accountability in everything we do.",
		image: "/images/integrity.jpg",
	},
	{
		title: "Reliability",
		description:
			"We deliver dependable energy solutions that customers and partners can rely on.",
		image: "/images/reliability.jpg",
	},
	{
		title: "Sustainability",
		description:
			"We build solutions that support long-term environmental and economic progress.",
		image: "/images/sustainability.jpg",
	},
	{
		title: "Innovation",
		description:
			"We continuously develop smarter and more efficient energy solutions.",
		image: "/images/innovation.jpg",
		wide: true,
	},
	{
		title: "Excellence",
		description:
			"We pursue the highest standards in quality, service, and performance.",
		image: "/images/excellence.jpg",
	},
];

const products = [
	{
		name: "CE 1-5kVA Hybrid Solar Inverter",
		image: "/images/inverter.png",
		description:
			"A hybrid solar inverter designed for home and office energy systems, featuring an LCD display for real-time monitoring, built-in charge controller, and efficient power conversion for solar and battery systems.",
	},
	{
		name: "CE 1.5KVA–2KVA Solar Hybrid System (Panels + Battery + Inverter)",
		image: "/images/hybrid.png",
		description:
			"A complete solar power solution with panels, a hybrid inverter, and battery, designed to provide reliable electricity for mall to medium household and small businesses use.",
	},
	{
		name: "CE 12V 100Ah Lithium Battery (LiFePO4)",
		image: "/images/batterypo4.jpeg",
		description:
			"A durable, lightweight lithium battery designed for solar and inverter systems, offering long lifespan, fast charging, and reliable power storage.",
	},
	{
		name: "CE 12V 230Ah Tubular Battery – Deep Cycle Solar Battery",
		image: "/images/deepcycle.jpeg",
		description:
			"A high-performance deep-cycle tubular battery designed for solar and inverter applications. Suitable for home and office backup systems, offering long service life, strong backup capacity, and reliable performance.",
	},
	{
		name: "CE Wall-Mounted Lithium Battery (Nuru Series)",
		image: "/images/nuru2.jpeg",
		description:
			"A sleek wall-mounted lithium battery designed for modern solar and inverter systems, providing efficient energy storage with a compact design ideal for homes and small businesses.",
	},
	{
		name: "CE 12V 1000Ah Lithium Battery (LiFePO4)",
		image: "/images/batterypo4(2).jpeg",
		description:
			"A durable, lightweight lithium battery designed for solar and inverter systems, offering long lifespan, fast charging, and reliable power storage.",
	},
	{
		name: "CE 48V 200Ah Lithium Battery (10.24kWh)",
		image: "/images/battery3.jpeg",
		description:
			"A high-capacity lithium battery built with a durable green casing and Chika Energy branding, designed for advanced solar and inverter systems. It delivers 10.24kWh of reliable energy storage, making it ideal for powering homes, offices, and commercial setups with long-lasting performance, fast charging, and extended lifespan.",
	},
	{
		name: "CE 12V 50000Ah Industrial Lithium Battery (LiFePO4)",
		image: "/images/battery4.jpeg",
		description:
			"A massive, high-capacity lithium battery designed for industrial and large-scale solar energy storage. Built with advanced LiFePO4 technology, it delivers extremely long backup power, high safety, and efficient performance for heavy-duty applications like estates, factories, and commercial energy system",
	},
	{
		name: "CE Solar Panel",
		image: "/images/panels.jpeg",
		description:
			"A high-efficiency, durable solar panel designed to maximize energy output while withstanding harsh weather conditions. It features advanced photovoltaic cells for superior performance, long lifespan, and reliable power generation, making it ideal for residential or commercial solar systems.",
	},
	{
		name: "CE 51.2V 1000Ah Industrial Lithium Battery (51kWh)",
		image: "/images/industrial2.jpeg",
		description:
			"A large-capacity industrial lithium battery designed for heavy-duty energy storage, featuring a durable metal casing, integrated display and control panel, and high efficiency for powering homes, businesses, and large solar system",
	},
	{
		name: "Solar System Accessories",
		image: "/images/accesories.jpeg",
		description: [
			"Solar Charge Controller",
			"MC4 Cables",
			"Multimeter / Tester",
			"Battery Disconnect Switch",
			"Fuses & Holders",
			"Connector / Terminal Blocks",
			"Ring Terminals / Cable Lugs",
			"Heat Shrink Tubing",
			"Inline / MC4 Connectors",
			"Small Accessories – Screws, fuses, test points.",
		],
	},
	{
		name: "CE 12V 200Ah Tubular Solar Battery",
		image: "/images/tubular.jpeg",
		description:
			"A high-capacity deep-cycle tubular battery designed for solar and inverter systems, providing long-lasting power storage for homes and small businesses.",
	},
];

const services = [
	{
		name: "PAYG Systems",
		description:
			"Pay-As-You-Go plans that allow customers to pay for energy solutions in affordable installments.",
		image: "/images/payg.jpeg",
	},
	{
		name: "Consultancy",
		description:
			"Professional energy advisory services to help you choose the right system for your needs.",
		image: "/images/consultation.jpeg",
	},
	{
		name: "Installation",
		description:
			"Expert end-to-end system installation for residential, commercial, and institutional projects.",
		image: "/images/installation.jpeg",
	},
	{
		name: "Concierge Services",
		description:
			"Dedicated support to manage your energy journey from product selection to deployment.",
		image: "/images/concierge.jpeg",
	},
	{
		name: "24/7 Customer Support",
		description:
			"Round-the-clock assistance to keep your systems running reliably at all times.",
		image: "/images/support.jpeg",
	},
	{
		name: "After Sales Support",
		description:
			"Ongoing maintenance, troubleshooting, and optimization to protect your long-term investment.",
		image: "/images/support2.jpeg",
	},
];

const whoWeServe = [
	{
		title: "Homes (Residential Customers)",
		description: "Reliable solutions for households, apartments, and estates.",
		icon: "/images/homes.webp",
	},
	{
		title: "Businesses (Large & Small)",
		description:
			"SMEs, corporate offices, commercial facilities, factories, and real estate developers.",
		icon: "/images/businesses.avif",
	},
	{
		title: "Institutions",
		description:
			"Churches, mosques, schools, NGOs, and community organizations.",
		icon: "/images/institutions.jpg",
	},
	{
		title: "Government (MDAs)",
		description:
			"Ministries, departments, and agencies requiring scalable energy solutions.",
		icon: "/images/governments.jpg",
	},
];

const serviceMenuItems = [
	{
		title: "Consultancy",
		description:
			"Expert guidance to design the right energy solution for your goals.",
		icon: "/images/consultation.jpeg",
	},
	{
		title: "Installation",
		description:
			"Professional setup for safe, efficient, and reliable system performance.",
		icon: "/images/installation.jpeg",
	},
	{
		title: "Concierge Services",
		description:
			"Dedicated support from planning and procurement to project delivery.",
		icon: "/images/concierge.jpeg",
	},
	{
		title: "24/7 Customer Support",
		description:
			"Always-on assistance to resolve issues quickly and minimize downtime.",
		icon: "/images/support.jpeg",
	},
	{
		title: "After Sales Support",
		description:
			"Post-installation care, maintenance, and optimization for long-term value.",
		icon: "/images/support2.jpeg",
	},
];

const offeringsMenuItems = [
	{
		title: "Solar Systems",
	},
	{
		title: "Batteries",
	},
	{
		title: "Solar Kits",
	},
	{
		title: "Inverters",
	},
	{
		title: "Solar Panels",
	},
	{
		title: "Solar Accessories",
	},
];

function NavDropdown({
	label,
	items,
	variant,
	footerMobileSubnavKey,
	onFooterMobileSheetOpen,
}) {
	const dropdownKey = label
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
	const dropdownRef = useRef(null);
	const menuPanelRef = useRef(null);
	const [footerDesktopPlacement, setFooterDesktopPlacement] = useState(null);
	const isDesktopHeaderDropdown = variant === "desktop";
	const showPanelHeader = variant === "desktop" || variant === "footer";
	const dropdownHeader =
		showPanelHeader && label !== "Who We Serve" ? `Our ${label}` : label;

	useEffect(() => {
		const shouldCloseOnOutsideClick =
			variant === "desktop" || variant === "footer";

		if (!shouldCloseOnOutsideClick) {
			return undefined;
		}

		const onDocumentClick = (event) => {
			const dropdownElement = dropdownRef.current;
			if (!dropdownElement || dropdownElement.contains(event.target)) {
				return;
			}

			dropdownElement.dataset.pinned = "false";
			dropdownElement.removeAttribute("open");
		};

		document.addEventListener("click", onDocumentClick);
		return () => {
			document.removeEventListener("click", onDocumentClick);
		};
	}, [variant]);

	useLayoutEffect(() => {
		if (variant !== "footer") {
			setFooterDesktopPlacement(null);
			return undefined;
		}

		const details = dropdownRef.current;
		if (!details) {
			return undefined;
		}

		const sync = () => {
			requestAnimationFrame(() => {
				if (window.innerWidth <= 900) {
					setFooterDesktopPlacement(null);
					return;
				}
				if (!details.open) {
					setFooterDesktopPlacement(null);
					return;
				}

				const summary = details.querySelector("summary");
				const menu = menuPanelRef.current;
				if (!summary || !menu) {
					return;
				}

				const sr = summary.getBoundingClientRect();
				const vw = window.innerWidth;
				const menuWidth = Math.min(560, vw - 32);
				let left = sr.left + sr.width / 2 - menuWidth / 2;
				left = Math.max(16, Math.min(left, vw - menuWidth - 16));
				const bottom = window.innerHeight - sr.top + 10;

				setFooterDesktopPlacement({ bottom, left, width: menuWidth });
			});
		};

		details.addEventListener("toggle", sync);
		window.addEventListener("resize", sync);
		window.addEventListener("scroll", sync, true);
		sync();

		return () => {
			details.removeEventListener("toggle", sync);
			window.removeEventListener("resize", sync);
			window.removeEventListener("scroll", sync, true);
		};
	}, [variant]);

	return (
		<details
			ref={dropdownRef}
			className={`nav-dropdown nav-dropdown-${variant} nav-dropdown-${dropdownKey}`}
			onToggle={(event) => {
				if (!event.currentTarget.open) {
					return;
				}

				const container = event.currentTarget.closest(
					".desktop-nav, .mobile-nav-links, .footer-nav",
				);
				if (!container) {
					return;
				}

				const openDropdowns = container.querySelectorAll(
					"details.nav-dropdown[open]",
				);
				openDropdowns.forEach((dropdown) => {
					if (dropdown === event.currentTarget) {
						return;
					}
					dropdown.dataset.pinned = "false";
					dropdown.removeAttribute("open");
				});
			}}
		>
			<summary
				className="nav-dropdown-summary"
				onClick={(event) => {
					if (
						variant === "footer" &&
						footerMobileSubnavKey &&
						window.matchMedia("(max-width: 900px)").matches
					) {
						event.preventDefault();
						onFooterMobileSheetOpen?.(footerMobileSubnavKey);
						return;
					}

					if (!isDesktopHeaderDropdown) {
						return;
					}

					event.preventDefault();
					const dropdownElement = event.currentTarget.parentElement;
					if (!dropdownElement) {
						return;
					}

					const isPinnedOpen = dropdownElement.dataset.pinned === "true";
					if (isPinnedOpen) {
						dropdownElement.dataset.pinned = "false";
						dropdownElement.removeAttribute("open");
						return;
					}

					dropdownElement.dataset.pinned = "true";
					dropdownElement.setAttribute("open", "");
				}}
			>
				<span className={`nav-dropdown-summary-text-header label-${variant}`}>
					{label}
				</span>
			</summary>
			<div
				ref={menuPanelRef}
				className="nav-dropdown-menu"
				role="menu"
				aria-label={label}
				style={
					footerDesktopPlacement
						? {
								position: "fixed",
								left: footerDesktopPlacement.left,
								bottom: footerDesktopPlacement.bottom,
								width: footerDesktopPlacement.width,
								top: "auto",
								right: "auto",
								transform: "none",
							}
						: undefined
				}
			>
				{showPanelHeader ? (
					<>
						<div className="nav-dropdown-panel-title">{dropdownHeader}</div>
						<img
							src={variant === "footer" ? "/line2.svg" : "/line.svg"}
							alt=""
							aria-hidden="true"
							className="nav-dropdown-panel-divider"
						/>
					</>
				) : null}
				<ul className="nav-dropdown-list">
					{items.map((item) => (
						<li key={item.title} className="nav-dropdown-item">
							{variant === "desktop" || variant === "footer" ? (
								<img
									src={variant === "desktop" ? "/bullet.svg" : "/bullet2.svg"}
									alt=""
									aria-hidden="true"
									className="nav-dropdown-item-bullet"
								/>
							) : null}
							{item.icon && variant === "mobile" ? (
								<img
									src={item.icon}
									alt=""
									aria-hidden="true"
									className="nav-dropdown-item-icon"
								/>
							) : null}
							<div className="nav-dropdown-item-copy">
								<strong>{item.title}</strong>
								{item.description ? <span>{item.description}</span> : null}
							</div>
						</li>
					))}
				</ul>
			</div>
		</details>
	);
}

const roadmapItems = [
	{
		key: "vision",
		title: "Vision",
		description: "To power progress and shape the future of energy.",
		image: "/images/about-image.jpg",
		alt: "Solar and wind renewable energy field",
	},
	{
		key: "mission",
		title: "Mission",
		description:
			"To deliver reliable, innovative, and sustainable energy solutions that empower people, businesses, and communities.",
		image: "/images/vision-image.jpg",
		alt: "Hydro power facility at sunset",
	},
];

function App() {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("");
	const [activeRoadmapItem, setActiveRoadmapItem] = useState("vision");
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);
	const [mobileSubnav, setMobileSubnav] = useState(null);
	const [footerMobileSheetKey, setFooterMobileSheetKey] = useState(null);
	const [expandedProduct, setExpandedProduct] = useState(null);

	useEffect(() => {
		document.body.style.overflow =
			isMobileNavOpen || isContactModalOpen || footerMobileSheetKey
				? "hidden"
				: "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [footerMobileSheetKey, isContactModalOpen, isMobileNavOpen]);

	useEffect(() => {
		const closeOnEscape = (event) => {
			if (event.key === "Escape") {
				setIsMobileNavOpen(false);
				setMobileSubnav(null);
				setIsContactModalOpen(false);
			}
		};

		window.addEventListener("keydown", closeOnEscape);
		return () => {
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, []);

	useEffect(() => {
		const sectionIds = [
			"home",
			"about",
			"core-values",
			"products",
			// "contact",
			// "roadmap",
		];
		const sections = sectionIds
			.map((id) => document.getElementById(id))
			.filter(Boolean);

		if (!sections.length) {
			return undefined;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const inView = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

				if (inView.length > 0) {
					setActiveSection(inView[0].target.id);
					return;
				}

				setActiveSection("");
			},
			{
				root: null,
				rootMargin: "-30% 0px -45% 0px",
				threshold: [0.2, 0.4, 0.6, 0.8],
			},
		);

		sections.forEach((section) => observer.observe(section));

		return () => {
			sections.forEach((section) => observer.unobserve(section));
			observer.disconnect();
		};
	}, []);

	useEffect(() => {
		const easeInOut = (t) =>
			t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

		const animateScrollToHash = (targetId) => {
			const targetElement = document.getElementById(targetId);
			if (!targetElement) {
				return;
			}

			const desktopHeader = window.matchMedia("(min-width: 901px)").matches
				? document.querySelector(".top-nav")
				: null;
			const headerOffset = desktopHeader
				? desktopHeader.getBoundingClientRect().height
				: 0;

			const startY = window.scrollY;
			const maxScroll =
				document.documentElement.scrollHeight - window.innerHeight;
			const targetY = Math.max(
				0,
				Math.min(
					targetElement.getBoundingClientRect().top +
						window.scrollY -
						headerOffset,
					maxScroll,
				),
			);
			const duration = 300;
			const startTime = performance.now();

			const frame = (currentTime) => {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);
				const eased = easeInOut(progress);
				window.scrollTo(0, startY + (targetY - startY) * eased);

				if (progress < 1) {
					window.requestAnimationFrame(frame);
				}
			};

			window.requestAnimationFrame(frame);
		};

		const onHashLinkClick = (event) => {
			const hashLink = event.target.closest('a[href^="#"]');
			if (!hashLink) {
				return;
			}

			const href = hashLink.getAttribute("href");
			if (!href || href === "#") {
				return;
			}

			const targetId = href.slice(1);
			const targetElement = document.getElementById(targetId);
			if (!targetElement) {
				return;
			}

			event.preventDefault();
			animateScrollToHash(targetId);
		};

		document.addEventListener("click", onHashLinkClick);
		return () => {
			document.removeEventListener("click", onHashLinkClick);
		};
	}, []);

	const closeMobileNav = () => {
		setIsMobileNavOpen(false);
		setMobileSubnav(null);
	};

	const openContactModal = () => setIsContactModalOpen(true);

	const footerMobileSheetTitle =
		footerMobileSheetKey === "offerings"
			? "Our Offerings"
			: footerMobileSheetKey === "services"
				? "Our Services"
				: footerMobileSheetKey === "who-we-serve"
					? "Who We Serve"
					: "";

	const mobileNavCollections = {
		offerings: offeringsMenuItems,
		services: serviceMenuItems.map((item) => ({
			title: item.title,
			description: item.description,
		})),
		"who-we-serve": whoWeServe.map((item) => ({
			title: item.title,
			description: item.description,
		})),
	};

	const selectedRoadmap =
		roadmapItems.find((item) => item.key === activeRoadmapItem) ||
		roadmapItems[0];

	return (
		<div className="landing-page">
			<section className="hero-section" id="home">
				<div className="hero-overlay" />
				<header className="top-nav">
					<div className="brand">
						{/* <div className="brand-mark" aria-hidden="true">
              CE
            </div>
            <div className="brand-copy">
              <strong>Chika Energy</strong>
              <span>Renewables</span>
            </div> */}
						<img
							src="CE_logo.svg"
							className="brand-logo"
							alt="Chika Energy Logo"
						/>
					</div>
					<nav className="desktop-nav">
						<a
							href="#home"
							className={activeSection === "home" ? "is-active" : ""}
						>
							Home
						</a>
						<a
							href="#about"
							className={activeSection === "about" ? "is-active" : ""}
						>
							About Us
						</a>
						<a
							href="#core-values"
							className={activeSection === "core-values" ? "is-active" : ""}
						>
							Core Values
						</a>
						{/* <a
							href="#contact"
							className={activeSection === "contact" ? "is-active" : ""}
						>
							Contact Us
						</a> */}
						<a
							href="#products"
							className={activeSection === "products" ? "is-active" : ""}
						>
							Products
						</a>
						<NavDropdown
							label="Offerings"
							items={offeringsMenuItems}
							variant="desktop"
						/>
						<NavDropdown
							label="Who We Serve"
							items={whoWeServe}
							variant="desktop"
						/>
						<NavDropdown
							label="Services"
							items={serviceMenuItems}
							variant="desktop"
						/>
					</nav>
					<a
						href="#contact"
						onClick={() => setActiveSection("contact")}
						className="quote-btn"
					>
						Contact Us
					</a>
					<button
						className="mobile-menu-btn"
						type="button"
						aria-label="Open menu"
						aria-expanded={isMobileNavOpen}
						aria-controls="mobile-menu"
						onClick={() => setIsMobileNavOpen(true)}
					>
						<img src="/hamburger.svg" alt="" aria-hidden="true" />
					</button>
				</header>

				<div className="hero-content">
					<h1>Powering the Future of Energy in Africa</h1>
					<p>
						We deliver reliable, innovative, and sustainable renewable energy
						solutions for homes, businesses, institutions, and communities.
					</p>
					<a
						href="#about"
						onClick={() => setActiveSection("about")}
						className="primary-btn"
					>
						Explore Solutions
					</a>
				</div>
			</section>

			<aside
				id="mobile-menu"
				className={`mobile-nav-panel${isMobileNavOpen ? " is-open" : ""}`}
			>
				<div
					className={`mobile-nav-slider${
						mobileSubnav ? " is-subnav-open" : ""
					}`}
				>
					<div className="mobile-nav-main">
						<button
							className="mobile-nav-close"
							type="button"
							aria-label="Close menu"
							onClick={closeMobileNav}
						>
							<img src="/close.svg" alt="" aria-hidden="true" />
						</button>

						<nav className="mobile-nav-links" aria-label="Mobile navigation">
							<a href="#home" className="is-active" onClick={closeMobileNav}>
								Home
							</a>
							<a href="#about" onClick={closeMobileNav}>
								About Us
							</a>
							<a href="#core-values" onClick={closeMobileNav}>
								Core Values
							</a>

							<a href="#products" onClick={closeMobileNav}>
								Products
							</a>
							<button
								type="button"
								className="mobile-nav-subnav-trigger"
								onClick={() => setMobileSubnav("offerings")}
							>
								<span>Offerings</span>
							</button>
							<button
								type="button"
								className="mobile-nav-subnav-trigger"
								onClick={() => setMobileSubnav("services")}
							>
								<span>Services</span>
							</button>
							<button
								type="button"
								className="mobile-nav-subnav-trigger"
								onClick={() => setMobileSubnav("who-we-serve")}
							>
								<span>Who We Serve</span>
							</button>
							<a
								href="#contact"
								className="mobile-contact-btn"
								onClick={closeMobileNav}
							>
								Contact Us
							</a>
						</nav>
					</div>

					<div
						className="mobile-nav-subpanel"
						aria-hidden={!mobileSubnav}
						aria-label="Mobile submenu"
					>
						<header className="mobile-nav-subpanel-header">
							{/* <button
								type="button"
								className="mobile-nav-subpanel-back"
								onClick={() => setMobileSubnav(null)}
								aria-label="Back"
							>
								<img src="/back.svg" alt="" aria-hidden="true" />
							</button> */}
							<strong className="mobile-nav-subpanel-title">
								{mobileSubnav === "offerings"
									? "Our Offerings"
									: mobileSubnav === "services"
										? "Our Services"
										: "Who We Serve"}
							</strong>
							<button
								className="mobile-nav-subpanel-close"
								type="button"
								aria-label="Close menu"
								onClick={() => setMobileSubnav(null)}
							>
								<img src="/close.svg" alt="" aria-hidden="true" />
							</button>
						</header>
						<img
							className="mobile-nav-subpanel-divider"
							src="/line.svg"
							alt=""
							aria-hidden="true"
						/>
						<ul className="mobile-nav-subpanel-list">
							{(mobileNavCollections[mobileSubnav] || []).map((item) => (
								<li key={item.title} className="mobile-nav-subpanel-item">
									<img
										className="mobile-nav-subpanel-bullet"
										src="/bullet.svg"
										alt=""
										aria-hidden="true"
									/>
									<div className="mobile-nav-subpanel-item-copy">
										<span className="mobile-nav-subpanel-item-title">
											{item.title}
										</span>
										{item.description ? (
											<span className="mobile-nav-subpanel-item-description">
												{item.description}
											</span>
										) : null}
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</aside>

			<main className="">
				<div className="content-shell">
					<section className="section-intro" id="about">
						<span className="section-badge">About us</span>
						<h2>Innovative Energy Solutions with Long-Term Impact</h2>
						<p>
							Chika Energy Solutions Limited is an innovative energy and
							infrastructure company committed to delivering reliable,
							efficient, and sustainable power solutions. Through advanced
							technology, strategic partnerships, and industry expertise, the
							company develops and manages energy systems that support economic
							growth and strengthen communities. With a commitment to excellence
							and long-term impact, Chika Energy Solutions provides
							forward-thinking solutions that power industries, enable
							development, and help shape the future
						</p>
					</section>

					<section className="about-roadmap" id="roadmap">
						<div className="roadmap-desktop">
							<article className="roadmap-copy">
								<h3>Future roadmap</h3>
								<p>
									Chika Energy Solutions Limited is committed to becoming the
									leading diversified energy company that makes reliable,
									affordable, and clean energy accessible to everyone. We focus
									on closing the energy gap, empowering communities, and
									enabling sustainable growth across Africa.
								</p>
								<div className="roadmap-tabs">
									{roadmapItems.map((item) => (
										<div
											key={item.key}
											className={`roadmap-tab-item${
												activeRoadmapItem === item.key ? " is-active" : ""
											}`}
										>
											<button
												type="button"
												className={`roadmap-tab${
													activeRoadmapItem === item.key ? " is-active" : ""
												}`}
												onClick={() => setActiveRoadmapItem(item.key)}
												aria-expanded={activeRoadmapItem === item.key}
											>
												{item.title}
											</button>
											<div
												className={`roadmap-tab-panel${
													activeRoadmapItem === item.key ? " is-open" : ""
												}`}
												aria-hidden={activeRoadmapItem !== item.key}
											>
												<p>{item.description}</p>
											</div>
										</div>
									))}
								</div>
							</article>
							<div key={selectedRoadmap.key} className="roadmap-visual">
								<img src={selectedRoadmap.image} alt={selectedRoadmap.alt} />
							</div>
						</div>

						<div className="roadmap-mobile-list">
							<header className="roadmap-mobile-intro">
								<h3>Future roadmap</h3>
								<p>
									Chika Energy Solutions Limited is committed to becoming the
									leading diversified energy company in Africa by delivering
									reliable, affordable, and clean energy that closes the energy
									gap and drives sustainable growth.
								</p>
							</header>
							{roadmapItems.map((item) => (
								<article key={item.key} className="roadmap-mobile-item">
									<h4>{item.title}</h4>
									<p>{item.description}</p>
									<img src={item.image} alt={item.alt} />
								</article>
							))}
						</div>
					</section>
				</div>
				<div className="content-shell core-values">
					<section className="section-intro" id="core-values">
						<span className="section-badge">Core values</span>
						<h2>Quality, Trust, and Measurable Impact</h2>
						<p>
							Chika Energy delivers reliable, sustainable, and innovative energy
							with integrity, reliability, sustainability, innovation, and
							excellence at the center of every project.
						</p>
					</section>

					<section className="features-grid">
						{featureCards.map((card) => (
							<article
								key={card.title}
								className={`feature-card${card.wide ? " is-wide" : ""}`}
							>
								<img
									src={card.image}
									alt={card.title}
									className={card.title.toLowerCase()}
								/>
								<div className="feature-card-content">
									<h4>{card.title}</h4>
									<p>{card.description}</p>
								</div>
							</article>
						))}
					</section>
				</div>

				<div className="content-shell">
					<section className="section-intro" id="products">
						<span className="section-badge">Our products</span>
						<h2>Reliable Renewable Energy Products</h2>
						<p>
							Explore our curated range of dependable solar and backup power
							equipment built for homes, businesses, and institutions.
						</p>
					</section>

					<section className="products-grid">
						{products.map((item) => (
							<article key={item.name} className="product-card">
								<div className="product-card-media">
									<img src={item.image} alt={item.name} className="pc-image" />
								</div>
								<div className="product-card-body">
									<h5>{item.name}</h5>
									<button
										type="button"
										className="product-details-toggle"
										aria-expanded={expandedProduct === item.name}
										aria-controls={`product-details-${item.name
											.toLowerCase()
											.replace(/[^a-z0-9]+/g, "-")
											.replace(/^-|-$/g, "")}`}
										onClick={() =>
											setExpandedProduct((current) =>
												current === item.name ? null : item.name,
											)
										}
									>
										<span>
											{expandedProduct === item.name
												? "Hide details"
												: "View details"}
										</span>
										<img
											className="product-details-toggle-icon"
											src="/details.svg"
											alt=""
											aria-hidden="true"
										/>
									</button>
									<div
										className={`product-details-panel${
											expandedProduct === item.name ? " is-open" : ""
										}`}
										id={`product-details-${item.name
											.toLowerCase()
											.replace(/[^a-z0-9]+/g, "-")
											.replace(/^-|-$/g, "")}`}
									>
										{Array.isArray(item.description) ? (
											<ul className="product-details-list">
												{item.description.map((entry) => (
													<li key={entry}>{entry}</li>
												))}
											</ul>
										) : (
											<p className="product-details-text">{item.description}</p>
										)}
									</div>
									<button
										type="button"
										className="product-quote-link"
										onClick={openContactModal}
									>
										<span>Get Quote</span>
										<img
											className="product-quote-link-arrow"
											src="/arrow-right-yellow.svg"
											alt=""
											aria-hidden="true"
										/>
									</button>
								</div>
							</article>
						))}
					</section>
					{/* <div className="catalog-cta">
						<button
							type="button"
							className="primary-btn catalog-btn"
							onClick={openContactModal}
						>
							View Full Catalog
						</button>
					</div> */}
				</div>

				{/* <div className="content-shell services">
					<section className="section-intro" id="services">
						<span className="section-badge">Our services</span>
						<h2>Full-Service Energy Support</h2>
						<p>
							Beyond equipment supply, we provide implementation and support
							services that help customers deploy, manage, and scale reliable
							energy systems.
						</p>
					</section>

					<section className="services-grid">
						{services.map((service) => (
							<article key={service.name} className="product-card service-card">
								<div className="product-card-media">
									<img src={service.image} alt={service.name} />
								</div>
								<div className="product-card-body">
									<h5>{service.name}</h5>
									<p className="service-card-description">
										{service.description}
									</p>
								</div>
							</article>
						))}
					</section>
				</div> */}
			</main>

			{isContactModalOpen && (
				<div
					className="contact-modal-overlay"
					onClick={() => setIsContactModalOpen(false)}
					role="presentation"
				>
					<section
						className="contact-modal"
						role="dialog"
						aria-modal="true"
						aria-labelledby="contact-modal-title"
						onClick={(event) => event.stopPropagation()}
					>
						<header className="contact-modal-header">
							<div className="contact-modal-header-icon" aria-hidden="true">
								<img src="/chat.svg" alt="" aria-hidden="true" />
							</div>
							<div className="contact-modal-header-copy">
								<h3 id="contact-modal-title">Get in touch with us</h3>
								<p className="contact-modal-subheading">
									Let&apos;s design the right energy solution for you
								</p>
							</div>
						</header>

						<div className="contact-modal-lottie" aria-hidden="true">
							{/* <DotLottieReact
								src="https://lottie.host/1c4a3817-3dd2-4b29-ae3a-21c0d93490c5/sK5HXZzxJD.lottie"
								loop
								autoplay
							/> */}
							<img
								src="/customer-service.svg"
								alt="Customer service"
								className="contact-modal-image"
							/>
						</div>

						{/* <div className="contact-modal-accent" aria-hidden="true">
							<span />
							<span />
							<span />
						</div> */}
						<div className="contact-modal-details">
							<div className="contact-modal-detail">
								<img src="/mail.svg" alt="" aria-hidden="true" />
								<p>
									<span className="contact-modal-detail-label">
										Email Address:
									</span>{" "}
									<a href="mailto:contact@chikaenergy.com">
										contact@chikaenergy.com
									</a>
								</p>
							</div>
							<div className="contact-modal-detail">
								<img src="/call2.svg" alt="" aria-hidden="true" />
								<p>
									<span className="contact-modal-detail-label">
										Phone Number:
									</span>{" "}
									<a href="tel:+2347086020732">+234 708 602 0732</a>
								</p>
							</div>
							<div>
								<a
									href="https://wa.me/2347086020732"
									target="_blank"
									rel="noreferrer"
									className="contact-modal-whatsapp"
								>
									<img src="/whatsapp.svg" alt="" aria-hidden="true" />
									<span>Chat on WhatsApp</span>
								</a>
							</div>
						</div>
					</section>
				</div>
			)}

			<section className="cta-panel" id="contact">
				<span className="section-badge light">Reach us</span>
				<h2>Let&apos;s Power Your Home, Business, or Community</h2>
				<button
					className="primary-btn mb-2"
					onClick={openContactModal}
					aria-label="Contact us"
					type="button"
				>
					Contact Us
				</button>

				<div className="cta-contact-list" aria-label="Contact information">
					<div className="cta-contact-item">
						<span className="cta-contact-location-icon" aria-hidden="true">
							<img src="/location.svg" alt="" aria-hidden="true" />
						</span>
						<p>
							<span className="cta-contact-label">
								Administrative Hub (HQ):
							</span>{" "}
							{
								"Block 3,\u200b Road 6b,\u200b Olusola Harris Way,\u200b Lekki Scheme 2,\u200b Ajah,\u200b Lagos State,\u200b Nigeria"
							}
						</p>
					</div>
					<div className="cta-contact-item">
						<span className="cta-contact-location-icon" aria-hidden="true">
							<img src="/location.svg" alt="" aria-hidden="true" />
						</span>
						<p>
							<span className="cta-contact-label">
								Operations Hub (Warehouse &amp; Logistics Centre):
							</span>{" "}
							Port Harcourt Road, Aba, Abia State, Nigeria
						</p>
					</div>
					<div className="cta-contact-item">
						<span className="cta-contact-phone" aria-hidden="true">
							<img src="/call.svg" alt="" aria-hidden="true" />
						</span>
						<p>
							<span className="cta-contact-label">Phone Number:</span>{" "}
							<a href="tel:+2347086020732">+234 708 602 0732</a>
						</p>
					</div>
				</div>
				<div className="cta-image-container">
					<img src="/images/sparks.png" className="cta-image" alt="CTA Image" />
				</div>
			</section>

			<footer className="footer">
				<div className="footer-inner">
					<img src="/CE_logo.svg" className="footer-logo" alt="Chika Energy" />
					<nav className="footer-nav" aria-label="Footer">
						<a href="#home">Home</a>
						<a href="#about">About Us</a>
						<a href="#core-values">Core Values</a>
						<a href="#products">Products</a>
						<NavDropdown
							label="Offerings"
							items={offeringsMenuItems}
							variant="footer"
							footerMobileSubnavKey="offerings"
							onFooterMobileSheetOpen={setFooterMobileSheetKey}
						/>
						<NavDropdown
							label="Services"
							items={serviceMenuItems}
							variant="footer"
							footerMobileSubnavKey="services"
							onFooterMobileSheetOpen={setFooterMobileSheetKey}
						/>
						<NavDropdown
							label="Who We Serve"
							items={whoWeServe}
							variant="footer"
							footerMobileSubnavKey="who-we-serve"
							onFooterMobileSheetOpen={setFooterMobileSheetKey}
						/>
					</nav>
					<p className="footer-copy">© Chika Energy 2026</p>
				</div>
			</footer>

			{footerMobileSheetKey ? (
				<FooterMobileNavSheet
					key={footerMobileSheetKey}
					title={footerMobileSheetTitle}
					items={mobileNavCollections[footerMobileSheetKey] || []}
					onClosed={() => setFooterMobileSheetKey(null)}
				/>
			) : null}
		</div>
	);
}

export default App;
