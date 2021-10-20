import faunadb from 'faunadb'
import * as uuid from 'uuid'
const q = faunadb.query

export default async (req, res) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SERVER_SECRET,
  })

  const { method, body } = req
  switch (method) {
    case 'POST':
      const { value, key } = body

      const validPictureKey = await client.query(
        q.Get(q.Ref(q.Collection('temp_pictures'), key))
      )

      const validMinutes = 2
      const validInSeconds = validMinutes * 60 * 1000
      const validUntil = validPictureKey.data.expiresAt + validInSeconds
      const delta = validUntil - Date.now()

      const isExpired = delta <= 0

      if (isExpired) {
        return res.json({
          isExpired,
        })
      }

      await client.query(
        q.Update(q.Ref(q.Collection('temp_pictures'), key), {
          data: { pictureValue: value },
        })
      )

      res.json({ success: true })
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
