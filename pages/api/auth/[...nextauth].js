import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_OAUTH_ID,
      clientSecret: process.env.DISCORD_OAUTH_SECRET
    }),
  ],
})