// src/types/payload-augment.d.ts
import 'payload/config';

declare module 'payload/config' {
  // add the field you need to MetaConfig
  interface MetaConfig {
    favicon?: string;
  }
}
