import type { Variants } from 'framer-motion';

// Easing for that "editorial" feel
export const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number] };

// Fade In Up (Standard reveal)
export const fadeInUp: Variants = {
    initial: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.6, ease: transition.ease }
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: transition.ease
        }
    }
};

// Simple Fade In
export const fadeIn: Variants = {
    initial: {
        opacity: 0,
        transition: { duration: 0.6, ease: transition.ease }
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: transition.ease
        }
    }
};

// Scale In (Subtle zoom out effect on enter)
export const scaleIn: Variants = {
    initial: {
        scale: 0.95,
        opacity: 0,
        transition: { duration: 0.8, ease: transition.ease }
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: transition.ease
        }
    }
};

// Stagger Container for children
export const staggerContainer: Variants = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

// Hover Lift (Micro-interaction)
export const hoverLift: Variants = {
    hover: {
        y: -4,
        scale: 1.03,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

// Page Transition
export const pageTransition: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: transition.ease,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.4,
            ease: "easeIn",
        },
    },
};
