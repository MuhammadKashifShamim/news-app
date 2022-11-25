import prisma from '../../../lib/prisma';

// DELETE /api/article/:id
export default async function handle(req:any, res:any) {
  const postId = req.query.id;
  if (req.method === 'DELETE') {
    const post = await prisma.article.delete({
      where: { id: parseInt(postId) },
    });
    res.json(post);
  } else if(req.method == "PUT"){
    console.log(req.body)
    const post = await prisma.article.update({
      where: { id: parseInt(postId) },
      data: JSON.parse(req.body)
    });
    res.json(post);
  }else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}