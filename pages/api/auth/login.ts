import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.SECONDME_CLIENT_ID
  const authUrl = process.env.SECONDME_AUTH_URL
  const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback`

  const params = new URLSearchParams({
    client_id: clientId!,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'profile'
  })

  const fullUrl = `${authUrl}?${params.toString()}`
  console.log('OAuth URL:', fullUrl)
  console.log('Redirect URI:', redirectUri)

  res.redirect(fullUrl)
}