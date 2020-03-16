export class Init {

  constructor() {
  }

  /**
   * Checks and creates if required all Credentials databases
   */
  private async nodeConnect(): Promise<void> {

  }

  /**
   * Main function that launch all system checks
   */
  public async initialize(): Promise<void> {
    return Promise.all([
      this.nodeConnect()
    ]).then(() => {}).catch((e) => {
      console.log(e);
    });
  }
}
