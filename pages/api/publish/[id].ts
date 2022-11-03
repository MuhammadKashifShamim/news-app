
import prisma from '../../../lib/prisma';

// PUT /api/publish/:id
export default async function handle(req:any, res:any) {
  const postId = req.query.id;
  const article = await prisma.article.update({
    where: { id: parseInt(postId) },
    data: { published: true },
  });
  res.json(article);
}