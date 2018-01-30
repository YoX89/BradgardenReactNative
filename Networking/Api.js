const baseURL =
  "https://private-anon-1e01747d5a-bradgardenstats.apiary-mock.com/api";

export default class Api {
  static members = null;
  static games = null;

  static fetchGames = async () => {
    if (Api.games != null) {
      return Api.games;
    }
    const response = await fetch(baseURL + "/games");
    const games = await response.json();
    Api.games = games;
    return games;
  };

  static fetchMembers = async () => {
    if (Api.members != null) {
      return Api.members;
    }
    const response = await fetch(baseURL + "/members");
    const members = await response.json();
    Api.members = members;
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
    Api.games = null;
    return response.ok;
  };
}
