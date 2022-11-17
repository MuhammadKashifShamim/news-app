import prisma from '../../../lib/prisma';

// DELETE /api/gallery/:id
export default async function handle(req:any, res:any) {
  const imageId = req.query.id;
  const { title, altText } = req.body;
  if(req.method === 'PUT'){
    const galleryImage = await prisma.gallery.update({
      where: { id: imageId },
      data: { title, altText },
    });
    res.json(galleryImage);
  }
  else if (req.method === 'DELETE') {
    const galleryImage = await prisma.gallery.delete({
      where: { id:imageId },
    });
    res.json(galleryImage);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}