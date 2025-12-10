declare module 'scheduler/tracing' {
  export interface Interaction {
    id: number;
    name: string;
    timestamp: number;
  }

  export function unstable_clear<T>(callback: () => T): T;
  export function unstable_getCurrent(): Set<Interaction>;
  export function unstable_getThreadID(): number;
  export function unstable_trace<T>(name: string, timestamp: number, callback: () => T): T;
  export function unstable_wrap<TArgs extends any[], TResult>(
    callback: (...args: TArgs) => TResult,
    threadID?: number,
  ): (...args: TArgs) => TResult;
  export function unstable_subscribe(
    listener: (interactions: Set<Interaction>, threadID: number) => void,
  ): void;
  export function unstable_unsubscribe(
    listener: (interactions: Set<Interaction>, threadID: number) => void,
  ): void;
}
