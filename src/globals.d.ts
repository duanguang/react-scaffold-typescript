import { globalWindow } from '@/common/typings/globals/globals';
declare global {
    namespace NodeJS {        
        interface Global {
        }
    }
    interface Window extends globalWindow{
        proxy: Window;
    }
}

