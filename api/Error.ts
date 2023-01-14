export class Error {
    public message: string;
    public datetime: string;
    public timestamp: number;
    public stacktrace?: string;
  
    constructor(message: string, datetime: string, stacktrace?: string) {
      this.message = message;
      this.datetime = datetime;
      this.timestamp = Number(new Date(datetime));
      this.stacktrace = stacktrace;
    }
  }
  