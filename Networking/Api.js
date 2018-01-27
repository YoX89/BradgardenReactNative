const baseURL =
  "https://private-anon-1e01747d5a-bradgardenstats.apiary-mock.com/api";

export default class Api {
  static fetchGames = async () => {
    const response = await fetch(baseURL + "/games");
    const games = await response.json();
    return games;
  };

  static fetchMembers = async () => {
    const response = await fetch(baseURL + "/members");
    const members = await response.json();
    return members;
  };

  static addGame = async (name, numberOfPlayers, hasTraitor, isCoop) => {
    const response = await fetch(baseURL + "/games", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: { name },
        maxNumberOflayers: { numberOfPlayers },
        traitor: { hasTraitor },
        coop: { isCoop }
      })
    });
    return response.ok;
  };
}
