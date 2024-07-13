import { createClient } from 'pexels';
import { VITE_PEXELS_KEY } from '@/const';

export const pexelsClient = createClient(VITE_PEXELS_KEY);
