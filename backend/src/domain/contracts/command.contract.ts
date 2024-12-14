export interface Command {
  execute(input?: any): Promise<any>;
}
