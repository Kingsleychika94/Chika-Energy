import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, useReducedMotion } from "framer-motion";
import { FooterMobileNavSheet } from "./FooterMobileNavSheet.jsx";
import "./App.css";

const EASE = [0.22, 0.7, 0.2, 1];

// Scroll-reveal: a gentle fade + rise, once, and disabled for reduced motion.
function Reveal({
	children,
	as = "div",
	delay = 0,
	y = 18,
	className,
	style,
	...rest
}) {
	const prefersReduced = useReducedMotion();
	const Tag = as;
	if (prefersReduced) {
		return (
			<Tag className={className} style={style} {...rest}>
				{children}
			</Tag>
		);
	}
	const MotionTag = motion[as] || motion.div;
	return (
		<MotionTag
			className={className}
			style={style}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "0px 0px -8% 0px" }}
			transition={{ duration: 0.6, delay, ease: EASE }}
			{...rest}
		>
			{children}
		</MotionTag>
	);
}

const featureCards = [
	{
		title: "Integrity",
		description:
			"We act with honesty, transparency, and accountability in everything we do.",
		image: "/images/INTEGRITY.jpeg",
	},
	{
		title: "Reliability",
		description:
			"We deliver dependable energy solutions that customers and partners can rely on.",
		image: "/images/reliability.jpeg",
	},
	{
		title: "Sustainability",
		description:
			"We build solutions that support long-term environmental and economic progress.",
		image: "/images/SUSTAINABILITY.jpeg",
	},
	{
		title: "Innovation",
		description:
			"We continuously develop smarter and more efficient energy solutions.",
		image: "/images/INNOVATION.jpeg",
		wide: true,
	},
	{
		title: "Excellence",
		description:
			"We pursue the highest standards in quality, service, and performance.",
		image: "/images/EXCELLENCE.jpeg",
	},
];

const products = [
	{
		name: "Dawnice 6 kVA Single-Phase Hybrid Inverter",
		brand: "Dawnice",
		category: "Hybrid Inverter",
		price: "₦765,000",
		warranty: "2 YEARS",
		description:
			"Dawnice 6 kVA single-phase hybrid inverter for solar and battery energy systems; 6 kVA rated AC output; 7,800 W maximum DC/PV input; 85-400 V battery-voltage range; 50/60 Hz operation; compact wall-mounted enclosure with integrated display and system controls.",
		image: "/images/p1.jpeg",
	},
	{
		name: "Dawnice 10 kVA Single-Phase Hybrid Inverter",
		brand: "Dawnice",
		category: "Hybrid Inverter",
		price: "₦1,479,000",
		warranty: "2 YEARS",
		description:
			"Dawnice 10 kVA single-phase hybrid inverter; 220/230/240 V rated output; 45-58 Vdc battery range with 51.2 Vdc nominal battery voltage; lithium and lead-acid battery compatibility; 15 kW maximum PV power; dual MPPT design with a 120-500 Vdc range; maximum charge current of 200 A; up to 97% inverter efficiency.",
		image: "/images/p2.jpeg",
	},
	{
		name: "Dawnice 5 kWh Lithium Battery - HZEB-LCT-5",
		brand: "Dawnice",
		category: "Lithium Battery",
		price: "₦1,357,000",
		warranty: "5+5 YEARS",
		description:
			"Wall-mounted lithium iron phosphate (LiFePO₄) battery; 5 kWh capacity; 51.2 V / 100 Ah; 6,000+ cycles; smart BMS; Bluetooth/Wi-Fi connectivity; IP54-rated enclosure.",
		image: "/images/p3.jpeg",
	},
	{
		name: "Dawnice 10 kWh Lithium Battery - HZEB-LCT-10",
		brand: "Dawnice",
		category: "Lithium Battery",
		price: "₦2,040,000",
		warranty: "5+5 YEARS",
		description:
			"Wall-mounted lithium iron phosphate (LiFePO₄) battery; 10 kWh capacity; 51.2 V / 206 Ah; 6,000+ cycles; smart BMS; Bluetooth/Wi-Fi connectivity; IP54-rated enclosure.",
		image: "/images/p4.jpeg",
	},
	{
		name: "Dawnice 16 kWh Lithium Battery - HZEB-LCT-16",
		brand: "Dawnice",
		category: "Lithium Battery",
		price: "₦2,754,000",
		warranty: "5+5 YEARS",
		description:
			"Wall-mounted lithium iron phosphate (LiFePO₄) battery; 16 kWh capacity; 51.2 V / 314 Ah; 8,000+ cycles; smart BMS; Bluetooth/Wi-Fi connectivity; IP54-rated enclosure.",
		image: "/images/p5.jpeg",
	},
	{
		name: "Dawnice 20 kWh Lithium Battery - HZEB-LCT-20",
		brand: "Dawnice",
		category: "Lithium Battery",
		price: "₦4,080,000",
		warranty: "5+5 YEARS",
		description:
			"Wall-mounted lithium iron phosphate (LiFePO₄) battery; 20 kWh capacity; 51.2 V / 410 Ah; 6,000+ cycles; smart BMS; Bluetooth/Wi-Fi connectivity.",
		image: "/images/p6.jpeg",
	},
	{
		name: "Dawnice 112.53 kWh Outdoor DC-Side Energy Storage Battery",
		brand: "Dawnice",
		category: "Commercial & Industrial Battery",
		price: "₦28,560,000",
		warranty: "5+5 YEARS - BATTERY COVERAGE",
		description:
			"Outdoor DC-side LiFePO₄ battery cabinet with 112.53 kWh nominal energy, 358.4 V nominal voltage, 101.28 kWh usable energy at 90% depth of discharge, air cooling, IP54 protection and an 8,000+ cycle rating.",
		image: "/images/p7.jpeg",
	},
	{
		name: "Dawnice 112 kWh Indoor Industrial Lithium Battery",
		brand: "Dawnice",
		category: "Commercial & Industrial Battery",
		price: "₦24,990,000",
		warranty: "5+5 YEARS",
		description:
			"Indoor industrial lithium battery energy storage system with 112 kWh nominal energy capacity. Suitable for commercial and industrial energy-storage applications.",
		image: "/images/p8.jpeg",
	},
	{
		name: "Dawnice 143 kWh Indoor Rack-Mounted Commercial Battery",
		brand: "Dawnice",
		category: "Commercial & Industrial Battery",
		price: "₦29,070,000",
		warranty: "5+5 YEARS",
		description:
			"Indoor rack-mounted commercial lithium battery system with 143 kWh energy capacity, designed for commercial facilities, industrial backup and peak-shaving applications.",
		image: "/images/p9.jpeg",
	},
	{
		name: "Dawnice 160 kWh Indoor Rack-Mounted Commercial Battery",
		brand: "Dawnice",
		category: "Commercial & Industrial Battery",
		price: "₦30,090,000",
		warranty: "5+5 YEARS",
		description:
			"Indoor rack-mounted commercial lithium battery system with 160 kWh energy capacity, intended for factory energy management, commercial backup and peak-shaving applications.",
		image: "/images/p10.jpeg",
	},
	{
		name: "Dawnice 200 kWh Outdoor Energy Storage System",
		brand: "Dawnice",
		category: "Commercial & Industrial ESS",
		price: "₦45,900,000",
		warranty: "5+5 YEARS",
		description:
			"Outdoor commercial and industrial energy storage system with 200 kWh battery capacity in an integrated cabinet platform for solar storage, backup power and energy-management applications.",
		image: "/images/p11.jpeg",
	},
	{
		name: "Dawnice 225 kWh Indoor Industrial ESS - BS09-225-R/14S",
		brand: "Dawnice",
		category: "Commercial & Industrial ESS",
		price: "₦40,290,000",
		warranty: "5+5 YEARS",
		description:
			"Rack-mounted indoor industrial energy storage system; 225 kWh capacity; presented with an 8,000-cycle rating.",
		image: "/images/p12.jpeg",
	},
	{
		name: "Dawnice 225 kWh Outdoor Commercial BESS - BS09-225-D",
		brand: "Dawnice",
		category: "Commercial & Industrial Battery",
		price: "₦47,430,000",
		warranty: "5+5 YEARS",
		description:
			"Outdoor 225 kWh DC-side battery energy storage system (BESS); 716.8 V commercial battery platform designed for stable, efficient and intelligently managed commercial and industrial energy solutions.",
		image: "/images/p13.jpeg",
	},
	{
		name: "Dawnice 125 kW / 265 kWh Integrated Hybrid Energy System",
		brand: "Dawnice",
		category: "Integrated C&I Energy System",
		price: "₦79,560,000",
		warranty: "5+5 YEARS - BATTERY COVERAGE",
		description:
			"Integrated PV-storage-genset hybrid energy system combining a 125 kW PCS with 265 kWh battery storage. Product visual also identifies fire protection, intelligent temperature control, 120 kW solar MPPT, and STS/ATS functionality.",
		image: "/images/p14.jpeg",
	},
	{
		name: "Deye 6 kW Single-Phase Off-Grid Inverter",
		brand: "Deye",
		category: "Off-Grid Inverter",
		price: "₦561,000",
		warranty: "5 YEARS",
		description:
			"Rated AC input and output active power of 6 kW; maximum charging and discharging current of 135 A; supports up to 16 units in parallel for on-grid and off-grid operation.",
		image: "/images/p15.jpeg",
	},
	{
		name: "Deye 6 kW Single-Phase Hybrid Inverter",
		brand: "Deye",
		category: "Hybrid Inverter",
		price: "₦1,428,000",
		warranty: "5 YEARS",
		description:
			"Rated power of 6 kW; maximum charging and discharging current of 135 A; supports up to 16 units in parallel for flexible residential and commercial energy systems.",
		image: "/images/p16.jpeg",
	},
	{
		name: "Deye 8 kW Single-Phase Hybrid Inverter",
		brand: "Deye",
		category: "Hybrid Inverter",
		price: "₦1,530,000",
		warranty: "5 YEARS",
		description:
			"Rated power of 8 kW; maximum charging and discharging current of 190 A; supports up to 16 units in parallel for flexible residential and commercial energy systems.",
		image: "/images/p17.jpeg",
	},
	{
		name: "Deye 10 kW Single-Phase Hybrid Inverter",
		brand: "Deye",
		category: "Hybrid Inverter",
		price: "₦1,938,000",
		warranty: "5 YEARS",
		description:
			"Rated power of 10 kW; colour touch LCD; IP65 enclosure; maximum charging and discharging current of 220 A; supports diesel-generator energy storage and up to 16 units in parallel.",
		image: "/images/p18.jpeg",
	},
	{
		name: "Deye 12 kW Single-Phase Hybrid Inverter",
		brand: "Deye",
		category: "Hybrid Inverter",
		price: "₦2,040,000",
		warranty: "5 YEARS",
		description:
			"Rated power of 12 kW; colour touch LCD; IP65 enclosure; maximum charging and discharging current of 250 A; supports diesel-generator energy storage and up to 16 units in parallel.",
		image: "/images/p19.jpeg",
	},
	{
		name: "Deye 12 kW Three-Phase Hybrid Inverter",
		brand: "Deye",
		category: "Hybrid Inverter",
		price: "₦2,040,000",
		warranty: "5 YEARS",
		description:
			"Three-phase hybrid inverter rated at 12 kW; maximum charging and discharging current of 240 A; supports up to 10 units in parallel.",
		image: "/images/p20.jpeg",
	},
	{
		name: "Deye 16 kW Single-Phase Hybrid Inverter",
		brand: "Deye",
		category: "Hybrid Inverter",
		price: "₦3,060,000",
		warranty: "5 YEARS",
		description:
			"Single-phase hybrid inverter rated at 16 kW; maximum charging and discharging current of 290 A; supports up to 16 units in parallel.",
		image: "/images/p21.jpeg",
	},
	{
		name: "Deye 16 kW Three-Phase Hybrid Inverter",
		brand: "Deye",
		category: "Hybrid Inverter",
		price: "₦3,060,000",
		warranty: "5 YEARS",
		description:
			"Three-phase hybrid inverter rated at 16 kW; maximum charging and discharging current of 300 A; supports up to 10 units in parallel.",
		image: "/images/p22.jpeg",
	},
	{
		name: "Deye 20 kW Three-Phase Hybrid Inverter",
		brand: "Deye",
		category: "Hybrid Inverter",
		price: "₦3,570,000",
		warranty: "5 YEARS",
		description:
			"Three-phase hybrid inverter rated at 20 kW; maximum charging and discharging current of 350 A; supports up to 10 units in parallel.",
		image: "/images/p23.jpeg",
	},
	{
		name: "Deye 25 kW Three-Phase High-Voltage Hybrid Inverter",
		brand: "Deye",
		category: "High-Voltage Hybrid Inverter",
		price: "₦3,672,000",
		warranty: "5 YEARS",
		description:
			"Three-phase high-voltage hybrid inverter rated at 25 kW; maximum charging and discharging current of 50 A; supports up to 10 units in parallel.",
		image: "/images/p24.jpeg",
	},
	{
		name: "Deye 30 kW Three-Phase High-Voltage Hybrid Inverter",
		brand: "Deye",
		category: "High-Voltage Hybrid Inverter",
		price: "₦4,692,000",
		warranty: "5 YEARS",
		description:
			"Three-phase high-voltage hybrid inverter rated at 30 kW; maximum charging and discharging current of 75 A; supports up to 10 units in parallel.",
		image: "/images/p25.jpeg",
	},
	{
		name: "Deye 50 kW Three-Phase High-Voltage Hybrid Inverter",
		brand: "Deye",
		category: "High-Voltage Hybrid Inverter",
		price: "₦5,610,000",
		warranty: "5 YEARS",
		description:
			"Three-phase high-voltage hybrid inverter rated at 50 kW; maximum charging and discharging current of 100 A; supports diesel-generator storage and up to 10 units in parallel.",
		image: "/images/p26.jpeg",
	},
	{
		name: "Deye 80 kW Three-Phase High-Voltage Hybrid Inverter",
		brand: "Deye",
		category: "High-Voltage Hybrid Inverter",
		price: "₦8,160,000",
		warranty: "5 YEARS",
		description:
			"Three-phase high-voltage hybrid inverter rated at 80 kW; maximum charging and discharging current of 160 A; supports diesel-generator storage and up to 10 units in parallel.",
		image: "/images/p27.jpeg",
	},
	{
		name: "Deye 5.12 kWh Low-Voltage Lithium Battery - SE-F5-C",
		brand: "Deye",
		category: "Low-Voltage Lithium Battery",
		price: "₦1,020,000",
		warranty: "5 YEARS",
		description:
			"LiFePO₄ battery; 100 Ah; nominal voltage 51.2 V; operating voltage 44.8–57.6 V; nominal energy 5.12 kWh; supports up to 32 units in parallel; approximately 41 kg; 370 × 548 × 140 mm.",
		image: "/images/p28.jpeg",
	},
	{
		name: "Deye 10.24 kWh Low-Voltage Lithium Battery - SE-G10.2",
		brand: "Deye",
		category: "Low-Voltage Lithium Battery",
		price: "₦1,734,000",
		warranty: "5 YEARS",
		description:
			"LiFePO₄ battery; 200 Ah; nominal voltage 51.2 V; operating voltage 44.8–57.6 V; nominal energy 10.24 kWh; 2P16S cell configuration; supports up to 64 units in parallel for systems up to 655 kWh.",
		image: "/images/p29.jpeg",
	},
	{
		name: "Deye 12 kWh Low-Voltage Lithium Battery - SE-F12-C",
		brand: "Deye",
		category: "Low-Voltage Lithium Battery",
		price: "₦2,346,000",
		warranty: "5 YEARS",
		description:
			"LiFePO₄ battery; 230 Ah; nominal voltage 51.2 V; operating voltage 44.8–57.6 V; nominal energy 11.8 kWh; supports up to 32 units in parallel; approximately 84 kg; 400 × 559 × 233 mm.",
		image: "/images/p30.jpeg",
	},
	{
		name: "Deye 16 kWh Low-Voltage Lithium Battery - SE-F16-C",
		brand: "Deye",
		category: "Low-Voltage Lithium Battery",
		price: "₦2,550,000",
		warranty: "5 YEARS",
		description:
			"LiFePO₄ battery; 314 Ah; nominal voltage 51.2 V; operating voltage 44.8–57.6 V; nominal energy 16 kWh; 2P16S cell configuration; supports up to 32 units in parallel for systems up to 655 kWh.",
		image: "/images/p31.jpeg",
	},
	{
		name: "Deye 5.12 kWh High-Voltage Lithium Battery Module",
		brand: "Deye",
		category: "High-Voltage Lithium Battery",
		price: "₦1,224,000",
		warranty: "10 YEARS",
		description:
			"High-voltage lithium battery module for BOS-G25 Pro, BOS-G40 Pro, BOS-G60 Pro and BOS-G85 Pro systems, supporting system capacities from 25.6 to 87.04 kWh.",
		image: "/images/p32.jpeg",
	},
	{
		name: "Deye High-Voltage Controller Box - BOS-G-PDU-2",
		brand: "Deye",
		category: "Battery Controller",
		price: "₦1,224,000",
		description:
			"High-voltage controller box for Deye BOS-G Pro modular battery systems.",
		image: "/images/p33.jpeg",
	},
	{
		name: "Deye 7.68 kWh High-Voltage Lithium Battery Module",
		brand: "Deye",
		category: "High-Voltage Lithium Battery",
		price: "₦1,836,000",
		warranty: "10 YEARS",
		description:
			"LiFePO₄ battery module; 200 Ah; CAN 2.0 communication; nominal voltage 38.4 V; nominal energy 7.68 kWh; operating humidity 5–85%; approximately 70 kg; 601.5 × 520 × 135 mm.",
		image: "/images/p34.jpeg",
	},
	{
		name: "Deye High-Voltage Controller Box - BOS-A-PDU-2",
		brand: "Deye",
		category: "Battery Controller",
		price: "₦1,632,000",
		description:
			"High-voltage controller box with 200–1000 Vdc operating range, 160 A maximum charge and discharge current, -20 to 65°C operating range and IP20 protection; 572 × 632 × 142.2 mm; approximately 21 kg.",
		image: "/images/p35.jpeg",
	},
	{
		name: "Deye 9-Layer Battery Rack - RACK 9 LAYERS",
		brand: "Deye",
		category: "Battery Rack",
		price: "₦561,000",
		description:
			"Nine-layer battery rack configured to hold eight BOS-G Pro 5 kWh high-voltage battery modules.",
		image: "/images/p36.jpeg",
	},
	{
		name: "Deye 11-Layer Battery Rack - RACK 11 LAYERS",
		brand: "Deye",
		category: "Battery Rack",
		price: "₦561,000",
		description:
			"Eleven-layer battery rack configured to hold ten BOS-A 7.68 kWh high-voltage battery modules.",
		image: "/images/p37.jpeg",
	},
	{
		name: "Deye 13-Layer Battery Rack - RACK 13 LAYERS",
		brand: "Deye",
		category: "Battery Rack",
		price: "₦612,000",
		description:
			"Thirteen-layer battery rack configured to hold twelve BOS-G Pro 5 kWh high-voltage battery modules.",
		image: "/images/p38.jpeg",
	},
	{
		name: "Deye 40 kWh High-Voltage Battery System - BOS-G 40KWH",
		brand: "Deye",
		category: "High-Voltage Battery System",
		price: "₦11,577,000",
		warranty: "10 YEARS",
		description:
			"Complete high-voltage battery system comprising one 9-layer rack, one BOS-G-PDU-2 controller and eight BOS-G Pro 5 kWh battery modules.",
		image: "/images/p39.jpeg",
	},
	{
		name: "Deye 60 kWh High-Voltage Battery System - BOS-G 60KWH",
		brand: "Deye",
		category: "High-Voltage Battery System",
		price: "₦16,524,000",
		warranty: "10 YEARS",
		description:
			"Complete high-voltage battery system comprising one 13-layer rack, one BOS-G-PDU-2 controller and twelve BOS-G Pro 5 kWh battery modules.",
		image: "/images/p40.jpeg",
	},
	{
		name: "Deye 16 kWh High-Voltage Lithium Battery Module",
		brand: "Deye",
		category: "High-Voltage Lithium Battery",
		price: "₦2,448,000",
		warranty: "10 YEARS",
		description:
			"High-voltage lithium battery module supporting five to sixteen modules in series; suitable for PCS systems scalable from 100/125 kW to 2.5 MW.",
		image: "/images/p41.jpeg",
	},
	{
		name: "Deye Battery PDU and Communication Controller",
		brand: "Deye",
		category: "Battery Controller",
		price: "₦1,836,000",
		description:
			"Battery power-distribution and communication controller with PCS communication terminal for delivering battery information to the inverter.",
		image: "/images/p42.jpeg",
	},
	{
		name: "Deye Battery System Accessories",
		brand: "Deye",
		category: "Battery Accessories",
		price: "₦1,224,000",
		description:
			"Accessory package for the Deye BOS-B Pro 256 kWh high-voltage battery system.",
		image: "/images/p43.jpeg",
	},
	{
		name: "Deye 200 kW MPPT Module - MPPT 200KW",
		brand: "Deye",
		category: "Solar MPPT Module",
		price: "₦2,397,000",
		description:
			"Solar MPPT module supporting up to 200 kWp of connected PV capacity, with eight MPPT channels and 40 A current capacity per MPPT.",
		image: "/images/p44.jpeg",
	},
	{
		name: "Deye 125 kW Power Conversion System - SUN-125K-PCS01HP3",
		brand: "Deye",
		category: "Power Conversion System",
		price: "₦5,916,000",
		warranty: "5 YEARS",
		description:
			"Power conversion system with 175/200 A charge and discharge capability, maximum efficiency of 98.5%, system ratings scalable up to 2.5 MW, 200% instantaneous peak capability, zero-export control and time-of-use operation.",
		image: "/images/p45.jpeg",
	},
	{
		name: "Deye 500 kW Static Transfer Switch - STS 500L",
		brand: "Deye",
		category: "Static Transfer Switch",
		price: "₦8,160,000",
		description:
			"Static transfer switch with 500 kW switching capacity, smooth grid, off-grid and diesel-generator transitions, and switching time below 10 ms.",
		image: "/images/p46.jpeg",
	},
];

// Fisher–Yates shuffle (returns a new array).
function shuffle(list) {
	const a = list.slice();
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

// Randomise product order on each load while keeping variety up top:
// group by category, shuffle within each group, shuffle the group order,
// then round-robin across groups so the first items mix categories & brands.
function mixProducts(list) {
	const groups = new Map();
	for (const item of list) {
		const key = item.category || "Other";
		if (!groups.has(key)) groups.set(key, []);
		groups.get(key).push(item);
	}
	const buckets = shuffle([...groups.values()].map((g) => shuffle(g)));
	const out = [];
	for (let i = 0; out.length < list.length; i++) {
		let progressed = false;
		for (const b of buckets) {
			if (i < b.length) {
				out.push(b[i]);
				progressed = true;
			}
		}
		if (!progressed) break;
	}
	return out;
}

const creditStats = [
	{ value: "5+", label: "Technology Partners" },
	{ value: "10+", label: "Institutional & Strategic Partners" },
	{ value: "200+", label: "Business Solutions Deployed" },
	{ value: "500+", label: "Homes Powered" },
];

// Crossed-out "before" price for higher-value items: a 10% markup above the
// current price for items over ₦6M, 15% for items over ₦5M. The current (sheet)
// price stays the live price. Returns null when no markup applies.
// Discount shown on higher-value items: 10% off for items over ₦6M, 15% off
// for items over ₦5M. Returns the crossed-out original price (so that
// original → current is exactly that %) and the percentage for the badge.
function priceDrop(priceStr) {
	const n = Number(String(priceStr).replace(/[^\d]/g, ""));
	if (!n) return null;
	const pct = n > 6_000_000 ? 10 : n > 5_000_000 ? 15 : 0;
	if (!pct) return null;
	const was = Math.round(n / (1 - pct / 100) / 1000) * 1000;
	return { old: "₦" + was.toLocaleString("en-US"), pct };
}

const services = [
	// {
	// 	name: "PAYG Systems",
	// 	description:
	// 		"Pay-As-You-Go plans that allow customers to pay for energy solutions in affordable installments.",
	// 	image: "/images/payg.jpeg",
	// },
	{
		name: "Financing & Buy Now, Pay Later",
		description:
			"Flexible payment options that help you access reliable energy solutions without the upfront burden.",
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
		title: "Financing & Buy Now, Pay Later",
		description:
			"Flexible payment options that help you access reliable energy solutions without the upfront burden.",
		image: "/images/payg.jpeg",
	},
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
		description:
			"To power progress and shape the future of energy across Africa.",
		image: "/images/vision.jpeg",
		alt: "Solar and wind renewable energy field",
	},
	{
		key: "mission",
		title: "Mission",
		description:
			"To deliver reliable, innovative, and sustainable energy solutions that empower people, businesses, and communities across Africa.",
		image: "/images/mission.jpeg",
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
	const [activeProduct, setActiveProduct] = useState(null);
	const [productImagePreview, setProductImagePreview] = useState(null);
	const [visibleCount, setVisibleCount] = useState(6);
	const mixedProducts = useMemo(() => mixProducts(products), []);

	useEffect(() => {
		document.body.style.overflow =
			isMobileNavOpen ||
			isContactModalOpen ||
			footerMobileSheetKey ||
			productImagePreview ||
			activeProduct
				? "hidden"
				: "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [
		footerMobileSheetKey,
		isContactModalOpen,
		isMobileNavOpen,
		productImagePreview,
		activeProduct,
	]);

	useEffect(() => {
		const closeOnEscape = (event) => {
			if (event.key === "Escape") {
				setIsMobileNavOpen(false);
				setMobileSubnav(null);
				setIsContactModalOpen(false);
				setProductImagePreview(null);
				setActiveProduct(null);
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
              <strong>UpEast Energies</strong>
              <span>Renewables</span>
            </div> */}
						<img
							src="UE-logo.png"
							className="brand-logo"
							alt="UpEast Energies Logo"
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
					<h1>
						Powering the Future of Energy in Africa
						{/* Powering the Future, Today */}
					</h1>
					<p>
						We deliver reliable, innovative, and sustainable renewable energy
						solutions for homes, businesses, institutions, and communities
						across Africa.
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
					<Reveal as="section" className="section-intro" id="about">
						<span className="section-badge">About us</span>
						<h2>Innovative Energy Solutions with Long-Term Impact</h2>
						<p>
							UpEast Energies Solutions Limited is an innovative energy and
							infrastructure company committed to delivering reliable,
							efficient, and sustainable power solutions. Through advanced
							technology, strategic partnerships, and industry expertise, the
							company develops and manages energy systems that support economic
							growth and strengthen communities. With a commitment to excellence
							and long-term impact, UpEast Energies Solutions provides
							forward-thinking solutions that power industries, enable
							development, and help shape the future
						</p>
					</Reveal>

					<Reveal as="section" className="about-roadmap" id="roadmap">
						<div className="roadmap-desktop">
							<article className="roadmap-copy">
								<h3>Future roadmap</h3>
								<p>
									UpEast Energies Solutions Limited is committed to becoming the
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
									UpEast Energies Solutions Limited is committed to becoming the
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
					</Reveal>
				</div>
				<div className="content-shell core-values">
					<Reveal as="section" className="section-intro" id="core-values">
						<span className="section-badge">Core values</span>
						<h2>Quality, Trust, and Measurable Impact</h2>
						<p>
							UpEast Energies delivers reliable, sustainable, and innovative
							energy with integrity, reliability, sustainability, innovation,
							and excellence at the center of every project.
						</p>
					</Reveal>

					<Reveal as="section" className="features-grid" delay={0.05}>
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
					</Reveal>
				</div>

				<section
					className="stats-band"
					aria-label="UpEast Energies by the numbers"
				>
					<div className="stats-band-inner">
						<div className="stats-grid">
							{creditStats.map((stat, i) => (
								<Reveal
									as="div"
									className="stat-item"
									key={stat.label}
									delay={i * 0.12}
									y={14}
								>
									<span className="stat-value">{stat.value}</span>
									<span className="stat-label">{stat.label}</span>
								</Reveal>
							))}
						</div>
					</div>
				</section>

				<div className="content-shell">
					<Reveal as="section" className="section-intro" id="products">
						<span className="section-badge">Our products</span>
						<h2>Reliable Renewable Energy Products</h2>
						<p>
							Explore our curated range of dependable solar and backup power
							equipment built for homes, businesses, and institutions.
						</p>
					</Reveal>

					<section className="products-grid">
						{mixedProducts.slice(0, visibleCount).map((item, idx) => {
							const open = () => setActiveProduct(item);
							return (
								<Reveal
									as="article"
									key={item.name}
									className="product-card"
									delay={(idx % 6) * 0.06}
									y={14}
								>
									<div
										className="product-card-toggle"
										role="button"
										tabIndex={0}
										aria-haspopup="dialog"
										aria-label={`View details for ${item.name}`}
										onClick={open}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												e.preventDefault();
												open();
											}
										}}
									>
										<div className="product-card-media">
											<img
												src={item.image}
												alt={item.name}
												className="pc-image"
												loading="lazy"
											/>
										</div>
										<div className="product-card-head">
											<h3 className="product-card-title">{item.name}</h3>
											<span className="product-card-hint">
												<span>View details</span>
												{/* <img
													className="product-details-toggle-icon"
													src="/details.svg"
													alt=""
													aria-hidden="true"
												/> */}
											</span>
										</div>
									</div>
									{/* Kept in the DOM (visually hidden) so search & AI crawlers
									    still index the price and full description. */}
									<div className="sr-only">
										{item.price ? `${item.price}. ` : ""}
										{item.description}
									</div>
								</Reveal>
							);
						})}
					</section>
					{visibleCount < products.length ? (
						<div className="products-loadmore">
							<button
								type="button"
								className="primary-btn load-more-btn"
								onClick={() => setVisibleCount((c) => c + 6)}
							>
								View more products
							</button>
							<span className="products-loadmore-count">
								Showing {Math.min(visibleCount, products.length)} of{" "}
								{products.length}
							</span>
						</div>
					) : null}
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
									<a href="mailto:contact@upeastenergies.com">
										contact@upeastenergies.com
									</a>
								</p>
							</div>
							<div className="contact-modal-detail">
								<img src="/call2.svg" alt="" aria-hidden="true" />
								<p>
									<span className="contact-modal-detail-label">
										Phone Number:
									</span>{" "}
									<a href="tel:+2348141040068">+234 814 104 0068</a>
								</p>
							</div>
							<div>
								<a
									href="https://wa.me/2348141040068"
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

			{activeProduct && (
				<div
					className="product-modal-overlay"
					onClick={() => setActiveProduct(null)}
					role="presentation"
				>
					<div
						className="product-modal"
						role="dialog"
						aria-modal="true"
						aria-labelledby="product-modal-title"
						onClick={(event) => event.stopPropagation()}
					>
						<button
							type="button"
							className="product-modal-close"
							onClick={() => setActiveProduct(null)}
							aria-label="Close"
						>
							&times;
						</button>
						<div className="product-modal-media">
							<img src={activeProduct.image} alt={activeProduct.name} />
						</div>
						<div className="product-modal-body">
							{activeProduct.category ? (
								<span className="product-modal-cat">
									{activeProduct.category}
								</span>
							) : null}
							<h3 id="product-modal-title">{activeProduct.name}</h3>
							{activeProduct.price ? (
								<div className="product-price-row">
									<span className="product-price">{activeProduct.price}</span>
									{priceDrop(activeProduct.price) ? (
										<div className="product-price-sub">
											<span className="product-price-old">
												{priceDrop(activeProduct.price).old}
											</span>
											<span className="product-discount-badge">
												-{priceDrop(activeProduct.price).pct}%
											</span>
										</div>
									) : null}
								</div>
							) : null}
							{activeProduct.description ? (
								<p className="product-desc">{activeProduct.description}</p>
							) : null}
							<button
								type="button"
								className="product-quote-link"
								onClick={() => {
									setActiveProduct(null);
									openContactModal();
								}}
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
					</div>
				</div>
			)}

			{productImagePreview && (
				<div
					className="image-preview-overlay"
					onClick={() => setProductImagePreview(null)}
					role="presentation"
				>
					<button
						type="button"
						className="image-preview-close"
						onClick={() => setProductImagePreview(null)}
						aria-label="Close image preview"
					>
						&times;
					</button>
					<img
						src={productImagePreview.src}
						alt={productImagePreview.alt}
						className="image-preview-img"
						onClick={(e) => e.stopPropagation()}
					/>
				</div>
			)}

			<Reveal as="section" className="cta-panel" id="contact">
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
							<a href="tel:+2348141040068">+234 814 104 0068</a>
						</p>
					</div>
					<div className="cta-contact-social-media">
						<a
							href="https://www.facebook.com/share/14d1Csw9AZ7/?mibextid=wwXIfr"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src="/facebook.svg" alt="Facebook" />
						</a>
						<a
							href="https://www.linkedin.com/company/UpEast-energies/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src="/linkedin.svg" alt="Linkedin" />
						</a>
						<a
							href="https://www.instagram.com/UpEastenergies?igsh=cXd3dTg1NDhzajB5&utm_source=qr"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src="/instagram.svg" alt="Instagram" />
						</a>
					</div>
				</div>
				<div className="cta-image-container">
					<img src="/images/sparks.png" className="cta-image" alt="CTA Image" />
				</div>
			</Reveal>

			<footer className="footer">
				<div className="footer-inner">
					<img
						src="/UE-logo.png"
						className="footer-logo"
						alt="UpEast Energies"
					/>
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
					<p className="footer-copy">© UpEast Energies 2026</p>
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
