declare global {
  interface Window {
    vpn: {
      ipcRenderer: {
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
      };
    };
  }
}

export {};
