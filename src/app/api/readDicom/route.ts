import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic' // defaults to auto

export async function POST(request: Request) {
	const data = await request.json()
	const { base64String, name } = data
	const outputPath = path.join(process.cwd(), 'public', 'name')
	const base64Image = base64String.split(';base64,').pop()
	const dicomBuffer = Buffer.from(base64Image!, 'base64')
	fs.writeFileSync(outputPath, dicomBuffer)
	return Response.json({ message: 'ok', path: outputPath, dicomPath: `/${name}` })
}
