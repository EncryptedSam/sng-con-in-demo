interface Args {
    images: string[];
    title?: string;
    showFraction?: boolean;
    startIndex?: number;
}
declare function swiper({ title, showFraction, images, startIndex }: Args): void;
declare global {
    interface Window {
        swiper: typeof swiper;
    }
}
export {};
