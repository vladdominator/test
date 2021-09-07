export interface IJogs {
  id?: number;
  user_id?: string;
  distance?: number;
  time?: number;
  date?: Date;
}

interface IResponse {
  jogs: IJogs[];
}

interface IAsync {
  response: IResponse;
}

export const asyncUserMethod = async (token: string) => {
  const jogsResponse = await fetch(
    "https://jogtracker.herokuapp.com/api/v1/data/sync",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const userResponse = await fetch(
    "https://jogtracker.herokuapp.com/api/v1/auth/user",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return [
    await userResponse.json(),
    ((await jogsResponse.json()) as IAsync).response.jogs,
  ];
};
