import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: any, res: any) {
  const { headerImage, title, content, category } = req.body;

  const session = await getSession({ req });
  const result = await prisma.article.create({
    data: {
      title: title,
      content: content,
      headerImage: headerImage,
      categories: {
        create: [
            {
                assignedBy:session?.user?.name!,
                category:{
                    connect:{
                        id: parseInt(category)
                    }
                }
            }
        ]
    },
      author: { connect: { email: session?.user?.email! } },
    },
  });
  res.json(result);
}