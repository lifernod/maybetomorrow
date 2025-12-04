import { createApiUrl } from "$lib/utils/url";

export class Room {
  public readonly room_id: string;
  public day_number: number[];
  public month_number: number[];
  public owner_username: string;
  public username: string[];

  constructor(
    room_id: string,
    day_number: number[],
    month_number: number[],
    owner_username: string,
    username: string[]
  ) {
    this.room_id = room_id;
    this.day_number = day_number;
    this.month_number = month_number;
    this.owner_username = owner_username;
    this.username = username;
  }

  public static async createRoom(
    dayNumbers: number[],
    monthNumbers: number[],
    ownerUsername: string,
    usernames: string[]
  ): Promise<Room> {
    const response = await fetch(createApiUrl("/api/room/create"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day_numbers: dayNumbers,
        month_numbers: monthNumbers,
        owner_username: ownerUsername,
        usernames: usernames,
      }),
      credentials: "include",
    });

    const roomId = await response.text();
    return new Room(roomId, dayNumbers, monthNumbers, ownerUsername, usernames);
  }

  public static async getRoomByRoomId(roomId: string): Promise<Room> {
    const response = await fetch(
      createApiUrl(`/api/room/GetRoomByRoomID/${roomId}`),
      {
        method: "GET",
        credentials: "include",
      }
    );

    return await response.json();
  }

  public static async getRoomsByOwnerUsername(
    ownerUsername: string
  ): Promise<Room[]> {
    const response = await fetch(
      createApiUrl(`/api/room/GetRoomsByOwnerUsername/${ownerUsername}`),
      {
        method: "GET",
        credentials: "include",
      }
    );

    return await response.json();
  }

  public static async addUserToRoom(
    roomId: string,
    username: string
  ): Promise<void> {
    await fetch(createApiUrl("/api/room/addUser"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: roomId,
        username: username,
      }),
      credentials: "include",
    });
  }

  public static async removeUserFromRoom(
    roomId: string,
    username: string
  ): Promise<void> {
    await fetch(createApiUrl("/api/room/removeUser"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: roomId,
        username: username,
      }),
      credentials: "include",
    });
  }

  public static generateInviteLink(roomId: string): string {
    return `${window.location.origin}/room/${roomId}`;
  }

  public static async joinRoom(roomId: string): Promise<Room> {
    // Предполагаем, что текущий пользователь уже аутентифицирован
    const room = await this.getRoomByRoomId(roomId);
    // Автоматически добавляем пользователя в комнату
    await this.addUserToRoom(roomId, room.owner_username); // Нужно будет заменить на текущего пользователя
    return room;
  }
}