import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: any, res: any) {
  const { title, description, icon } = req.body;

  const result = await prisma.category.create({
    data: {title, description, icon },
  });
  res.json(result);
}