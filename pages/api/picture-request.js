import faunadb from 'faunadb'
import * as uuid from 'uuid'
const q = faunadb.query

export default async (req, res) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SERVER_SECRET,
  })

  const { method } = req
  switch (method) {
    case 'POST':
      const pictureKey = await client.query(
        q.Create(q.Collection('temp_pictures'), {
          data: {
            pictureValue: '',
            expiresAt: Date.now(),
          },
        })
      )
      // you can use uuid/v4 too
      const id = pictureKey.ref.id
      res.statusCode = 201
      res.json({ id })
      break
    case 'GET':
      const { key } = req.query
      const validPictureKey = await client.query(
        q.Get(q.Ref(q.Collection('temp_pictures'), key))
      )

      const validMinutes = 2
      const validInSeconds = validMinutes * 60 * 1000
      const validUntil = validPictureKey.data.expiresAt + validInSeconds
      const delta = validUntil - Date.now()

      const isExpired = delta <= 0

      try {
        res.json({
          isExpired,
          pictureValue: validPictureKey.data.pictureValue,
        })
      } catch (e) {}

      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
