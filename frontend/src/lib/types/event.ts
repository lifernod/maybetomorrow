export class Event {
  private static readonly DEFAULT_EVENT_ID = -1;

  public readonly event_id: number;
  public event_name: string;
  public event_description?: string | undefined;
  public event_start: Date;
  public event_end?: Date | undefined;

  constructor(
    event_id: number,
    event_name: string,
    event_description?: string | undefined,
    event_start?: Date | undefined,
    event_end?: Date | undefined
  ) {
    this.event_id = event_id ?? Event.DEFAULT_EVENT_ID;
    this.event_name = event_name;
    this.event_description = event_description;
    this.event_start = event_start ?? new Date();
    this.event_end = event_end;
  }

  public static getEventsCountString(events: number): string {
    const count = events;
    let suffix = "";

    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      suffix = "ий";
    } else {
      switch (lastDigit) {
        case 1:
          suffix = "ие";
          break;
        case 2:
        case 3:
        case 4:
          suffix = "ия";
          break;
        default:
          suffix = "ий";
          break;
      }
    }

    return `${count} событ${suffix}`;
  }
}
