import Axios from "axios";

export const BASE_URL = "https://discord.com/api";

const getAuthorizationHeader = () => {
  return `Bot ${process.env.BOT_TOKEN}`;
};

export const Client = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: getAuthorizationHeader(),
  },
});

export const Discord = {
  async getMembers() {
    const {data} = await Client.get(
      `/guilds/${process.env.GUILD_ID}/members`,
      {
        params: { limit: 200 }
      }
    );

    return data.filter(({ user: { bot }}) => !bot).map((member) => ({
      id: member.user.id,
      nick: member.nick,
      username: member.user.username,
      avatar: member.user.avatar,
    }));
  },
};
