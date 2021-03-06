// const baseURL =
// "https://private-anon-1e01747d5a-bradgardenstats.apiary-mock.com/api";

const baseURL = "http://www.xn--brdgrden-1zam.faith/api";

export default class Api {
  static members = null;
  static games = null;
  static sessions = null;

  static fetchGames = async force => {
    if (Api.games != null && !force) {
      return Api.games;
    }

    const response = await fetch(baseURL + "/games");
    const games = await response.json();
    Api.games = games;
    return games;
  };

  static fetchMembers = async force => {
    if (Api.members != null && !force) {
      return Api.members;
    }

    const response = await fetch(baseURL + "/members");
    const members = await response.json();
    Api.members = members;
    return members;
  };

  static fetchSessions = async force => {
    if (Api.sessions != null && !force) {
      return Api.sessions;
    }

    const response = await fetch(baseURL + "/sessions");
    const sessions = await response.json();
    Api.sessions = sessions;
    return sessions;
  };

  static addGame = async (name, numberOfPlayers, hasTraitor, isCoop) => {
    const body = JSON.stringify({
      name: name,
      maxNumOfPlayers: numberOfPlayers,
      traitor: hasTraitor,
      coop: isCoop
    });
    const response = await fetch(baseURL + "/games", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: body
    });

    Api.games = null;
    return response.ok;
  };

  static addSession = async (game, winners, losers, traitors) => {
    const gameId = game.id;
    const winnerIds =
      winners && winners.length > 0 ? winners.map(winner => winner.id) : [];
    const loserIds =
      losers && losers.length > 0 ? losers.map(loser => loser.id) : [];
    const traitorIds =
      traitors && traitors.length > 0
        ? traitors.map(traitor => traitor.id)
        : [];
    const response = await fetch(baseURL + "/sessions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameID: gameId,
        winners: winnerIds,
        losers: loserIds,
        traitors: traitorIds
      })
    });
    Api.sessions = null;
    return response.ok;
  };

  static deleteGame = async id => {
    const response = await fetch(baseURL + "/games/" + id, {
      method: "DELETE"
    });
    Api.games = null;
    return response.ok;
  };
}
