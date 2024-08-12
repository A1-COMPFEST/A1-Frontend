import { Lato } from "next/font/google";
import { Poppins } from 'next/font/google';

export const lato = Lato({
    weight: ['100', '300', '400', '700', '900'],
    subsets: ['latin'],
});

export const poppins = Poppins({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});