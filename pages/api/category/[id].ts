import prisma from '../../../lib/prisma';

// PUT /api/publish/:id
export default async function handle(req:any, res:any) {
  const categoryId = req.query.id;
  const {title, description, icon} =req.body;
  const article = await prisma.category.update({
    where: { id: parseInt(categoryId) },
    data: {title, description, icon},
  });
  res.json(article);
}